import React from "react";

const Draggable = () => {
    React.useEffect(() => {
        if (process.browser) {
            document.addEventListener("", () => {
                // do nothing
            });
        }
        if (typeof document !== "undefined") {
            // do nothing
        }
    });
    return <></>;
};

export default Draggable;
