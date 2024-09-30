import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  theme: "262626"
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    AddIntakeWater: (state, action) => {
      state.value = action.payload
    },
    ChangeTheme: (state, action) => {
      state.theme = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { AddIntakeWater, ChangeTheme } = counterSlice.actions

export default counterSlice.reducer