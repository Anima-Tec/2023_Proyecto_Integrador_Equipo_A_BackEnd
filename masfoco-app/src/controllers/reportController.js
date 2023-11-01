import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import enviromentController from "../config/enviromentController.js";

const secretKey = enviromentController.validateSecretKey();
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
        community: {
          select: {
            id: true,
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
      community: report.community.id, // Agrega el nombre de la comunidad
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
  const { title, description, image, urgency, idUser, idCommunity } = req.body;
  if (!title || !description || !idUser || !idCommunity) {
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
        // category: "Maintenance",
        idUser: parseInt(idUser),
        idCommunity: parseInt(idCommunity),
        creationDate: new Date(),
      },
    });
    res
      .status(201)
      .json(newReport);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Something went wrong!" });
  }
};

const updateReport = async (req, res) => {
  const { id } = req.params;
  const { title, description, urgency, status, endDate } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Required fields missing" });
  }

  try {
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

const getReportsByCommunity = async (req, res) => {
  const { communityId } = req.params;
  const { status } = req.body;
  // const { category } = req.body;

  try {
    const reports = await prisma.report.findMany({
      where: {
        idCommunity: parseInt(communityId),
        status: status,
        // categoty: category,
      },
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
    res
      .json(reportsWithUserNames);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Something went wrong!" });
  }
};

const getReportComments = async (req, res) => {
  const { reportId } = req.params;

  try {
    const comments = await prisma.reportcomments.findMany({
      where: {
        reportId: parseInt(reportId),
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    const commentsWithUserNames = comments.map((comment) => ({
      id: comment.id,
      user: comment.user.name,
      comment: comment.comment,
    }));
    res
      .json(commentsWithUserNames);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Something went wrong!" });
  }
};


const updateReportStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const token = req.headers.authorization;
  try {
    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    const tokenPayload = jwt.verify(token, secretKey);

    const user = tokenPayload;
    if (user.role === "User") {
      return res
        .status(403)
        .json({ error: "User not authorized to update report status" });
    }

    const report = await prisma.report.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    if (
      user.role === "Tecnico" &&
      !["New", "InProgress", "InValidation"].includes(status)
    ) {
      return res.status(403).json({
        error:
          "Tecnico can only update status to New, InProgress, or InValidation",
      });
    }

    if (user.role === "Supervisor") {
      await prisma.report.update({
        where: {
          id: parseInt(id),
        },
        data: {
          status,
        },
      });

      return res
        .status(200)
        .json({ message: "Report status updated successfully" });
    }

    await prisma.report.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status,
      },
    });

    return res
      .status(200)
      .json({ message: "Report status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};
const updateReportRelevance = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  try {
    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    const tokenPayload = jwt.verify(token, secretKey);

    const user = tokenPayload;

    const report = await prisma.report.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    const canGivePriority = await prisma.reportrelevance.findUnique({
      where: {
        userId: user.id,
        reportId: report.id,
      },
    });
    if (canGivePriority) { 
      return res
      .status(409)
      .json({ error: "Previously, the user give priority to the same report." });
    }
    
    const newReportPriority = await prisma.reportrelevance.create({
      data: {
        userId: user.id,
        reportId: report.id,
      },
    });

    return res
      .status(200)
      .json(newReportPriority);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};
const postReportComment = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const { comment } = req.body;

  try {
    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    const tokenPayload = jwt.verify(token, secretKey);

    const user = tokenPayload;

    const report = await prisma.report.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }
    
    const newReportPriority = await prisma.reportcomments.create({
      data: {
        userId: user.id,
        reportId: report.id,
        comment: comment,
      },
    });

    return res
      .status(200)
      .json(newReportPriority);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

export {
  getReports,
  getReportById,
  updateReport,
  deleteReport,
  createReport,
  getReportComments,
  updateReportStatus,
  getReportsByCommunity,
  updateReportRelevance,
  postReportComment,
};
