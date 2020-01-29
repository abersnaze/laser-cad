import {TypedUseSelectorHook, useSelector } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import undoable, { excludeAction, groupByActionTypes } from "redux-undo";
import { applicationReducer } from "./app";
import { applyTransform, drawingReducer, setScale } from "./drawing";
import { selectReducer } from "./tools/select";

const reducer = combineReducers({
    app: applicationReducer,
    drawing: undoable(drawingReducer, {
        // filter out UI scaling events.
        filter: excludeAction([setScale(0).type]),
        // group together the pan/zoom movements.
        groupBy: groupByActionTypes([applyTransform().type]),
    }),
    select: selectReducer,
});

type RootState = ReturnType<typeof reducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const initialState = reducer(undefined, { type: undefined });

export const initializeStore = (preloadedState = initialState) => {
    return createStore(
        reducer,
        preloadedState,
        composeWithDevTools(applyMiddleware()),
    );
};
