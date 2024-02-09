// "global state"
// think of a global store/state as the "whole cake"
import { configureStore } from "@reduxjs/toolkit";

import { articleApi } from './article';

export const store = configureStore({
    reducer: { // allow us to get a specific slice of the cake, which in this case is the article API
        [articleApi.reducerPath]: articleApi.reducer
    }, 
    middleware: (getDefaultMiddleware) => // allows us to do something with a state before we get it
    getDefaultMiddleware().concat(articleApi.middleware)
});