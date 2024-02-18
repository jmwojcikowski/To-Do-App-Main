//connection to database and map ToDoItem in App.js

import React, { useState, useEffect } from 'react';

const TodoList = () => {
    const [todoItems, setTodoItems] = useState([]);
    const [newItemText, setNewItemText] = useState('');

    useEffect(() => {
        fetchData();
      }, []); 
      
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/todolist/todoItems/get'); // Adjust the URL accordingly
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setTodoItems(data);
        } catch (error) {
          console.error('Error fetching todo items:', error);
        }
      };
  
      
    const handleAddItem = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/todolist/todoItems/add', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name: newItemText }),
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data); // handle response data as needed
            setNewItemText('');
            fetchData();
          } catch (error) {
            console.error(error);
          }
        };

        const handleDeleteItem = itemId => {
          // Send DELETE request to server to delete record
          fetch(`http://localhost:5000/api/todolist/todoItems/${itemId}`, {
            method: 'DELETE',
          })
            .then(data => {
                fetchData();
            })
            .catch(error => console.error('Error:', error));
        };

  return (
    <div>
        <form onSubmit={handleAddItem}>
            <input 
                type='text' 
                placeholder='Create a new todo...'
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
            />
        </form>
        <ul>
            {todoItems.map((item) => (
                <li key={item._id}>
                    {item.name}
                    {<input 
                        type='checkbox'
                        onChange={()=> handleDeleteItem(item._id)}
                    /> }
                </li>
            ))}
        </ul>
    </div>
  );
};

export default TodoList;