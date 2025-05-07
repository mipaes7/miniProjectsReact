import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type UserId = string

export interface User {
  name: string;
  email: string;
  github: string;
}

export interface UserWithId extends User {
  id: UserId;
}

const initialState: UserWithId[] = [
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
];

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    deleteUserById: (state, action: PayloadAction<UserId>) => {
        const id = action.payload
        return state.filter(user => user.id !== id)
    } 
  },
});

export default usersSlice.reducer

export const { deleteUserById } = usersSlice.actions
