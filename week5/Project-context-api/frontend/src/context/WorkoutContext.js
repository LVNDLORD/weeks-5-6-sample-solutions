import { createContext, useReducer, useContext } from 'react'

const WorkoutsContext = createContext()
const WorkoutDispatchContext = createContext()

export const WorkoutsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null
  })

  return (
    <WorkoutsContext.Provider value={state.workouts}>
      <WorkoutDispatchContext.Provider value={dispatch}>
        { children }
      </WorkoutDispatchContext.Provider>
    </WorkoutsContext.Provider>
  )
}

export function useWorkout() {
  return useContext(WorkoutsContext);
}

export function useWorkoutDispatch() {
  return useContext(WorkoutDispatchContext);
}

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS': 
      return {
        workouts: action.payload
      }
    case 'CREATE_WORKOUT':
      return {
        workouts: [action.payload, ...state.workouts]
      }
    case 'DELETE_WORKOUT':
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id)
      }
    default:
      throw Error('Unknown action: ' + action.type)
  }
}