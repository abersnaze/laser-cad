import { Machine } from "xstate";

const SET_TOOL = "SET_TOOL";
const SET_MODE = "SET_MODE";

export function setTool(tool) {
    return { type: SET_TOOL, payload: tool };
}

export function setMode(mode) {
    return { type: SET_MODE, payload: mode };
}

export const initialApplication = {
    mode: "cut",
    tool: "select",
    toolContext: {} as any,
    toolMachine: Machine({}),
};

export const applicationReducer = (state, action) => {
    switch (action.type) {
        case SET_TOOL:
            return { ...state, tool: action.payload }
        case SET_MODE:
            return { ...state, mode: action.payload }
        default:
            return state;
    }
};
