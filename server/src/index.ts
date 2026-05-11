import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth.js';
import { authenticate, authorize } from './middleware/auth.js';
import { createProject, getProjects } from './controllers/project.js';
import { createTask, updateTaskStatus, getTasks } from './controllers/task.js';

dotenv.config();
const app = express();
export const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Project Routes (RBAC: Only ADMIN can create)
app.post('/api/projects', authenticate, authorize(['ADMIN']), createProject);
app.get('/api/projects', authenticate, getProjects);

// Task Routes
app.get('/api/tasks', authenticate, getTasks);
app.post('/api/tasks', authenticate, authorize(['ADMIN']), createTask);
app.patch('/api/tasks/:id', authenticate, updateTaskStatus);

app.get('/', (req, res) => res.send('🚀 API is Live'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));