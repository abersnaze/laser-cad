import { Button, Dropdown } from "semantic-ui-react";

const DocumentTools = () => {
    const options = [];
    const currentValue = undefined;
    const handleAddition = () => { };
    const handleChange = () => { };
    return (<>
        <Button icon="info" active />
        <Dropdown
            search selection allowAdditions
            placeholder='Choose a component name.'
            noResultsMessage='No existing components found.'
            options={options}
            value={currentValue}
            onAddItem={handleAddition}
            onChange={handleChange}
        />
        <Button icon="check" attached="right" />
        <Button icon="trash" />
        <Button icon="undo" />
        <Button icon="redo" />
        <Button.Group>
            <Button active>Free</Button>
            <Button>Array</Button>
            <Button>Radial</Button>
        </Button.Group>
    </>);
};

export default DocumentTools;
