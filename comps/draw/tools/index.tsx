import Select from "./Select";

const typeComponents = {
    select: Select,
};

const Tool = ({ tool }) => {
    const ToolComp = typeComponents[tool.type];
    if (ToolComp === undefined) {
        return null;
    }
    return <ToolComp />;
};

export default Tool;
