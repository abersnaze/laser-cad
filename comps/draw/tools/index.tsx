import Select from "./Select";

const typeComponents = {
    select: Select,
}

const Tool = ({ tool, px, solution }) => {
    const ToolComp = typeComponents[tool.type];
    if (ToolComp === undefined)
        return null;
    return <ToolComp
        {...tool}
        px={px}
        solution={solution}
    />;
};

export default Tool;
