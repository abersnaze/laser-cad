import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown } from "semantic-ui-react";
import { toggleInfo } from "../ducks/app";
import { setMode } from "../ducks/drawing";

const DocumentTools = () => {
    const [mode, showInfo] = useSelector((state) => [state.drawing.present.mode, state.app.showInfo]);
    const dispatch = useDispatch();
    const options = [];
    const currentValue = undefined;
    return <>
        <Button icon="info" active={showInfo} onClick={() => dispatch(toggleInfo())} />
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
                active={mode === "free"}
                onClick={() => dispatch(setMode("free"))}
            >Free</Button>
            <Button
                active={mode === "array"}
                onClick={() => dispatch(setMode("array"))}
            >Array</Button>
            <Button
                active={mode === "radial"}
                onClick={() => dispatch(setMode("radial"))}
            >Radial</Button>
        </Button.Group>
    </>;
};

export default DocumentTools;
