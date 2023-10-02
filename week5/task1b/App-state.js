import { useState } from 'react';
import './App.css';

function App() {
  // State for task input
  const [taskInput, setTaskInput] = useState('');

  // State for the list of tasks
  const [tasks, setTasks] = useState([]);

  // State for the task being edited
  const [editingTask, setEditingTask] = useState(null);

  // State for the filter (completed or active tasks)
  const [filter, setFilter] = useState('all');

  // Function to add a task
  const addTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([...tasks, { text: taskInput, completed: false }]);
      setTaskInput('');
    }
  };

  // Function to toggle task completion
  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  // Function to edit a task
  const editTask = (index, newText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = newText;
    setTasks(updatedTasks);
    setEditingTask(null);
  };

  // Function to delete a task
  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  // Function to clear completed tasks
  const clearCompletedTasks = () => {
    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);
  };

  // Filtered tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true; // 'all' filter, show all tasks
  });

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      <div className="add-task">
        <input
          type="text"
          placeholder="Add a new task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <div className="filter">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>
      <ul>
        {filteredTasks.map((task, index) => (
          <li key={index}>
            {editingTask === index ? (
              <input
                type="text"
                value={task.text}
                onChange={(e) => editTask(index, e.target.value)}
                onBlur={() => setEditingTask(null)}
                autoFocus
              />
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(index)}
                />
                <span
                  className={task.completed ? 'completed' : ''}
                  onClick={() => setEditingTask(index)}
                >
                  {task.text}
                </span>
                <button onClick={() => deleteTask(index)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      {tasks.some((task) => task.completed) && (
        <button onClick={clearCompletedTasks}>Clear Completed</button>
      )}
    </div>
  );
}

export default App