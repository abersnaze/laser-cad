import { useDispatch } from "react-redux";
import { Button, Dropdown } from "semantic-ui-react";
import { useTypedSelector } from "../ducks";
import { toggleInfo } from "../ducks/app";

const DocumentTools = () => {
    const [showInfo] = useTypedSelector((state) => [state.drawing.present.layout, state.app.showInfo]);
    const dispatch = useDispatch();
    const options = [];
    const currentValue = undefined;
    return <>
        <Button icon="info" active={showInfo === true} onClick={() => dispatch(toggleInfo())} />
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
    </>;
};

export default DocumentTools;
