import { MOUSE_MOVE } from "./mouse";

const SET_TOOL = "SET_TOOL";
const SET_DEF_EDGE_STYLE = "SET_DEF_EDGE_STYLE";
const SET_DEF_FILL_STYLE = "SET_DEF_FILL_STYLE";
const TOGGLE_INFO = "TOGGLE_INFO";

export function setTool(tool) {
    return { type: SET_TOOL, payload: tool };
}

export function setDefaultEdgeStyle(styles) {
    return { type: SET_DEF_EDGE_STYLE, payload: styles };
}
export function setDefaultFillStyle(styles) {
    return { type: SET_DEF_FILL_STYLE, payload: styles };
}

export function toggleInfo() {
    return { type: TOGGLE_INFO };
}

export const initialApplication = {
    cursor: undefined,
    defaultEdgeStyle: "cut",
    defaultFillStyle: "solid",
    showInfo: false,
    tool: { type: "select" },
};

export const applicationReducer = (state = initialApplication, action) => {
    switch (action.type) {
        case SET_TOOL:
            return { ...state, tool: { type: action.payload } };
        case SET_DEF_EDGE_STYLE:
            return { ...state, defaultEdgeStyle: action.payload };
        case SET_DEF_FILL_STYLE:
            return { ...state, defaultFillStyle: action.payload };
        case MOUSE_MOVE:
            return { ...state, cursor: action.payload };
        case TOGGLE_INFO:
            return { ...state, showInfo: !state.showInfo };
        default:
            return state;
    }
};
