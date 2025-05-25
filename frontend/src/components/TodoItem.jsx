import React from 'react';
import axios from 'axios';

const TodoItem = ({ todo, refreshTodos }) => {
  const toggleComplete = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/todos/${todo.id}`, {
        title: todo.title,
        description: todo.description,
        completed: !todo.completed
      });
      refreshTodos();
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteTodo = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/todos/${todo.id}`);
      refreshTodos();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div>
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
        <small>{new Date(todo.created_at).toLocaleString()}</small>
      </div>
      <div>
        <button onClick={toggleComplete}>
          {todo.completed ? 'Undo' : 'Complete'}
        </button>
        <button onClick={deleteTodo}>Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;