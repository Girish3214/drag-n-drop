import { ColumnType } from "../../types";

const Column = ({
  title,
  headingColor,
  interviews,
  column,
  setInterviewsList,
}: ColumnType) => {
  console.log({
    title,
    headingColor,
    interviews,
    column,
    setInterviewsList,
  });
  return <div>Column</div>;
};

export { Column };
