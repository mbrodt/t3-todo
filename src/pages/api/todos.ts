import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { prisma } from "../../server/db/client";
import { authOptions } from "./auth/[...nextauth]";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("req:", req);
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401);
    res.end();
  }

  if (req.method === "GET") {
    const todos = await prisma.todo.findMany({
      where: {
        authorId: session?.user?.id,
      },
    });
    res.status(200).json(todos);
  }
  if (req.method === "POST") {
    const todo = await prisma.todo.create({
      data: {
        title: req.body.title,
        authorId: session?.user?.id as string,
      },
    });
    res.status(200).json(todo);
  }
  if (req.method === "PUT") {
    const todo = await prisma.todo.update({
      where: {
        id: req.body.id,
      },
      data: {
        title: req.body.title,
        completed: req.body.completed,
      },
    });
    res.status(200).json(todo);
  }
  if (req.method === "DELETE") {
    const todo = await prisma.todo.delete({
      where: {
        id: req.body.id,
      },
    });
    res.status(200).json(todo);
  }
};
