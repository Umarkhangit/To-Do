import { useState } from 'react';
import './App.css';
import TaskLists from './components/TaskLists';
import { message, Drawer, Tooltip, Popconfirm } from 'antd';
import { CheckSquareOutlined, DeleteFilled } from '@ant-design/icons';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [isEdit, setIsEdit] = useState({ editId: null, editText: "" });
  const [open, setOpen] = useState(false);

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
  }

  const handleEditChange = e => setIsEdit({ ...isEdit, editText: e.target.value });

  const handleEditSave = async id => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) return { ...task, task: isEdit.editText };

      return task;
    });

    setTasks(updatedTasks);
    setIsEdit({ ...isEdit, editId: null, editText: "" });
  }

  const handleCheck = async (e, id) => {
    let checked = e.target.checked;
    const updatedTasks = tasks.map(task => {
      if (task.id === id) return { ...task, completed: checked };
      
      return task;
    });

    setTasks(updatedTasks);
    message.success('Task completed successfully');
  }

  const handleDelete = async id => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    message.success('Task deleted successfully');
  }

  return (
    <>
      <TaskLists tasks={tasks} taskInput={taskInput} handleCheck={handleCheck} handleChange={handleChange} handleAdd={handleAdd} isEdit={isEdit}
        setIsEdit={setIsEdit} handleEditChange={handleEditChange} handleEditSave={handleEditSave} handleDelete={handleDelete} />

      <Tooltip title="Completed Tasks" placement="left">
        <CheckSquareOutlined id='completed-tasks-icon' onClick={() => setOpen(true)} />
      </Tooltip>

      <Drawer
        title={<p style={{ color: "#457b9d", fontSize: '1.5em' }}>Completed Tasks</p>}
        size='large'
        onClose={() => setOpen(false)}
        open={open}
      >
        {
          tasks?.map((val, index) => val.completed === true ?
            <div key={index} className='completeDiv'>
              <p style={{ color: "grey" }}>{val.task}</p>
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
