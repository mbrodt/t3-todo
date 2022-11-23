import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import NavBar from "../components/NavBar";
import TodoList from "../components/TodoList";

const Home: NextPage = () => {
  const { data: session } = useSession();
  console.log("session:", session);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <NavBar />
          {session ? (
            <>
              <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                Big Fat TODO list
              </h1>
              <TodoList />
            </>
          ) : (
            <button onClick={() => signIn()} className="text-3xl text-white">
              Log in
            </button>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;