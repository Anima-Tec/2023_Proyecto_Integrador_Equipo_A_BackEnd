import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import enviromentController from "../config/enviromentController.js";

const prisma = new PrismaClient();
const secretKey = enviromentController.validateSecretKey();

const getUserByToken = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json({ error: "Token not provided" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(401).json({ error: "Invalid token", details: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Something went wrong!", details: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Something went wrong!", details: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email, and password are required fields" });
    }

    const emailParts = email.split("@");
    if (emailParts.length !== 2) {
      return res.status(400).json({ error: "Email address is invalid" });
    }

    const domain = emailParts[1];

    const community =
      (await prisma.community.findUnique({
        where: { domain },
      })) || null;

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      name,
      email,
      password: hashedPassword,
      userToCommunity: {
        create: [
          {
            Community: {
              connect: {
                id: 1,
              },
            },
            role: "User",
          },
        ],
      },
    };

    if (community) {
      userData.userToCommunity.create.push({
        Community: {
          connect: {
            id: community.id,
          },
        },
      });
    }

    const user = await prisma.user.create({
      data: userData,
    });

    res.json({ message: "User registered" });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ error: "Error registering user", details: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required fields" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(401).json({ error: "Incorrect credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect credentials" });
    }

    const token = jwt.sign({ userId: user.id }, secretKey, {
      expiresIn: "30m",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Failed to login", details: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, idOficina } = req.body;
  try {
    if (!name || !email) {
      return res
        .status(400)
        .json({ error: "Name and email are required fields" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
        idOficina: parseInt(idOficina),
      },
    });
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Something went wrong!", details: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await prisma.user.delete({
      where: { email },
    });
    res.json({ message: "User deleted successfully", deletedUser: user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error deleting user", details: error.message });
  }
};

const getUserCommunities = async (req, res) => {
  try {
    const userId = req.params.userId;

    const userCommunities = await prisma.userToCommunity.findMany({
      where: { userId: parseInt(userId) },
      include: { Community: true },
    });

    res.json(userCommunities.map((uc) => uc.Community));
  } catch (error) {
    res.status(500).json({
      error: "Error retrieving user communities",
      details: error.message,
    });
  }
};

const joinCommunityByCode = async (req, res) => {
  try {
    const { user_id, code } = req.body;

    if (!user_id || !code) {
      return res
        .status(400)
        .json({ error: "user_id and code are required fields" });
    }

    const community = await prisma.community.findUnique({
      where: { code },
    });

    if (!community) {
      return res
        .status(404)
        .json({ error: "Community not found with the provided code" });
    }

    await prisma.user.update({
      where: { id: user_id },
      data: {
        Community: {
          connect: { id: community.id },
        },
      },
    });

    res.json({ message: "User joined the community" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error joining the community", details: error.message });
  }
};

const createUserToCommunity = async (req, res) => {
  try {
    const { userId, communityId } = req.body;

    if (!userId || !communityId) {
      return res
        .status(400)
        .json({ error: "userId and communityId are required fields" });
    }

    const userToCommunity = await prisma.userToCommunity.create({
      data: {
        userId,
        communityId,
        role: "User",
      },
    });

    res.json(userToCommunity);
  } catch (error) {
    res.status(500).json({
      error: "Error creating user-to-community relationship",
      details: error.message,
    });
  }
};
const getUserRoleInCommunity = async (req, res) => {
  const { userId } = req.params;
  const { communityId } = req.params;

  try {
    const userToCommunity = await prisma.userToCommunity.findFirst({
      where: {
        userId: parseInt(userId),
        communityId: parseInt(communityId),
      },
    });

    if (!userToCommunity) {
      return res
        .status(404)
        .json({ error: "User is not associated with the provided community" });
    }

    const role = userToCommunity.role;

    res.json({ userId, communityId, role });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Something went wrong!", details: error.message });
  }
};

export {
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
};
