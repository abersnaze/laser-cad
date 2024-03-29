import Head from "next/head";
import React from "react";
import Frame from "../comps/Frame";
import { applicationReducer, initialApplication } from "../ducks/app";
import { drawingReducer, emptyDrawing } from "../ducks/drawing";
import { withRedux } from "../lib/redux";

const IndexPage = () => {
    return (<>
        <Head>
            <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
        </Head>
        <Frame />
    </>);
};

export default withRedux(IndexPage);

// https://github.com/chrvadala/react-svg-pan-zoom
// http://www.petercollingridge.co.uk/tutorials/svg/interactive/dragging/
// https://davidmathlogic.com/colorblind/#%23D81B60-%231E88E5-%23FFC107-%2371b288

// #FFF34F hover
// #FFC107 selected
// #1E88E5 overconstrained
// #D81B60 draggable
// #71B288 fixed
// #252525 deselected
