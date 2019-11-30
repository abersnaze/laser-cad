import { Accordion, List, Icon } from "semantic-ui-react";
import React from 'react';

const InfoPanel = () => {
    const [expanded, setExpanded] = React.useState(new Set());
    const handleClick = (e, { index, active }) => {
        const newExpanded = new Set(expanded);
        if (active) {
            newExpanded.delete(index)
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
                    active={expanded.has(0)}>
                    <Icon name="dropdown" />
                    Constraints
            </Accordion.Title>
                <Accordion.Content active={expanded.has(0)}>
                    asdf
                <List>
                    </List>
                </Accordion.Content>
                <Accordion.Title
                    index={1}
                    onClick={handleClick}
                    active={expanded.has(1)}>
                    <Icon name="dropdown" />
                    Variables
            </Accordion.Title>
                <Accordion.Content active={expanded.has(1)}>
                    qwer
            </Accordion.Content>
            </Accordion>
        </div>
    </>);
};
export default InfoPanel;
