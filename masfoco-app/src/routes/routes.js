import Express from "express";
import {
  getReports,
  getReportById,
  updateReport,
  getReportsByCommunity,
  updateReportStatus,
  deleteReport,
  createReport,
} from "../controllers/reportController.js";
import {
  createUserToCommunity,
  joinCommunityByCode,
  getAllUsers,
  getUserById,
  getUserRoleInCommunity,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getUserByToken,
  getUserCommunities,
} from "../controllers/userController.js";
import {
  getCommunity,
  createCommunity,
  updateCommunity,
  deleteCommunity,
} from "../controllers/communitiesController.js";
import verifyToken from "../middleware/authmddlw.js";

const router = Express.Router();

router.get("/reports", verifyToken, getReports);

router.get("/reports/:id", verifyToken, getReportById);

router.post("/reports", verifyToken, createReport);

router.put("/reports/:id", verifyToken, updateReport);

router.put("/reports/:id/status", verifyToken, updateReportStatus);

router.delete("/reports/:id", verifyToken, deleteReport);

router.get(
  "/communities/:communityId/reports",
  verifyToken,
  getReportsByCommunity
);

router.get("/users", verifyToken, getAllUsers);

router.get("/users/:id", verifyToken, getUserById);

router.post("/signup", createUser);

router.post("/login", loginUser);

router.get("/user", getUserByToken);

router.put("/users/:id", verifyToken, updateUser);

router.delete("/users/:id", verifyToken, deleteUser);

router.get(
  "/users/:userId/role/:communityId",
  verifyToken,
  getUserRoleInCommunity
);

router.get("/communities/:id", verifyToken, getCommunity);

router.post("/communities", verifyToken, createCommunity);

router.put("/communities/:id", verifyToken, updateCommunity);

router.delete("/communities/:id", verifyToken, deleteCommunity);

router.get("/user/:userId/communities", verifyToken, getUserCommunities);

router.post("/joinCommunityByCode", verifyToken, joinCommunityByCode);

router.post("/createUserToCommunity", verifyToken, createUserToCommunity);

export default router;
