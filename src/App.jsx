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
  }, [])

  return (
    <>
      {
        tasks.map((task) => (
          <div> 
            <div>
              Task title: {task.title} 
            </div>
            <div>
              Task body: {task.body} 
            </div>
            <div>
              Task status: {task.status} 
            </div>
          </div>
          
        ))
      }
    </>
  )
}

export default App
