import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import undoable, { groupByActionTypes } from "redux-undo";
import { applicationReducer } from "./app";
import { applyTransform, drawingReducer } from "./drawing";

const reducer = combineReducers({
    app: applicationReducer,
    drawing: undoable(drawingReducer, {
        // group together the pan/zoom movements.
        groupBy: groupByActionTypes([applyTransform().type]),
    }),
});

const initialState = reducer(undefined, { type: undefined });

export const initializeStore = (preloadedState = initialState) => {
    return createStore(
        reducer,
        preloadedState,
        composeWithDevTools(applyMiddleware()),
    );
};
