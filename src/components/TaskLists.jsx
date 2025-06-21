import { Input, Button, Checkbox, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteFilled, CheckOutlined, CloseOutlined } from '@ant-design/icons';

const TaskLists = ({ tasks, taskInput, handleCheck, handleChange, handleAdd, handleEditChange, handleEditSave, isEdit, setIsEdit, handleDelete }) => {

  return (
    <div className='taskListContainer'>
      <p className='title'><span style={{ color: "#457b9d" }}>To-</span><span className='todoTitle'>Do it</span></p>
      <Input placeholder="Add a new task" variant='filled' className='input' size='large' onChange={handleChange} value={taskInput} />
      <Button shape='circle' icon={<PlusOutlined />} onClick={handleAdd} size='large' style={{ marginLeft: "20px" }}></Button>

      <div>
        {
          tasks.length > 0 && tasks !== null ?
            tasks?.map((val, index) => val.completed === false ?
              <div key={index} className='taskDiv'>
                {isEdit.editId === val.id ?
                  (<>
                    <Input type='text' value={isEdit.editText} onChange={(e) => handleEditChange(e, val.id)} variant='underlined' style={{ width: "40%", marginTop: "20px", marginLeft: "10px" }} />
                    <div className="taskIcons">
                      <CheckOutlined style={{ marginLeft: "25%", cursor: "pointer", color: "royalblue" }} onClick={() => handleEditSave(val.id)} />
                      <CloseOutlined style={{ marginLeft: "10px", cursor: "pointer", color: "#bd0033" }} onClick={() => setIsEdit({ isEdit, editId: null, editText: "" })} />
                    </div>
                  </>)
                  : (<>
                    <Checkbox style={{ fontSize: "20px", marginTop: "20px" }} onChange={(e) => handleCheck(e, val.id)} className="taskCheckbox">{val.task}</Checkbox>
                    <div className="taskIcons">
                      <EditOutlined style={{ marginLeft: "55%", cursor: "pointer", color: "royalblue" }} onClick={() => setIsEdit({ ...isEdit, editId: val.id, editText: val.task })} />
                      <Popconfirm title="Are you sure to delete this task?" onConfirm={() => handleDelete(val.id)} okText="Yes" cancelText="No">
                        <DeleteFilled style={{ marginLeft: "10px", cursor: "pointer", color: "#bd0033" }} />
                      </Popconfirm>
                    </div>
                  </>)
                }
              </div> : null)
            : <p style={{ color: "grey", fontSize: "20px", marginTop: "20px" }}>No pending tasks</p>
        }
      </div>
    </div>
  )
}

export default TaskLists