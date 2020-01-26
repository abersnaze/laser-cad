import { Machine } from "xstate";
import * as mouse from "../mouse";

const selectMachine = Machine({
    context: {
        highlighted: [],
        selected: [],
    },
    id: "select",
    initial: "outsideUp",
    states: {
        insideDown: {
            on: {
                [mouse.MOVE]: "insideDownDrag",
                [mouse.UP]: "insideUp",
            },
        },
        insideDownArea: {
            on: {
                [mouse.LEAVE]: "outsideDownArea",
                [mouse.UP]: "insideUp",
            },
        },
        insideDownDrag: {
            on: {
                [mouse.UP]: "insideUp",
            },
        },
        insideUp: {
            on: {
                [mouse.DOWN]: "insideDown",
                [mouse.LEAVE]: "outsideUp",
            },
        },
        outsideDown: {
            on: {
                [mouse.MOVE]: "outsideDownArea",
                [mouse.UP]: "outsideUp",
            },
        },
        outsideDownArea: {
            on: {
                [mouse.ENTER]: "insideDownArea",
                [mouse.UP]: "outsideUp",
            },
        },
        outsideUp: {
            on: {
                [mouse.DOWN]: "outsideDown",
                [mouse.ENTER]: "insideUp",
            },
        },
    },
});

export const selectReducer = (state = selectMachine.initialState, action) => {
    if (action.type) {
        return selectMachine.transition(state, action);
    }
    return state;
};
