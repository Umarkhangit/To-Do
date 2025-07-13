import { useState } from 'react';
import './App.css';
import TaskLists from './components/TaskLists';
import { message, Drawer, Popconfirm } from 'antd';
import { CheckSquareOutlined, DeleteFilled } from '@ant-design/icons';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [isEdit, setIsEdit] = useState({ editId: null, editText: "" });
  const [open, setOpen] = useState(false);

  const handleChange = e => setTaskInput(e.target.value);

  const handleAdd = () => {

    if (taskInput.trim() === '') {
      message.error('Please enter a task');
      return;
    }

    const today = new Date().getDate()
    const month = new Date().getMonth()
    const newTask = {
      id: tasks.length.toString(),
      task: taskInput,
      completed: false,
      date: `${today}/${month}`
    };

    setTasks([...tasks, newTask]);
    setTaskInput('');
  }

  const handleEditChange = e => setIsEdit({ ...isEdit, editText: e.target.value });

  const handleEditSave = id => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) return { ...task, task: isEdit.editText };

      return task;
    });

    setTasks(updatedTasks);
    setIsEdit({ ...isEdit, editId: null, editText: "" });
  }

  const handleCheck = (e, id) => {
    let checked = e.target.checked;
    const updatedTasks = tasks.map(task => {
      if (task.id === id) return { ...task, completed: checked };
      
      return task;
    });

    setTasks(updatedTasks);
    message.success('Task completed successfully');
  }

  const handleDelete = id => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    message.success('Task deleted successfully');
  }

  return (
    <>
      <TaskLists tasks={tasks} taskInput={taskInput} handleCheck={handleCheck} handleChange={handleChange} handleAdd={handleAdd} isEdit={isEdit}
        setIsEdit={setIsEdit} handleEditChange={handleEditChange} handleEditSave={handleEditSave} handleDelete={handleDelete}/>

      <CheckSquareOutlined id='completed-tasks-icon' onClick={() => setOpen(true)} />

      <Drawer
        title={<p style={{ color: "#457b9d", fontSize: '1.5em' }}>Completed Tasks</p>}
        size='large'
        onClose={() => setOpen(false)}
        open={open}
      >
        {
          tasks?.map((val, index) => val.completed === true ?
            <div key={index} className='completeDiv'>
              <div style={{display:"flex"}}>
              <p style={{ color: "grey" }}>{val.task}</p>
              <p style={{ color: "grey", marginLeft:"25px" }}>{val.date}</p>
              </div>

              <Popconfirm title="Are you sure to delete this task?" onConfirm={() => handleDelete(val.id)} okText="Yes" cancelText="No">
                <DeleteFilled style={{ cursor: "pointer", color: "#bd0033" }} />
              </Popconfirm>
            </div> : null)
        }
      </Drawer>
    </>
  );
}

export default App;
