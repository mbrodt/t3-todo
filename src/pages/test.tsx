import { NextPage } from "next";
import Link from "next/link";
import TestScene from "../components/TestScene";

const Test: NextPage = () => {
  return (
    <div className="h-screen">
      <Link href="/testing">To testing page</Link>
      <TestScene />
    </div>
  );
};

export default Test;
