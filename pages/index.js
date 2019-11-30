import Head from 'next/head';
import Frame from "../comps/Frame";
import { drawingReducer, emptyDrawing } from "../ducks/drawing";
import { emptySelection, selectionReducer } from "../ducks/selection";

export const AppContext = React.createContext();

export default () => {
    const [drawing, drawingDispatch] = React.useReducer(drawingReducer, emptyDrawing)
    const [select, selectDispatch] = React.useReducer(selectionReducer, emptySelection);
    const appContextValue = React.useMemo(() => {
        return {
            state: { drawing, select },
            dispatch: (action) => selectDispatch(drawingDispatch(state.drawing, action), action)
        };
    }, [drawing, drawingDispatch, select, selectDispatch]);

    return (<>
        <Head>
            <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
        </Head>
        <AppContext.Provider value={appContextValue}>
            <Frame />
        </AppContext.Provider>
    </>);
};

// http://www.petercollingridge.co.uk/tutorials/svg/interactive/dragging/
// https://davidmathlogic.com/colorblind/#%23D81B60-%231E88E5-%23FFC107-%2371b288

// #FFF34F hover
// #FFC107 selected
// #1E88E5 overconstrained
// #D81B60 draggable
// #71B288 fixed
// #252525 deselected
