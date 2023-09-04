const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllUserTecnicos = async (req, res) => {
  try {
    const userTecnicos = await prisma.usuarioTecnico.findMany();
    res.json(userTecnicos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

exports.getUserTecnicoById = async (req, res) => {
  const { id } = req.params;
  try {
    const userTecnico = await prisma.usuarioTecnico.findUnique({
      where: { id: parseInt(id) },
    });
    if (!userTecnico) {
      return res.status(404).json({ error: 'UserTecnico not found' });
    }
    res.json(userTecnico);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

exports.createUserTecnico = async (req, res) => {
  const { nombre, correo } = req.body;
  try {
    const newUserTecnico = await prisma.usuarioTecnico.create({
      data: {
        nombre,
        correo,
      },
    });
    res.status(201).json(newUserTecnico);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

exports.updateUserTecnico = async (req, res) => {
  const { id } = req.params;
  const { nombre, correo } = req.body;
  try {
    const updatedUserTecnico = await prisma.usuarioTecnico.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        correo,
      },
    });
    res.json(updatedUserTecnico);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

exports.deleteUserTecnico = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.usuarioTecnico.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'UserTecnico deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};
