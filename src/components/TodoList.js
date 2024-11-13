import React, { useState, useEffect } from 'react';
import api from '../api';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data } = await api.get('/todo');
    setTodos(data);
  };

  const handleAddTodo = async () => {
    if (!title.trim()) return;
    const { data } = await api.post('/todo/create', { title });
    setTodos([...todos, data]);
    setTitle('');
  };

  const handleUpdateStatus = async (id, status) => {
    await api.put(`/todo/${id}`, { status });
    fetchTodos();
  };

  const handleDeleteTodo = async (id) => {
    await api.delete(`/todo/${id}`);
    fetchTodos();
  };

  return (
    <div>
      <h2>Todo List</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={handleAddTodo}>Add Task</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} - {todo.status}
            <button onClick={() => handleUpdateStatus(todo.id, 'in progress')}>In Progress</button>
            <button onClick={() => handleUpdateStatus(todo.id, 'done')}>Done</button>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
