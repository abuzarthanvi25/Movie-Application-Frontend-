import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    setUser(state, action) {
      state.push(action.payload);
    },
    removeUser(state, action) {
      return (state = []);
    },
    addToWatchList(state, action) {
      state.watch_list.push(action.payload);
      console.log(state[0].watch_list);
      return state;
    },
  },
});

export const { setUser, removeUser, addToWatchList } = userSlice.actions;
export default userSlice.reducer;
