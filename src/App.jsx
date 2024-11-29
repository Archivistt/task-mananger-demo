import { useEffect, useState } from 'react'
import './App.css'
import { db } from './firebase'
import { collection, doc, getDocs, deleteDoc, addDoc, updateDoc, getDoc } from "firebase/firestore";

function App() {
  //useState for fetching tasks
  const [tasks, setTasks] = useState([]);

  //useState for adding tasks
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  //Fetch the documents from the colletion
  const fetchTasks = async ()=> {
    const collectionRef = collection(db, 'tasks');
    const querySnapshot = await getDocs(collectionRef);
    const tasks = querySnapshot.docs.map((task) => ({
      id: task.id,
      ...task.data() //the rest of the data
    }))
    setTasks(tasks)
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  //Deleting tasks and removing them from firestore
  const deleteTask = async (id) => {

    //Removing the task from firestore
    const docRef = doc(db, 'tasks', id)
    await deleteDoc(docRef)

    //Reflecting changes in user perspective
    setTasks( (prevTasks) => prevTasks.filter(task => task.id !== id) )
  }

  //Adding task function and reflecting changes in user perspective
  const addTask = async (e) => {
    e.preventDefault();
    const collectionRef = collection(db, 'tasks');
    await addDoc(collectionRef, {
      title: title,
      body: body,
      status: 'pending'
    })
    setTitle('')
    setBody('')
    alert('Task added')
  }

  return (
    <>
      {/*ADDING TASKS COMPONENT*/}
      <div className="formStyle"> 
        <h3>add task</h3>
        <form onSubmit={addTask}>
          <input type="text" name="title" id="title" placeholder="title" value={title} required onChange={(e) => setTitle(e.target.value)}/>
          <textarea name="desc" id="desc" placeholder="descriton" value={body} required onChange={(e) => setBody(e.target.value)}></textarea>
          <button type="submit" onClick={() => {setTimeout(()=> {window.location.reload()}, 1500)}}>Add task</button>
        </form>
      </div>

      {
        tasks.map((task) => (
          <div key={task.id}> 
            <div>
              Task title: {task.title} 
            </div>
            <div>
              Task body: {task.body} 
            </div>
            <div>
              Task status: {task.status} 
            </div>
            <button onClick={() => deleteTask(task.id)}>
              Delete task
            </button>
          </div>
          
        ))
      }
    </>
  )
}

export default App
