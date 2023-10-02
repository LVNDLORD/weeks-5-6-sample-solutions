import React, { useReducer } from 'react';
import './App.css';

// Reducer function to manage tasks
function taskReducer(state, action) {
  switch (action.type) {
    case 'SET_TASK_INPUT':
      return { ...state, taskInput: action.payload };
    case 'ADD_TASK':
      if (state.taskInput.trim() !== '') {
        return {
          ...state,
          tasks: [...state.tasks, { text: state.taskInput, completed: false }],
          taskInput: '',
        };
      }
      return state;
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task, index) =>
          index === action.payload ? { ...task, completed: !task.completed } : task
        ),
      };
    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task, index) =>
          index === action.payload.index ? { ...task, text: action.payload.text } : task
        ),
        editingTask: null,
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((_, index) => index !== action.payload),
      };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'CLEAR_COMPLETED_TASKS':
      return {
        ...state,
        tasks: state.tasks.filter((task) => !task.completed),
      };
    case 'SET_EDITING_TASK':
      return { ...state, editingTask: action.payload };
    default:
      return state;
  }
}

function App() {
  const initialState = {
    taskInput: '',
    tasks: [],
    editingTask: null,
    filter: 'all',
  };

  const [state, dispatch] = useReducer(taskReducer, initialState);

  const addTask = () => {
    dispatch({ type: 'ADD_TASK' });
  };

  const toggleTaskCompletion = (index) => {
    dispatch({ type: 'TOGGLE_TASK', payload: index });
  };

  const editTask = (index, newText) => {
    dispatch({ type: 'EDIT_TASK', payload: { index, text: newText } });
  };

  const deleteTask = (index) => {
    dispatch({ type: 'DELETE_TASK', payload: index });
  };

  const clearCompletedTasks = () => {
    dispatch({ type: 'CLEAR_COMPLETED_TASKS' });
  };

  const setFilter = (filter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  const setTaskInput = (input) => {
    dispatch({ type: 'SET_TASK_INPUT', payload: input });
  };

  const setEditingTask = (index) => {
    dispatch({ type: 'SET_EDITING_TASK', payload: index });
  };

  // Filtered tasks based on the selected filter
  const filteredTasks = state.tasks.filter((task) => {
    if (state.filter === 'completed') return task.completed;
    if (state.filter === 'active') return !task.completed;
    return true;
  });

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      <div className="add-task">
        <input
          type="text"
          placeholder="Add a new task"
          value={state.taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <div className="filter">
        <button
          className={state.filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={state.filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button
          className={state.filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>
      <ul>
        {filteredTasks.map((task, index) => (
          <li key={index}>
            {state.editingTask === index ? (
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
      {state.tasks.some((task) => task.completed) && (
        <button onClick={clearCompletedTasks}>Clear Completed</button>
      )}
    </div>
  );
}

export default App;
