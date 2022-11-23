import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const NavBar = () => {
  const { data: session } = useSession();
  return (
    <nav className="flex ">
      {session && (
        <div className="flex items-center gap-2">
          <img
            className="h-8 w-8 rounded-full"
            src={session.user?.image as string}
          />

          <button onClick={() => signOut()} className="text-xl text-white">
            Sign out
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
