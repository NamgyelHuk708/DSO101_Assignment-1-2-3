import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const refreshTodos = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/todos`);
      setTodos(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    refreshTodos();
  }, []);

  return (
    <div className="todo-list">
      <h2>My Todos</h2>
      <TodoForm refreshTodos={refreshTodos} />
      {todos.length > 0 ? (
        todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} refreshTodos={refreshTodos} />
        ))
      ) : (
        <p>No todos yet. Add one above!</p>
      )}
    </div>
  );
};

export default TodoList;