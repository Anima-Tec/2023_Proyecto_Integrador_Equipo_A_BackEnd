import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import enviromentController from '../config/enviromentController.js';

const prisma = new PrismaClient();
const secretKey = enviromentController.validateSecretKey();

const getUserByToken = async (req, res) => {
  const token = req.headers.authorization; 
  console.log(token);
  if (!token) {
    return res.status(400).json({ error: 'Token not provided' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

const createUser = async (req, res) => {
  try {
    const {name, email, password} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.json({ message: 'User registered' });

  } catch (error) { 

    res.status(500).json({ error: 'Error registering user' });

  }
};

const loginUser = async (req, res) => {
  
  try {
    //comprueba existencia
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(401).json({ error: 'Incorrect credentials' });
    }

    //compara
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect credentials' });
    }

    //genera el token
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '10m' });
    res.json({ token });

  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
};


const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, idOficina } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
        idOficina: parseInt(idOficina),
      },
    });
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

const deleteUser = async (req, res) => {
  const { email } = req.params;
  try {
    await prisma.user.delete({
      where: { email: parseInt(email) },
    });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

export {getAllUsers, getUserById, createUser, updateUser, deleteUser, loginUser, getUserByToken}