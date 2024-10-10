import { useEffect, useState } from 'react';
import './App.css';
import Task from './Task';
import Taskform from './TaskForm';
import backImage from './back.jpeg';

function App() {
  const backgroundImage = {
    backgroundImage: `url(${backImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%'
  };

  const [tasks, setTasks] = useState([]);

  function addTask(name) {
    setTasks(prev => [...prev, { name, done: false }]);
  }

  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    } else {
      setTasks([]);
    }
  }, []);

  function removeTask(indexToRemove) {
    setTasks(prev => prev.filter((_, index) => index !== indexToRemove));
  }

  function updateTask(index, newDone) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[index].done = newDone;
      return newTasks;
    });
  }

  function renameTask(index, newName) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    });
  }

  const numberComplete = tasks.filter(t => t.done).length;
  const numberTotal = tasks.length;

  function getMessage() {
    const percentage = numberTotal ? (numberComplete / numberTotal) * 100 : 0;
    if (percentage === 0) {
      return 'Try to do at least one task!👌';
    } else if (percentage === 100) {
      return '✨ All done! You\'re unstoppable! 💪';
    } else {
      return "Keep it going👏";
    }
  }

  return (
    <div style={backgroundImage} className="container">
      <h1>{numberComplete}/{numberTotal} Complete</h1>
      <h2>{getMessage()}</h2>
      <main>
        <Taskform onAdd={addTask} />
        {tasks.map((task, index) => (
          <Task
            key={index} // Add a key prop for better rendering
            {...task}
            onRename={newName => renameTask(index, newName)}
            onDelete={() => removeTask(index)}
            onToggle={done => updateTask(index, done)}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
