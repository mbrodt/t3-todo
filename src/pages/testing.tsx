import { NextPage } from "next";
import Link from "next/link";
import { trpc } from "../utils/trpc";
const Test: NextPage = () => {
  const { data: todos } = trpc.todo.list.useQuery();
  console.log("data:", todos);

  if (!todos) return <div>Loading...</div>;

  return (
    <div className="h-screen">
      <Link href="/test">To Test page</Link>
      <div>
        Here is the data
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}{" "}
      </div>
    </div>
  );
};

export default Test;
