import dotenv from 'dotenv';
import express from 'express';
// import database from './core/database.js';
import server from './core/server.js';
import { PrismaClient } from '@prisma/client';
import morgan from 'morgan';

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
dotenv.config();

const app = express();
app.use(express.json()); // required when we want to access request body data
app.use(morgan('dev'));

// Connect DB
// database();

app.get('/', (req, res) => {
  res.send('hello')
})
const prisma = new PrismaClient();
app.get('/user', async (req, res) => {
  try {
    const user = await prisma.user.findMany({})
    res.json(user)
  } catch (error) {

  }
})

app.post('/user', async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name
      }
    })
    return res.json(user)
  } catch (error) {
    return res.json(error.message)
  }
})
// Configure and Start Server
server(app);
