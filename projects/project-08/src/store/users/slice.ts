import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const DEFAULT_STATE = [
  {
    id: "1",
    name: "Miguel",
    email: "miguel@email.com",
    github: "mipaes7",
  },
  {
    id: "2",
    name: "Sergio",
    email: "sergio@email.com",
    github: "SergioLM7",
  },
  {
    id: "3",
    name: "DiegoBrando",
    email: "diego@email.com",
    github: "diegoblazquezr",
  },
]

export type UserId = string

export interface User {
  name: string;
  email: string;
  github: string;
}

export interface UserWithId extends User {
  id: UserId;
}

// iife Immediately Invoked Function Expression
const initialState: UserWithId[] = (() => {
  const persistedState = localStorage.getItem("__redux__state__")
  if (persistedState) {
    return JSON.parse(persistedState).users
  }
  return DEFAULT_STATE
})()

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    deleteUserById: (state, action: PayloadAction<UserId>) => {
        const id = action.payload
        return state.filter(user => user.id !== id)
    },
    addUser: (state, action: PayloadAction<User>) => {
      const id = crypto.randomUUID().split('')[0]
      const user = action.payload
      return [...state, {id, ...user}]
    }
  },
});

export default usersSlice.reducer

export const { deleteUserById, addUser } = usersSlice.actions
