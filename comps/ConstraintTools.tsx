import { Button, Popup } from "semantic-ui-react";
import Distance from "./icons/Distance";
import Horizontal from "./icons/Horizontal";
import Parallel from "./icons/Parallel";
import Tangent from "./icons/Tangent";
import Vertical from "./icons/Vertical";

const tooltipDelay = 1000;

const ConstraintTools = () => (<>
    <Popup
        content="Set that line is tangent to a curve"
        position="left center"
        mouseEnterDelay={tooltipDelay}
        on={["hover"]}
        trigger={
            <Button className="icon"> <Tangent /> </Button>
        } />
    <Popup
        content="Set that two features are parallel aligned"
        position="left center"
        mouseEnterDelay={tooltipDelay}
        on={["hover"]}
        trigger={
            <Button className="icon"> <Parallel /> </Button>
        } />
    <Popup
        content="Set that two features are horizontally aligned"
        position="left center"
        mouseEnterDelay={tooltipDelay}
        on={["hover"]}
        trigger={
            <Button className="icon"> <Horizontal /> </Button>
        } />
    <Popup
        content="Set that two features are vertically aligned"
        position="left center"
        mouseEnterDelay={tooltipDelay}
        on={["hover"]}
        trigger={
            <Button className="icon"> <Vertical /> </Button>
        } />
    <Popup
        content="Set the distance between two features"
        position="left center"
        mouseEnterDelay={tooltipDelay}
        on={["hover"]}
        trigger={
            <Button className="icon"> <Distance /> </Button>
        } />
</>);

export default ConstraintTools;
