import { Button, Popup } from "semantic-ui-react";
import { setMode, setTool } from "../ducks/app";
import { AppContext } from "../pages";
import Arc from "./icons/Arc";
import Circle from "./icons/Circle";
import Clone from "./icons/Clone";
import Cut from "./icons/Cut";
import Etch from "./icons/Etch";
import Line from "./icons/Line";
import Reference from "./icons/Reference";
import Select from "./icons/Select";

const tooltipDelay = 1000;
const DrawingTools = () => (<>
    <AppContext.Consumer>{({ state, dispatch }) => <>
        <Button.Group>
            <Popup
                content="Cut drawing mode"
                position="bottom right"
                mouseEnterDelay={tooltipDelay}
                on={["hover"]}
                trigger={<Button
                    active={state.app.mode === "cut"}
                    onClick={() => dispatch(setMode("cut"))}
                    className="icon"><Cut /></Button>} />
            <Popup
                content="Etch drawing mode"
                position="bottom right"
                mouseEnterDelay={tooltipDelay}
                on={["hover"]}
                trigger={<Button
                    active={state.app.mode === "etch"}
                    onClick={() => dispatch(setMode("etch"))}
                    className="icon"><Etch /></Button>} />
            <Popup
                content="Reference drawing mode"
                position="bottom right"
                mouseEnterDelay={tooltipDelay}
                on={["hover"]}
                trigger={<Button
                    active={state.app.mode === "ref"}
                    onClick={() => dispatch(setMode("ref"))}
                    className="icon"><Reference /></Button>} />
        </Button.Group>
        <Button.Group>
            <Popup
                content="Tool for selecting existing elements"
                position="bottom right"
                mouseEnterDelay={tooltipDelay}
                on={["hover"]}
                trigger={<Button
                    active={state.app.tool.type === "select"}
                    onClick={() => dispatch(setTool("select"))}
                    className="icon"><Select /></Button>} />
            <Popup
                content="Tool for drawing a fixed point"
                position="bottom right"
                mouseEnterDelay={tooltipDelay}
                on={["hover"]}
                trigger={<Button
                    active={state.app.tool.type === "anchor"}
                    onClick={() => dispatch(setTool("anchor"))}
                    icon="anchor" />} />
            <Popup
                content="Tool for drawing a line segment"
                position="bottom right"
                mouseEnterDelay={tooltipDelay}
                on={["hover"]}
                trigger={<Button
                    active={state.app.tool.type === "line"}
                    onClick={() => dispatch(setTool("line"))}
                    className="icon"><Line /></Button>} />
            <Popup
                content="Tool for drawing a circle"
                position="bottom right"
                mouseEnterDelay={tooltipDelay}
                on={["hover"]}
                trigger={<Button
                    active={state.app.tool.type === "circle"}
                    onClick={() => dispatch(setTool("circle"))}
                    className="icon"><Circle /></Button>} />
            <Popup
                content="Tool for drawing the segement of a circle"
                position="bottom right"
                mouseEnterDelay={tooltipDelay}
                on={["hover"]}
                trigger={<Button
                    active={state.app.tool.type === "arc"}
                    onClick={() => dispatch(setTool("arc"))}
                    className="icon"><Arc /></Button>} />
            <Popup
                content="Tool for putting down the shape of existing component"
                position="bottom right"
                mouseEnterDelay={tooltipDelay}
                on={["hover"]}
                trigger={<Button
                    active={state.app.tool.type === "shape"}
                    onClick={() => dispatch(setTool("shape"))}
                    className="icon"><Clone /></Button>} />
        </Button.Group>
    </>}</AppContext.Consumer>
</>);
export default DrawingTools;
