import { configureStore } from "@reduxjs/toolkit";
import contactUsSlice from "./contactUsSlice";
import newsSlice from "./newsSlice";

const store = configureStore({
    reducer: {
        contactForm: contactUsSlice,
        news: newsSlice
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch