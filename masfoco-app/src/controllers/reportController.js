import { PrismaClient } from'@prisma/client';
const prisma = new PrismaClient();

const getAllReports = async (req, res) => {
  try {
    const reports = await prisma.report.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    
    const reportsWithUserNames = reports.map((report) => {
      return {
        id: report.id,
        title: report.title,
        description: report.description,
        category: report.category,
        urgency: report.urgency,
        status: report.status,
        creationDate: report.creationDate,
        user: report.user.name, 
      };
    });

    res.json(reportsWithUserNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

const getReportById = async (req, res) => {
  const { id } = req.params;
  try {
    const report = await prisma.report.findUnique({
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
  const { title, description, category, urgency, status, idUser } = req.body;
  try {
    const newReport = await prisma.report.create({
      data: {
        title,
        description,
        category,
        urgency,
        status,
        idUser: parseInt(idUser),
        creationDate: new Date(),
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
  const { title, description, category, urgency, status, endDate } = req.body;
  try {
    const updatedReport = await prisma.report.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        category,
        urgency,
        status,
        endDate,
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
    await prisma.report.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
};

export { getAllReports, getReportById, updateReport, deleteReport, createReport}