import { assign, AssignAction, Machine } from "xstate";
import { IPoint } from "../../lib/IPoint";
import { MOUSE_DOWN, MOUSE_ENTER, MOUSE_LEAVE, MOUSE_MOVE, MOUSE_UP } from "../mouse";

const selectMachine = Machine({
    context: {
        from: undefined as IPoint | undefined,
        hover: {},
        selected: {},
    },
    id: "select",
    initial: "outsideUp",
    states: {
        insideDown: {
            on: {
                [MOUSE_MOVE]: "insideDownDrag",
                [MOUSE_UP]: "insideUp",
            },
        },
        insideDownArea: {
            on: {
                [MOUSE_LEAVE]: "outsideDownArea",
                [MOUSE_UP]: {
                    actions: assign((context, event) => ({
                        ...context,
                        from: undefined,
                    })) as AssignAction<any, any>,
                    target: "insideUp",
                },
            },
        },
        insideDownDrag: {
            on: {
                [MOUSE_UP]: "insideUp",
            },
        },
        insideUp: {
            on: {
                [MOUSE_DOWN]: {
                    actions: assign((context, event) => ({
                        ...context,
                        from: event.payload.cursor,
                    })) as AssignAction<any, any>,
                    target: "insideDown",
                },
                [MOUSE_LEAVE]: {
                    actions: assign((context, event) => {
                        const { [event.payload]: s, ...hover } = context.hover;
                        return ({
                            ...context,
                            hover,
                        });
                    }) as AssignAction<any, any>,
                    target: "outsideUp",
                },
            },
        },
        outsideDown: {
            on: {
                [MOUSE_MOVE]: "outsideDownArea",
                [MOUSE_UP]: "outsideUp",
            },
        },
        outsideDownArea: {
            on: {
                [MOUSE_ENTER]: "insideDownArea",
                [MOUSE_UP]: {
                    actions: assign((context, event) => ({
                        ...context,
                        from: undefined,
                    })) as AssignAction<any, any>,
                    target: "outsideUp",
                },
            },
        },
        outsideUp: {
            on: {
                [MOUSE_DOWN]: {
                    actions: assign((context, event) => ({
                        ...context,
                        from: event.payload.cursor,
                    })) as AssignAction<any, any>,
                    target: "outsideDown",
                },
                [MOUSE_ENTER]: {
                    actions: assign((context, event) => {
                        return ({
                            ...context,
                            hover: {
                                ...context.hover,
                                [event.payload]: true,
                            },
                        });
                    }) as AssignAction<any, any>,
                    target: "insideUp",
                },
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
