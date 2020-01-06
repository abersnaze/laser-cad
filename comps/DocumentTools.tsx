import { Button, Dropdown } from "semantic-ui-react";
import { setMode } from "../ducks/drawing";
import { AppContext } from "../pages";

const DocumentTools = () => {
    const options = [];
    const currentValue = undefined;
    return (<AppContext.Consumer>{({ state, dispatch }) => <>
        <Button icon="info" active />
        <Dropdown
            search selection allowAdditions
            placeholder="Choose a component name."
            noResultsMessage="No existing components found."
            options={options}
            value={currentValue}
        />
        <Button icon="check" attached="right" />
        <Button icon="trash" />
        <Button icon="undo" />
        <Button icon="redo" />
        <Button.Group>
            <Button
                active={state.drawing.present.mode === "free"}
                onClick={() => dispatch(setMode("free"))}
            >Free</Button>
            <Button.Or />
            <Button
                active={state.drawing.present.mode === "array"}
                onClick={() => dispatch(setMode("array"))}
            >Array</Button>
            <Button.Or />
            <Button
                active={state.drawing.present.mode === "radial"}
                onClick={() => dispatch(setMode("radial"))}
            >Radial</Button>
        </Button.Group>
    </>}
    </AppContext.Consumer>);
};

export default DocumentTools;
