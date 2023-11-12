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
  }

  return (
    <article className={`${priorityClass.background} p-1 w-20 rounded-xl`}>
      <div
        className={`${priorityClass.text} font-roboto-medium text-xs text-center text-white`}
      >
        Priority {priority}
      </div>
    </article>
  );
};

export default PriorityBadge;
