import { assign, AssignAction, Machine } from "xstate";
import { IPoint } from "../../lib/IPoint";
import * as QKDT from "../../lib/QuadKDTree";
import { MOUSE_DOWN, MOUSE_ENTER, MOUSE_LEAVE, MOUSE_MOVE, MOUSE_UP } from "../mouse";

interface ISelectContext {
    from?: IPoint;
    hover: { [key: string]: boolean };
    selected: { [key: string]: boolean };
    tree?: QKDT.IQuad;
    makeTree: () => QKDT.IQuad;
}

export const NO_TREE = () => undefined;

const selectMachine = Machine({
    context: {
        from: undefined,
        hover: {},
        makeTree: NO_TREE,
        selected: {},
        tree: undefined,
    } as ISelectContext,
    id: "select",
    initial: "outsideUp",
    states: {
        insideDown: {
            on: {
                [MOUSE_MOVE]: {
                    actions: assign((context, event) => ({
                        ...context,
                        makeTree: NO_TREE,
                        tree: context.makeTree(),
                    })) as AssignAction<ISelectContext, any>,
                    target: "insideDownDrag",
                },
                [MOUSE_UP]: {
                    actions: assign((context, event) => ({
                        ...context,
                        selected: { ...context.selected, ...context.hover },
                    })) as AssignAction<ISelectContext, any>,
                    target: "insideUp",
                },
            },
        },
        insideDownArea: {
            on: {
                [MOUSE_LEAVE]: {
                    actions: assign((context, event) => ({
                        ...context,
                    })) as AssignAction<ISelectContext, any>,
                    target: "outsideDownArea",
                },
                [MOUSE_UP]: {
                    actions: assign((context, event) => ({
                        ...context,
                        from: undefined,
                        tree: undefined,
                    })) as AssignAction<ISelectContext, any>,
                    target: "insideUp",
                },
            },
        },
        insideDownDrag: {
            on: {
                [MOUSE_UP]: {
                    actions: assign((context, event) => ({
                        ...context,
                    })) as AssignAction<ISelectContext, any>,
                    target: "insideUp",
                },
            },
        },
        insideUp: {
            on: {
                [MOUSE_DOWN]: {
                    actions: assign((context, event) => {
                        // if a modifier is held down on click don't clear what was previously selected.
                        const selected = event.payload.modified ? context.selected : {};
                        return {
                            ...context,
                            from: event.payload.cursor,
                            makeTree: event.payload.makeTree,
                            selected,
                        };
                    }) as AssignAction<ISelectContext, any>,
                    target: "insideDown",
                },
                [MOUSE_LEAVE]: {
                    actions: assign((context, event) => {
                        const { [event.payload]: s, ...hover } = context.hover;
                        return ({
                            ...context,
                            hover,
                        });
                    }) as AssignAction<ISelectContext, any>,
                    target: "outsideUp",
                },
            },
        },
        outsideDown: {
            on: {
                [MOUSE_MOVE]: {
                    actions: assign((context, event) => {
                        return ({
                            ...context,
                            makeTree: NO_TREE,
                            tree: context.makeTree(),
                        });
                    }) as AssignAction<ISelectContext, any>,
                    target: "outsideDownArea",
                },
                [MOUSE_UP]: {
                    actions: assign((context, event) => ({
                        ...context,
                    })) as AssignAction<ISelectContext, any>,
                    target: "outsideUp",
                },
            },
        },
        outsideDownArea: {
            on: {
                [MOUSE_ENTER]: {
                    actions: assign((context, event) => ({
                        ...context,
                    })) as AssignAction<ISelectContext, any>,
                    target: "insideDownArea",
                },
                [MOUSE_UP]: {
                    actions: assign((context, event) => ({
                        ...context,
                        from: undefined,
                        tree: undefined,
                    })) as AssignAction<ISelectContext, any>,
                    target: "outsideUp",
                },
            },
        },
        outsideUp: {
            on: {
                [MOUSE_DOWN]: {
                    actions: assign((context, event) => {
                        // if a modifier is held down on click don't clear what was previously selected.
                        const selected = event.payload.modified ? context.selected : {};
                        return {
                            ...context,
                            from: event.payload.cursor,
                            makeTree: event.payload.makeTree,
                            selected,
                        };
                    }) as AssignAction<ISelectContext, any>,
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
                    }) as AssignAction<ISelectContext, any>,
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
