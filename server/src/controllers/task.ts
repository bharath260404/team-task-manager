import { Request, Response } from 'express';
import { prisma } from '../index.js';

export const getTasks = async (req: any, res: Response) => {
  const tasks = await prisma.task.findMany({
    where: req.user.role === 'ADMIN' ? {} : { assigneeId: req.user.id },
    include: { project: true }
  });
  res.json(tasks);
};

export const createTask = async (req: Request, res: Response) => {
  const { title, projectId, assigneeId, dueDate } = req.body;
  const task = await prisma.task.create({
    data: { title, projectId, assigneeId, dueDate: new Date(dueDate) }
  });
  res.json(task);
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  const { status } = req.body;
  const task = await prisma.task.update({
    where: { id: req.params.id },
    data: { status }
  });
  res.json(task);
};