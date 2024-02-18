//connection to database and map ToDoItem in App.js

import React from 'react';
import ShowToDolist from "./ShowToDoList";
const MainView = () => {

  ;
  return (
    <div className='App'>
        <div className='Container'>
            <h1>To Do</h1>
           
            <ShowToDolist />
      </div>
    </div>

  );
};

export default MainView;