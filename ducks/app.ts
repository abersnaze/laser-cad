import { Machine } from "xstate";

const SET_TOOL = "SET_TOOL";
const SET_MODE = "SET_MODE";
const SET_CURSOR = "SET_CURSOR";
const TOGGLE_INFO = "TOGGLE_INFO";

export function setTool(tool) {
    return { type: SET_TOOL, payload: tool };
}

export function setMode(mode) {
    return { type: SET_MODE, payload: mode };
}

export function setCursor(cursor) {
    return { type: SET_CURSOR, payload: cursor };
}

export function toggleInfo() {
    return { type: TOGGLE_INFO };
}

export const initialApplication = {
    cursor: undefined,
    mode: "cut",
    showInfo: false,
    tool: { type: "select" },
    toolContext: {} as any,
    toolMachine: Machine({}),
};

export const applicationReducer = (state = initialApplication, action) => {
    switch (action.type) {
        case SET_TOOL:
            return { ...state, tool: { type: action.payload } };
        case SET_MODE:
            return { ...state, mode: action.payload };
        case SET_CURSOR:
            return { ...state, cursor: action.payload };
        case TOGGLE_INFO:
            return { ...state, showInfo: !state.showInfo };
        default:
            return state;
    }
};
