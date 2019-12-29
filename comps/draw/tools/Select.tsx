import { useMachine } from "@xstate/react";
import { Set } from "immutable";
import { Machine } from "xstate";

const selectMachine = Machine({
    context: {
        highlighted: Set(),
        selected: Set(),
    },
    id: "select",
    initial: "outsideUp",
    states: {
        insideDown: {
            on: {
                MOVE: "insideDownDrag",
                UP: "insideUp",
            },
        },
        insideDownArea: {
            on: {
                LEAVE: "outsideDownArea",
                UP: "insideUp",
            },
        },
        insideDownDrag: {
            on: {
                UP: "insideUp",
            },
        },
        insideUp: {
            on: {
                DOWN: "insideDown",
                LEAVE: "outsideUp",
            },
        },
        outsideDown: {
            on: {
                MOVE: "outsideDownArea",
                UP: "outsideUp",
            },
        },
        outsideDownArea: {
            on: {
                ENTER: "insideDownArea",
                UP: "outsideUp",
            },
        },
        outsideUp: {
            on: {
                DOWN: "outsideDown",
                ENTER: "insideUp",
            },
        },
    },
});

const Select = () => {
    const [current, send] = useMachine(selectMachine);

};

export default Select;
