import { configureStore } from "@reduxjs/toolkit";
import contactUsSlice from "./contactUsSlice";

const store = configureStore({
    reducer: {
        contactForm: contactUsSlice
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch