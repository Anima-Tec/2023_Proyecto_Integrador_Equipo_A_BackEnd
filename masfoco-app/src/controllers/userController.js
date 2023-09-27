import { PrismaClient } from'@prisma/client';
const prisma = new PrismaClient();

getAllUsers = async (req, res) => {
  try {
    const users = await prisma.usuario.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

getUserById = async (req, res) => {
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

createUser = async (req, res) => {
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

updateUser = async (req, res) => {
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

deleteUser = async (req, res) => {
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

export { getAllUsers, getUserById, createUser, updateUser, deleteUser}