import { useEffect, useState } from 'react'
import './App.css'
import { db } from './firebase'
import { collection, doc, getDocs, deleteDoc, updateDoc, getDoc } from "firebase/firestore";

function App() {
  const [tasks, setTasks] = useState([]);

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

  return (
    <>
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
