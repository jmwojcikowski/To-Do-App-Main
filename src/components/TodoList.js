import React from 'react';

const TodoList = ({ todos, onAddTodo, onToggleCompleted, onDeleteTodo, onFilter, onClearCompleted, filter }) => {
  const [newTodo, setNewTodo] = React.useState('');

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      onAddTodo(newTodo);
      setNewTodo('');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <form onSubmit={handleAddTodo} className="mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          className="border border-gray-300 rounded-sm py-2 px-3 leading-tight focus:outline-none focus:shadow-outline mr-2"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add
        </button>
      </form>
      <div className="mb-4">
        <label htmlFor="filter" className="mr-2">Filter:</label>
        <select id="filter" value={filter} onChange={onFilter} className="border border-gray-300 rounded-sm py-2 px-3 leading-tight focus:outline-none focus:shadow-outline">
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggleCompleted(todo._id)}
              className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out mr-2"
            />
            <span
              className={`flex-1 text-gray-900 ${todo.completed ? 'line-through' : ''}`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => onDeleteTodo(todo._id)}
              className="focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-4 w-4 text-gray-400 transform rotate-180"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
            <button
              onClick={() => onDeleteTodo(todo._id)}
              className="focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-4 w-4 text-gray-400"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
      {todos.some((todo) => todo.completed) && (
        <button
          onClick={onClearCompleted}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Clear Completed
        </button>
      )}
    </div>
  );
};

export default TodoList;