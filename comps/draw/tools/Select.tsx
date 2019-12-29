import { useMachine } from '@xstate/react';
import { Machine } from 'xstate';
import { Set } from 'immutable';

const selectMachine = Machine({
    id: 'select',
    initial: 'outsideUp',
    context: {
        selected: Set(),
        highlighted: Set(),
    },
    states: {
        outsideUp: {
            on: {
                DOWN: 'outsideDown',
                ENTER: 'insideUp',
            }
        },
        outsideDown: {
            on: {
                UP: 'outsideUp',
                MOVE: 'outsideDownArea',
            }
        },
        outsideDownArea: {
            on: {
                UP: 'outsideUp',
                ENTER: 'insideDownArea',
            }
        },
        insideDownArea: {
            on: {
                LEAVE: 'outsideDownArea',
                UP: 'insideUp',
            }
        },
        insideUp: {
            on: {
                LEAVE: 'outsideUp',
                DOWN: 'insideDown',
            }
        },
        insideDown: {
            on: {
                UP: 'insideUp',
                MOVE: 'insideDownDrag',
            }
        },
        insideDownDrag: {
            on: {
                UP: 'insideUp',
            }
        },
    }
});

const Select = () => {
    const [current, send] = useMachine(selectMachine);

};

export default Select;
