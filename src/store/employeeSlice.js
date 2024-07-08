import { createSlice } from '@reduxjs/toolkit';

// Load initial state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('employeeState');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return [];
  }
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState: loadState(),
  reducers: {
    addEmployee: (state, action) => {
      state.push({ ...action.payload, id: state.length + 1 });
      localStorage.setItem('employeeState', JSON.stringify(state));
    },
    updateEmployee: (state, action) => {
      const index = state.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        localStorage.setItem('employeeState', JSON.stringify(state));
      }
    },
    deleteEmployee: (state, action) => {
      const newState = state.filter(emp => emp.id !== action.payload);
      localStorage.setItem('employeeState', JSON.stringify(newState));
      return newState;
    },
  },
});

export const { addEmployee, updateEmployee, deleteEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;