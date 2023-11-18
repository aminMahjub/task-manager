import { PriorityType } from "../types";

const PriorityBadge = ({ priority }: { priority: PriorityType }) => {
  let priorityClass = {
    text: "",
    background: "",
  };

  switch (priority) {
    case 1:
      priorityClass = {
        text: "text-prioty-text-1",
        background: "bg-prioty-bg-1",
      };
      break;
    case 2:
      priorityClass = {
        text: "text-prioty-text-2",
        background: "bg-prioty-bg-2",
      };
      break;

    case 3:
      priorityClass = {
        text: "text-prioty-text-3",
        background: "bg-prioty-bg-3",
      };
      break;
    default:
      priorityClass = {
        text: "text-rose-400",
        background: "bg-rose-600",
      };
  }

  return (
    <article className={`${priorityClass.background} p-1 w-20 rounded-xl`}>
      <div
        className={`${priorityClass.text} font-roboto-medium text-xs text-center text-white`}
      >
        {priority ? `Priority ${priority}` : "No Priority"}
      </div>
    </article>
  );
};

export default PriorityBadge;
