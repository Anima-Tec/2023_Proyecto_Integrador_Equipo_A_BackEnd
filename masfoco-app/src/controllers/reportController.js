import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getReports = async (req, res) => {
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

    const reportsWithUserNames = reports.map((report) => ({
      id: report.id,
      title: report.title,
      description: report.description,
      image: report.image,
      urgency: report.urgency,
      status: report.status,
      creationDate: report.creationDate,
      user: report.user.name,
    }));

    res.json(reportsWithUserNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

const getReportById = async (req, res) => {
  const { id } = req.params;
  try {
    const report = await prisma.report.findUnique({
      where: { id: parseInt(id) },
    });
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

const createReport = async (req, res) => {
  const { title, description, image, urgency, idUser } = req.body;

  // Validación de datos de entrada
  if (!title || !description || !idUser) {
    return res.status(400).json({ error: "Required fields missing" });
  }

  try {
    const newReport = await prisma.report.create({
      data: {
        title,
        description,
        image,
        urgency,
        status: "New",
        idUser: parseInt(idUser),
        creationDate: new Date(),
      },
    });
    res.status(201).json(newReport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

const updateReport = async (req, res) => {
  const { id } = req.params;
  const { title, description, urgency, status, endDate } = req.body;

  // Validación de datos de entrada
  if (!title || !description) {
    return res.status(400).json({ error: "Required fields missing" });
  }

  try {
    // Verificar si el informe existe antes de la actualización
    const existingReport = await prisma.report.findUnique({
      where: { id: parseInt(id) },
    });
    if (!existingReport) {
      return res.status(404).json({ error: "Report not found" });
    }

    const updatedReport = await prisma.report.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        status,
        urgency,
        endDate,
      },
    });
    res.json(updatedReport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

const deleteReport = async (req, res) => {
  const { id } = req.params;
  try {
    // Verificar si el informe existe antes de la eliminación
    const existingReport = await prisma.report.findUnique({
      where: { id: parseInt(id) },
    });
    if (!existingReport) {
      return res.status(404).json({ error: "Report not found" });
    }

    await prisma.report.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Report deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

export { getReports, getReportById, updateReport, deleteReport, createReport };
