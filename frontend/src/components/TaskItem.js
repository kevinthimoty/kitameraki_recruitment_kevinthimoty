import React, { useState } from 'react';
import { TextField, IconButton } from '@fluentui/react';

const TaskItem = ({ task, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({ title: task.title, description: task.description });

  const handleEdit = () => {
    setEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask({ ...updatedTask, [name]: value });
  };

  const handleUpdate = () => {
    // Handle task update, e.g., make a PUT request to the backend
    // Remember to implement the API for updating a task on the backend
    // After successful update, update the tasks state with the updated task data
    onUpdate(task.id, updatedTask);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setUpdatedTask({ title: task.title, description: task.description });
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <div className="task-item">
      {editing ? (
        <>
          <TextField
            label="Task Title"
            name="title"
            value={updatedTask.title}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Task Description"
            name="description"
            value={updatedTask.description}
            onChange={handleInputChange}
          />
          <IconButton iconProps={{ iconName: 'Save' }} onClick={handleUpdate} />
          <IconButton iconProps={{ iconName: 'Cancel' }} onClick={handleCancel} />
        </>
      ) : (
        <>
          <h3>{task.title}</h3>
          {task.description && <p>{task.description}</p>}
          <IconButton iconProps={{ iconName: 'Edit' }} onClick={handleEdit} />
          <IconButton iconProps={{ iconName: 'Delete' }} onClick={handleDelete} />
        </>
      )}
    </div>
  );
};

export default TaskItem;
