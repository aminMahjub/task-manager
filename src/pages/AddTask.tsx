import { Form, Link, redirect } from "react-router-dom";
import { ReactComponent as ChaveronLeft } from "../../public/svg/chavron-left-icon.svg";
import { ReactComponent as Checkmark } from "../../public/svg/checkmark-icon.svg";
import { QueryClient } from "@tanstack/react-query";
import api from "../api/api";
import { Task } from "../types";

export const action =
  (queryClient: QueryClient) =>
  async ({ request }: { request: Request }) => {
    try {
      const formData = await request.formData();

      const newTask = {
        title: formData.get("task-title"),
        description: formData.get("task-description"),
        priority: Number(formData.get("task-priority")),
        id: crypto.randomUUID(),
      } as Task;

      await api.post("tasks", newTask);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });

      return redirect("/");
    } catch (error) {
      console.error("Error in action:", error);
      throw error;
    }
  };

const AddTask = () => {
  return (
    <main className="h-screen bg-white">
      <header className="px-5 py-4 flex justify-between items-center gap-x-1">
        <div className="flex justify-center items-center gap-x-7">
          <Link to="/">
            <ChaveronLeft />
          </Link>

          <h1 className="text-xl font-roboto-medium text-black">Add</h1>
        </div>

        <button type="submit" form="add-task-form" title="add task">
          <Checkmark />
        </button>
      </header>

      <Form className="pt-10 px-4" replace id="add-task-form" method="POST">
        <input
          name="task-title"
          placeholder="Title"
          className="block w-full mb-6 pl-3 border rounded-md font-roboto-bold text-xl border-red-500 focus:outline-none valid:border-none"
          required
        />

        <textarea
          name="task-description"
          className="resize-none text-base font-roboto-regular w-full pl-3 h-full min-h-[500px] rounded-md border border-red-500 focus:outline-none valid:border-none"
          placeholder="Description"
          required
        ></textarea>

        <select
          name="task-priority"
          defaultValue="priority-1"
          title="select your priority"
          className="mt-2"
        >
          <option value={1}>Priority 1</option>
          <option value={2}>Priority 2</option>
          <option value={3}>Priority 3</option>
        </select>
      </Form>
    </main>
  );
};

export default AddTask;
