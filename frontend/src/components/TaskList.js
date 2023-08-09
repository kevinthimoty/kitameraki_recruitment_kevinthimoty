import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import '../App.css';
import { DefaultButton, TextField } from '@fluentui/react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const url = "http://localhost:5000/tasks";
  const [data, setData] = useState([]);

  const [updateStatus, setUpdateStatus] = useState(false);


  const fetchInfo = () => {
    return fetch(url)
      .then((res) => res.json())
      .then((d) => setData(d))
  }

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleDelete = (taskId) => {
    fetch(`http://localhost:5000/tasks/${taskId}`, { method: 'DELETE' });
    window.location.reload();
  };

  const handleUpdate = (taskId, updatedTask) => {
    // Handle task update, e.g., make a PUT request to the backend
    // Remember to implement the API for updating a task on the backend
    // After successful update, update the tasks state with the updated task data

    setUpdateStatus(!updateStatus);
  };

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
        />
      ))}

        <div>
              {data.map((dataObj, index) => {
              return (
                  <div>
                    <h1>Tasks {index + 1}</h1>

                    <TextField
                      styles={{
                          fieldGroup: {
                            borderRadius: 0,
                            border: "0px solid transparent",
                            background: "#F3F2F1",
                          },
                          field: {
                            color: "#FF0000"
                          }
                        }}
                      label="Task Title"
                      id={`tasktitle${dataObj.id}`}
                      name="title"
                      value={`${dataObj.title}`}
                      required
                    />
                    <TextField
                      styles={{
                          fieldGroup: {
                            borderRadius: 0,
                            border: "0px solid transparent",
                            background: "#F3F2F1"
                          },
                          field: {
                            color: "#FF0000"
                          }
                        }}
                      label="Task Description"
                      id={`taskdescription${dataObj.id}`}
                      name="title"
                      value={`${dataObj.description}`} 
                    />
                    <DefaultButton
                      className= 'task-list-button'
                      text="Delete"
                      styles={{
                        root: {
                          backgroundColor: 'darkred',
                          color: '#fff',
                        }        
                      }}
                      onClick={() => { handleDelete(dataObj.id) }}
                    />
                    {/* <DefaultButton
                      className= 'task-list-button'
                      text="Update"
                      style={{ backgroundColor: updateStatus ? "black" : "white" }}
                      onClick={() => { 
                        handleUpdate(dataObj.id) 
                      }}
                    /> */}
                  </div>
              );
              })}
        </div>
    </div>

  );
};

export default TaskList;
