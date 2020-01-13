const Num = ({ x }) => {
    const rounded = Math.round(x * 100) / 100;
    const padded = rounded.toString().padStart(6, " ");
    return <span style={{ fontFamily: "monospace" }}>{padded}</span>;
};

export default Num;
