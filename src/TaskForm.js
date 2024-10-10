
import { useState } from "react";

export default  function Taskform({onAdd}) {
    const [taskName, setTaskName] = useState('');
    function handleSubmit(ev){
        ev.preventDefault();
        onAdd(taskName);
        setTaskName('');
    }
  return (
    <form onSubmit={handleSubmit} >
        <button>+</button>
      <input
        type="text"
        placeholder="  Your next  task...."
        value={taskName}
      onChange={(e)=>setTaskName(e.target.value)}
      />
    </form>
  );
}
