
export function undoableInit(initState) {
    return {
        future: [],
        past: [],
        present: initState,
    };
}

export function undoableReducer(initialState, reducer) {
    // Return a reducer that handles undo and redo
    return (state = initialState, action) => {
        const { past, present, future } = state;

        switch (action.type) {
            case "UNDO":
                const previous = past[past.length - 1];
                const newPast = past.slice(0, past.length - 1);
                return {
                    future: [present, ...future],
                    past: newPast,
                    present: previous,
                };
            case "REDO":
                const next = future[0];
                const newFuture = future.slice(1);
                return {
                    future: newFuture,
                    past: [...past, present],
                    present: next,
                };
            default:
                // Delegate handling the action to the passed reducer
                const newPresent = reducer(present, action);
                if (present === newPresent) {
                    return state;
                }
                return {
                    future: [],
                    past: [...past, present],
                    present: newPresent,
                };
        }
    };
}
