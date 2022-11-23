import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const todoRouter = router({
  list: protectedProcedure.query(async ({ ctx: { prisma, session } }) => {
    const todos = await prisma.todo.findMany({
      where: {
        authorId: session?.user?.id,
      },
    });
    return todos;
  }),
  add: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    console.log("inside mutation", input);
    const todo = await ctx.prisma.todo.create({
      data: {
        title: input,
        authorId: ctx.session?.user?.id as string,
      },
    });
    return todo;
  }),
  toggle: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        completed: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const todo = await ctx.prisma.todo.update({
        where: {
          id: input.id,
        },
        data: {
          completed: input.completed,
        },
      });
      return todo;
    }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const todo = await ctx.prisma.todo.delete({
        where: {
          id: input,
        },
      });
      return todo;
    }),
});
