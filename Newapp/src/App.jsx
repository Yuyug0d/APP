import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {v4 as uuidv4} from "uuid";
import "./App.css";

import Tasks from "./Components/Tasks";
import AddTask from "./Components/AddTask";
import Header from "./Components/Header";
import TaskDetails from './Components/TaskDetails';

const App = () => {
      const [tasks, setTasks] = useState([
        {
            id: '1',
            title: 'Have a nice day',
            completed: false,
        },
        {
          id: '2',
          title: 'Wake',
          completed: true
        }
      ]);
      useEffect(() => {
        const fetchTasks = async () => {
          const { data } = await axios.get(
            'https://jsonplaceholder.cypress.io/todos?_limit=10'
          );
          
          setTasks(data)
        }
        fetchTasks();
      }, []);

      const handleTaskClick = (taskId) => {
        const newTasks = tasks.map(task => {
          if (task.id === taskId) return {...task, completed: !task.completed}

          return task;
        })
        setTasks(newTasks);
      };

      const handleTaskAddition = (taskTitle) => {
        const newTasks = [
          ...tasks, 
          {
          title: taskTitle,
          id: uuidv4(),
          completed: false,
        },
      ];
         setTasks(newTasks);
      };

      const handleTaskRemove = (taskId) => {
        const newTasks = tasks.filter(task => task.id !== taskId)
       
        
        setTasks(newTasks);

      };

     

      return (
          <Router>
            <div className="container">
              <Header />
              <Route path="/" exact render={() => (
                <>
                <AddTask handleTaskAddition={handleTaskAddition}  />
                <Tasks tasks={tasks} handleTaskClick={handleTaskClick} handleTaskRemove={handleTaskRemove} />
                </>
              )} />
            </div>
              <Route path="/:taskTitle" exact component={TaskDetails} />
      </Router>
  );
};


export default App;