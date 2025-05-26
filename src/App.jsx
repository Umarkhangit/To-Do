import { useState, useEffect } from 'react';
import './App.css';
import TaskLists from './components/TaskLists';
import CompletedTasks from './components/CompletedTasks';
import { message } from 'antd';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [isEdit, setIsEdit] = useState({ editId: null, editText: "" });

  useEffect(() => { fetchTasks(); }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleChange = e => setTaskInput(e.target.value);

  const handleAdd = async () => {
    if (taskInput.trim() !== '') {
      const newTask = {
        id: tasks.length.toString(),
        task: taskInput,
        completed: false
      };

      try {
        await axios.post('http://localhost:3001/tasks', newTask);
        fetchTasks();
        message.success('Task added successfully');
      }
      catch (error) {
        console.error('Error adding task', error);
      }

      setTaskInput('');
    }

    else alert('Please enter a task');
  }

  const handleEditChange = e => setIsEdit({ ...isEdit, editText: e.target.value });

  const handleEditSave = async id => {
    try {
      await axios.patch(`http://localhost:3001/tasks/${id}`, { task: isEdit.editText });
      fetchTasks();
      message.success('Task updated successfully');
    }
    catch (error) {
      console.error('Error updating task', error);
    }

    setIsEdit({ ...isEdit, editId: null, editText: "" });
  }

  const handleCheck = async (e, id) => {
    let checked = e.target.checked;
    try {
      await axios.patch(`http://localhost:3001/tasks/${id}`, { completed: checked === true ? true : false });
      message.success('Task completed successfully');
    }
    catch (error) {
      console.error('Error updating task', error);
    }

    fetchTasks();
  }

  const handleDelete = async id => {
    try {
      await axios.delete(`http://localhost:3001/tasks/${id}`);
      fetchTasks();
    }
    catch (error) {
      console.error('Error deleting task', error);
    }

    message.success('Task deleted successfully');
  }


  return (
    <>
      <div className='container'>
        <TaskLists tasks={tasks} taskInput={taskInput} handleCheck={handleCheck} handleChange={handleChange} handleAdd={handleAdd} isEdit={isEdit}
          setIsEdit={setIsEdit} handleEditChange={handleEditChange} handleEditSave={handleEditSave} handleDelete={handleDelete} />
        <CompletedTasks tasks={tasks} handleDelete={handleDelete} />
      </div>
    </>

  );
}

export default App;
