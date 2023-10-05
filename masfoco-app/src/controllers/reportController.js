import { PrismaClient } from'@prisma/client';
const prisma = new PrismaClient();

const getAllReports = async (req, res) => {
  try {
    const reports = await prisma.reporte.findMany();
    res.json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

const getReportById = async (req, res) => {
  const { id } = req.params;
  try {
    const report = await prisma.reporte.findUnique({
      where: { id: parseInt(id) },
    });
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }
    res.json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

const createReport = async (req, res) => {
  const { titulo, descripcion, categoria, prioridad, estado, idUsuario } = req.body;
  try {
    const newReport = await prisma.reporte.create({
      data: {
        titulo,
        descripcion,
        categoria,
        prioridad,
        estado,
        idUsuario: parseInt(idUsuario),
        fechaCreacion: new Date(),
      },
    });
    res.status(201).json(newReport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

const updateReport = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, categoria, prioridad, estado, fechaFinalizacion } = req.body;
  try {
    const updatedReport = await prisma.reporte.update({
      where: { id: parseInt(id) },
      data: {
        titulo,
        descripcion,
        categoria,
        prioridad,
        estado,
        fechaFinalizacion,
      },
    });
    res.json(updatedReport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

const deleteReport = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.reporte.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

export { getAllReports, getReportById, updateReport, deleteReport, createReport}