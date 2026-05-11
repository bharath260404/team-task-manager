import { Response } from 'express';
import { prisma } from '../index.js';

export const createProject = async (req: any, res: Response) => {
  const { name, description } = req.body;
  const project = await prisma.project.create({
    data: { name, description, creatorId: req.user.id }
  });
  res.json(project);
};

export const getProjects = async (req: any, res: Response) => {
  const projects = await prisma.project.findMany({ include: { tasks: true } });
  res.json(projects);
};