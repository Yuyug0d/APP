import React from 'react';
import "./Task.css";
import {CgClose, CgInfo} from 'react-icons/cg'
import { useHistory } from 'react-router-dom'


const Task = ({ task, handleTaskClick, handleTaskRemove }) => {
    const history = useHistory();

    const handleSeeDetailsClick = () => {
        history.push(`/${task.title}`)
    }

    return (
        <div className="task-container" style={task.completed ? { borderLeft: "6px solid rgb(255, 107, 139)" } : {}}>
            <div className="task-title" onClick={() => handleTaskClick(task.id)}>
            {task.title}
            
            </div>
            <div className="buttons-container">
                <button className="see-detail-button" onClick={handleSeeDetailsClick}>
                    <CgInfo />
                </button>

                <button className="remove-task-button" onClick={() => handleTaskRemove(task.id)}>
                    <CgClose />
                </button>
                
            </div>
        </div>
    )
    /* return (
        <div className="task-container">
        {task.title}
        </div>
        ) */
}
 
export default Task;