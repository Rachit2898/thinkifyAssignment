import { configureStore } from "@reduxjs/toolkit";

import playerSlice from "../features/player";

export default configureStore({
  reducer: {
    playerdata: playerSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
