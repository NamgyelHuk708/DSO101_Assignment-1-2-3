import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // We'll create this next

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Fetch tasks from backend
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/tasks`)
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  // Add task
  const addTask = () => {
    if (!newTask.trim()) return; // Prevent empty tasks
    axios.post(`${process.env.REACT_APP_API_URL}/tasks`, { title: newTask })
      .then(res => setTasks([...tasks, res.data]))
      .catch(err => console.error(err));
    setNewTask('');
  };

  // Delete task
  const deleteTask = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div className="app">
      <div className="todo-container">
        <h1>To-Do List</h1>
        <div className="input-group">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a task..."
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <button onClick={addTask}>Add</button>
        </div>
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id} className="task-item">
              <span>{task.title}</span>
              <button 
                onClick={() => deleteTask(task.id)}
                className="delete-btn"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;