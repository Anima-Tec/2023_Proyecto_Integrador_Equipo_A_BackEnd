import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import enviromentController from '../middleware/authmddlw.js';


const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.usuario.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.usuario.findUnique({
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
  //try {
    const {nombre, correo, password} = req.body;

    //encripta la pass y carga el user en la tabla
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.usuario.create({
      data: {
        nombre,
        correo,
        password: hashedPassword,
      },
    });

    res.json({ message: 'Usuario registrado con éxito' });

  //} catch (error) { 

    //res.status(500).json({ error: 'Error al registrar el usuario' });

  //}
};

const loginUser = async (req, res) => {
  
const secretKey = enviromentController.validateSecretKey();
  try {
    //comprueba existencia
    const { email, password } = req.body;
    const user = await prisma.usuario.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    //compara
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    //genera el token
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
    res.json({ token });

  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};


const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, idOficina } = req.body;
  try {
    const updatedUser = await prisma.usuario.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        correo,
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
    await prisma.usuario.delete({
      where: { email: parseInt(email) },
    });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

export {getAllUsers, getUserById, createUser, updateUser, deleteUser, loginUser}