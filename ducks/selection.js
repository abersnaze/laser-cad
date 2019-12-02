import { Set } from "immutable";

const TOGGLE_SELECTION = 'TOGGLE_SELECTION';
const CLEAR_SELECTION = 'CLEAR_SELECTION';
const SELECT_TOOL = 'SELECT_TOOL';
const SET_CURSOR = 'SET_CURSOR';
const CLEAR_CURSOR = 'CLEAR_CURSOR';

export function toggleSelection(item) {
    return { type: TOGGLE_SELECTION, payload: item };
}

export function clearSelection() {
    return { type: CLEAR_SELECTION };
}

export function setCusor(svgX, svgY, htmlX, htmlY) {
    return { type: SET_CURSOR, svg: { x: svgX, y: svgY }, html: { x: htmlX, y: htmlY } };
}
export function clearCusor() {
    return { type: CLEAR_CURSOR };
}

export const emptySelection = {
    selectedItems: Set(),
    selectedTool: 'select',
    cursor: undefined,
};

export const selectionReducer = (state, action) => {
    switch (action.type) {
        case CLEAR_SELECTION:
            return { ...state, selected: [] };
        case TOGGLE_SELECTION:
            const selected = state.selected.has(action.payload)
                ? state.selected.add(action.payload)
                : state.selected.remove(action.payload);
            return { ...state, selected };
        case SELECT_TOOL:
            return { ...state, selectedTool: action.payload };
        case SET_CURSOR:
            return { ...state, svg: action.svg, html: action.html };
        case CLEAR_CURSOR:
            return { ...state, svg: undefined, html: undefined };
        default:
            return state;
    }
};
