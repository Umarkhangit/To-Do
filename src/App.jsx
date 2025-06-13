import { useState } from 'react';
import './App.css';
import TaskLists from './components/TaskLists';
// import CompletedTasks from './components/CompletedTasks';
import { message } from 'antd';
import { CheckSquareOutlined } from '@ant-design/icons';
// import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([
    {
      "id": "0",
      "task": "Next js",
      "completed": false
    },
    {
      "id": "1",
      "task": "Python",
      "completed": false
    },
    {
      "id": "2",
      "task": "AI and ML",
      "completed": false
    }
  ]);
  const [taskInput, setTaskInput] = useState('');
  const [isEdit, setIsEdit] = useState({ editId: null, editText: "" });

  // useEffect(() => { fetchTasks(); }, []);

  // const fetchTasks = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:3001/tasks');
  //     setTasks(response.data);
  //   } catch (error) {
  //     console.error('Error fetching tasks:', error);
  //   }
  // };

  const handleChange = e => setTaskInput(e.target.value);

  const handleAdd = async () => {

    if (taskInput.trim() === '') {
      message.error('Please enter a task');
      return;
    }
    const newTask = {
      id: tasks.length.toString(),
      task: taskInput,
      completed: false
    };

    setTasks([...tasks, newTask]);
    setTaskInput('');


    // if (taskInput.trim() !== '') {
    //   const newTask = {
    //     id: tasks.length.toString(),
    //     task: taskInput,
    //     completed: false
    //   };

    //   try {
    //     await axios.post('http://localhost:3001/tasks', newTask);
    //     fetchTasks();
    //     message.success('Task added successfully');
    //   }
    //   catch (error) {
    //     console.error('Error adding task', error);
    //   }

    //   setTaskInput('');
    // }

    // else alert('Please enter a task');
  }

  const handleEditChange = e => setIsEdit({ ...isEdit, editText: e.target.value });

  const handleEditSave = async id => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, task: isEdit.editText };
      }
      return task;
    });
    setTasks(updatedTasks);

    setIsEdit({ ...isEdit, editId: null, editText: "" });


    // try {
    //   await axios.patch(`http://localhost:3001/tasks/${id}`, { task: isEdit.editText });
    //   fetchTasks();
    //   message.success('Task updated successfully');
    // }
    // catch (error) {
    //   console.error('Error updating task', error);
    // }

  }

  const handleCheck = async (e, id) => {
    let checked = e.target.checked;
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: checked };
      }
      return task;
    });
    setTasks(updatedTasks);
    message.success('Task completed successfully');
    // try {
    //   await axios.patch(`http://localhost:3001/tasks/${id}`, { completed: checked === true ? true : false });
    //   message.success('Task completed successfully');
    // }
    // catch (error) {
    //   console.error('Error updating task', error);
    // }

    // fetchTasks();
  }

  const handleDelete = async id => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    message.success('Task deleted successfully');
    // try {
    //   await axios.delete(`http://localhost:3001/tasks/${id}`);
    //   fetchTasks();
    // }
    // catch (error) {
    //   console.error('Error deleting task', error);
    // }
  }


  return (
    <>
      <div className='container'>
        <TaskLists tasks={tasks} taskInput={taskInput} handleCheck={handleCheck} handleChange={handleChange} handleAdd={handleAdd} isEdit={isEdit}
          setIsEdit={setIsEdit} handleEditChange={handleEditChange} handleEditSave={handleEditSave} handleDelete={handleDelete} />
       
        {/* <CompletedTasks tasks={tasks} handleDelete={handleDelete} /> */}
      </div>

      <CheckSquareOutlined id='completed-tasks-icon'/>
    </>

  );
}

export default App;
