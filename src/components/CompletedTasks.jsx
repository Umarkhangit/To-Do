import { DeleteFilled } from '@ant-design/icons'
import { Popconfirm } from 'antd'

const CompletedTasks = ({ tasks, handleDelete }) => {

  return (
    <div style={{ width: "40%", paddingLeft: "20px", height: "95vh" }}>
      <p className='title' style={{ color: "#457b9d" }}>Completed Tasks</p>
      {
        tasks.length > 0 && tasks !== null ?
          tasks?.map((val, index) => val.completed === true ?
            <div key={index} className='completeDiv'><p style={{ color: "grey" }}>{val.task}</p><Popconfirm title="Are you sure to delete this task?" onConfirm={() => handleDelete(val.id)} okText="Yes" cancelText="No"><DeleteFilled style={{ cursor: "pointer", color: "#bd0033" }} /></Popconfirm></div> : null)
          : <div style={{ color: "grey" }}>No completed tasks</div>
      }
    </div>
  )
}

export default CompletedTasks