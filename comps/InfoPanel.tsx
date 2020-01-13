import React from "react";
import { Accordion, Icon, List } from "semantic-ui-react";
import { AppContext } from "../pages";
import Num from "./Num";

const InfoPanel = () => {
    const [expanded, setExpanded] = React.useState(new Set());
    const handleClick = (e, { index, active }) => {
        const newExpanded = new Set(expanded);
        if (active) {
            newExpanded.delete(index);
        } else {
            newExpanded.add(index);
        }
        setExpanded(newExpanded);
    };
    return (<>
        <div style={{ width: "200px" }}>
            <Accordion styled fluid>
                <Accordion.Title
                    index={0}
                    onClick={handleClick}
                    active={expanded.has(0)}
                    icon="dropdown"
                    content="Constraints"
                />
                <Accordion.Content active={expanded.has(0)}>
                    asdf
                </Accordion.Content>
                <Accordion.Title
                    index={1}
                    onClick={handleClick}
                    active={expanded.has(1)}
                    icon="dropdown"
                    content="Variables"
                />
                <Accordion.Content active={expanded.has(1)}>
                    qwer
                </Accordion.Content>
                <Accordion.Title
                    index={2}
                    onClick={handleClick}
                    active={expanded.has(2)}
                    icon="dropdown"
                    content="Debug"
                />
                <Accordion.Content active={expanded.has(2)}>
                    <AppContext.Consumer>{({ state }) => {
                        const drawing = state.drawing.present;
                        return <dl>
                            <dt>Cursor</dt>
                            <dd>{
                                state.app.cursor === undefined
                                    ? "NA"
                                    : <>
                                        <Num x={state.app.cursor.x} /> <Num x={state.app.cursor.y} />
                                    </>
                            }</dd>
                            <dt>Pixel</dt>
                            <dd><Num x={drawing.px} /></dd>
                            <dt>Zoom</dt>
                            <dd><Num x={drawing.transform.a} /></dd>
                            <dt>Pan</dt>
                            <dd>
                                <Num x={-drawing.transform.e / drawing.transform.a} />
                                <Num x={-drawing.transform.f / drawing.transform.a} />
                            </dd>
                        </dl>;
                    }}</AppContext.Consumer>
                </Accordion.Content>
            </Accordion>
        </div>
    </>);
};
export default InfoPanel;
