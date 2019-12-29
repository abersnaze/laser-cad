import { Map, Set } from "immutable";

const SET_HIGHLIGH = 'SET_HIGHLIGH';
const CLEAR_HIGHLIGHT = 'CLEAR_HIGHLIGHT';

const SET_SELECTION = 'SET_SELECTION';
const TOGGLE_SELECTION = 'TOGGLE_SELECTION';
const CLEAR_SELECTION = 'CLEAR_SELECTION';

const START_AREA_SELECTION = 'START_AREA_SELECTION';
const FINISH_AREA_SELECTION = 'FINISH_AREA_SELECTION';

const SELECT_TOOL = 'SELECT_TOOL';
const SELECT_MODE = 'SELECT_MODE';

const SET_CURSOR = 'SET_CURSOR';
const CLEAR_CURSOR = 'CLEAR_CURSOR';

export function setHighlight(items, how) {
    return { type: SET_HIGHLIGH, payload: { items, how } };
}

export function clearHighlight(how) {
    return { type: CLEAR_HIGHLIGHT, payload: how };
}

export function setSelection() {
    return { type: SET_SELECTION };
}

export function toggleSelection() {
    return { type: TOGGLE_SELECTION };
}

export function clearSelection() {
    return { type: CLEAR_SELECTION };
}

export function startAreaSelection() {
    return { type: START_AREA_SELECTION };
}

export function finishAreaSelection(cumulative) {
    return { type: FINISH_AREA_SELECTION };
}

export function clearSelectTool(tool) {
    return { type: SELECT_TOOL, payload: tool };
}

export function clearSelectMode(mode) {
    return { type: SELECT_MODE, payload: mode };
}

export function setCusor(svgX, svgY, htmlX, htmlY) {
    return { type: SET_CURSOR, payload: { svg: { x: svgX, y: svgY }, html: { x: htmlX, y: htmlY } } };
}

export function clearCusor() {
    return { type: CLEAR_CURSOR };
}

export const initialApplication = {
    tool: 'select',
    drawMode: 'cut',
};

export const applicationReducer = (state, action) => {
    switch (action.type) {
        case SET_HIGHLIGH:
            return { ...state, highlight: state.highlight.set(action.payload.how, Set(action.payload.items)) }
        case CLEAR_HIGHLIGHT:
            return { ...state, highlight: state.highlight.set(action.payload, Set()) }

        case CLEAR_SELECTION:
            return { ...state, selected: Set() };
        case SET_SELECTION:
            return { ...state, selected: state.highlight.reduce((select, items) => select.union(items), Set()) };
        case TOGGLE_SELECTION:
            const allHighlighted = state.highlight.reduce((all, items) => all.union(items), Set());
            const selected = allHighlighted.reduce((selected, highlighted) =>
                selected.has(highlighted)
                    ? selected.remove(highlighted)
                    : selected.add(highlighted), state.selected)
            return { ...state, selected };

        case SET_CURSOR:
            const cursor = { svg: action.payload.svg, html: action.payload.html };
            const area = state.cursorDown
                ? {
                    x: Math.min(state.cursorDown.x, cursor.svg.x),
                    y: Math.min(state.cursorDown.y, cursor.svg.y),
                    width: Math.abs(state.cursorDown.x - cursor.svg.x),
                    height: Math.abs(state.cursorDown.y - cursor.svg.y),
                } : undefined;
            return { ...state, cursor, area };
        case CLEAR_CURSOR:
            return { ...state, cursor: undefined, cursorDown: undefined, area: undefined };
        case START_AREA_SELECTION:
            return {
                ...state,
                area: {
                    x: state.cursor.svg.x,
                    y: state.cursor.svg.y,
                    height: 0,
                    width: 0
                },
                cursorDown: state.cursor.svg
            };
        case FINISH_AREA_SELECTION:
            return { ...state, cursorDown: undefined, area: undefined };

        case SELECT_TOOL:
            return { ...state, tool: action.payload };
        case SELECT_MODE:
            return { ...state, mode: action.payload };
        default:
            return state;
    }
};
