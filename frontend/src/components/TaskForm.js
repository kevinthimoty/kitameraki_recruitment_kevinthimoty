import React, { useState } from 'react';
import { PrimaryButton, TextField } from '@fluentui/react';

const TaskForm = () => {
  const [task, setTask] = useState({ title: '', description: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = () => {
    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      body: JSON.stringify({
        "title": document.getElementById('title').value,
        "description": document.getElementById('description').value
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
       .then((response) => response.json())
       .then((data) => {
          window.location.reload();
       })
       .catch((err) => {
          console.log(err.message);
       });

  };

  return (
    <div className="task-form">
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
        id="title"
        name="title"
        value={task.title}
        onChange={handleInputChange}
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
        id="description"
        name="description"
        value={task.description}
        onChange={handleInputChange}
      />
      <PrimaryButton text="Add Task" onClick={handleSubmit} />
    </div>
  );
};

export default TaskForm;
