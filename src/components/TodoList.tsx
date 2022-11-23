import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Todo } from "@prisma/client";
import { LegacyRef, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { trpc } from "../utils/trpc";

const TodoList = () => {
  const { isLoading, data } = trpc.todo.list.useQuery();
  const utils = trpc.useContext();
  const [parent] = useAutoAnimate();
  const [title, setTitle] = useState("");

  const addMutation = trpc.todo.add.useMutation({
    onSettled: () => {
      setTitle("");
      utils.todo.list.invalidate();
    },
  });

  const toggleMutation = trpc.todo.toggle.useMutation({
    onSettled: () => {
      utils.todo.list.invalidate();
    },
  });

  const deleteMutation = trpc.todo.delete.useMutation({
    onSettled: () => {
      utils.todo.list.invalidate();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addMutation.mutate(title);
        }}
        className="flex items-stretch"
      >
        <input
          className="w-full rounded-l-lg bg-white px-2 py-2 text-3xl text-gray-800"
          type="text"
          onChange={(event) => setTitle(event.target.value)}
          value={title}
        />
        <button className=" rounded-r-lg bg-red-400 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2 px-4 text-white">
          Submit
        </button>
      </form>
      <ul
        className="flex flex-col gap-4"
        ref={parent as LegacyRef<HTMLUListElement>}
      >
        {data?.map((todo: Todo) => (
          <li key={todo.id} className="text-white">
            <label className="flex items-center gap-2">
              <input
                className="h-4 w-4 rounded-full border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                type="checkbox"
                checked={todo.completed}
                onChange={() => {
                  toggleMutation.mutate({
                    id: todo.id,
                    completed: !todo.completed,
                  });
                }}
              />
              <span className="text-lg font-bold">{todo.title}</span>
              <button
                onClick={() => deleteMutation.mutate(todo.id)}
                className="text-red-600"
              >
                x
              </button>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
