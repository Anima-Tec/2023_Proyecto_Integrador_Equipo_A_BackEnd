const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.usuario.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
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

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  const { nombre, correo, idOficina } = req.body;
  try {
    const newUser = await prisma.usuario.create({
      data: {
        nombre,
        correo,
        idOficina: parseInt(idOficina),
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

// Actualizar un usuario por ID
exports.updateUser = async (req, res) => {
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

// Eliminar un usuario por ID
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.usuario.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};
