const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todos los supervisores
exports.getAllSupervisors = async (req, res) => {
  try {
    const supervisors = await prisma.usuarioSupervisor.findMany();
    res.json(supervisors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

// Obtener un supervisor por ID
exports.getSupervisorById = async (req, res) => {
  const { id } = req.params;
  try {
    const supervisor = await prisma.usuarioSupervisor.findUnique({
      where: { id: parseInt(id) },
    });
    if (!supervisor) {
      return res.status(404).json({ error: 'Supervisor not found' });
    }
    res.json(supervisor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

// Crear un nuevo supervisor
exports.createSupervisor = async (req, res) => {
  const { nombre, correo } = req.body;
  try {
    const newSupervisor = await prisma.usuarioSupervisor.create({
      data: {
        nombre,
        correo,
      },
    });
    res.status(201).json(newSupervisor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

// Actualizar un supervisor por ID
exports.updateSupervisor = async (req, res) => {
  const { id } = req.params;
  const { nombre, correo } = req.body;
  try {
    const updatedSupervisor = await prisma.usuarioSupervisor.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        correo,
      },
    });
    res.json(updatedSupervisor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

// Eliminar un supervisor por ID
exports.deleteSupervisor = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.usuarioSupervisor.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Supervisor deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};
