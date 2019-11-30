const TOGGLE_SELECTION = 'TOGGLE_SELECTION';
const CLEAR_SELECTION = 'CLEAR_SELECTION';
const SELECT_TOOL = 'SELECT_TOOL';

export function toggleSelection(item) {
    return { type: TOGGLE_SELECTION, payload: item };
}

export function clearSelection() {
    return { type: CLEAR_SELECTION };
}

export const emptySelection = {
    selectedItems: [],
    selectedTool: 'select'
};

export const selectionReducer = (state, action) => {
    switch (action.type) {
        case CLEAR_SELECTION:
            return { ...state, selected: [] };
        case TOGGLE_SELECTION:
            const index = state.selected.indexOf(action.payload);
            const newSelected = (index === -1)
                ? state.selected.concat(action.payload)
                : [
                    ...state.selected.slice(0, index),
                    ...state.selected.slice(index + 1, state.selected.length)
                ];
            return { ...state, selected: newSelected };
        case SELECT_TOOL:
            return { ...state, selectedTool: action.payload };
        default:
            return state;
    }
};
