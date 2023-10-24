import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const generateUniqueCode = async () => {
  let uniqueCode;
  do {
    uniqueCode = Math.random().toString(36).substring(2, 7).toUpperCase();
    const existingCommunity = await prisma.community.findUnique({
      where: { code: uniqueCode },
    });
  } while (existingCommunity);

  return uniqueCode;
};

const getCommunity = async (req, res) => {
  try {
    const communityId = parseInt(req.params.id);
    const community = await prisma.community.findUnique({
      where: { id: communityId },
    });

    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    res.json(community);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error retrieving community", details: error.message });
  }
};

const createCommunity = async (req, res) => {
  try {
    const { name, domain, image } = req.body;

    if (!name || !domain) {
      return res
        .status(400)
        .json({ error: "Name and domain are required fields" });
    }

    const code = await generateUniqueCode();

    const community = await prisma.community.create({
      data: {
        name,
        image,
        domain,
        code,
      },
    });

    res.json(community);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating community", details: error.message });
  }
};

const updateCommunity = async (req, res) => {
  try {
    const communityId = parseInt(req.params.id);
    const { name, domain, image } = req.body;

    if (!name || !domain || !image) {
      return res
        .status(400)
        .json({ error: "Name and domain are required fields" });
    }

    const community = await prisma.community.update({
      where: { id: communityId },
      data: {
        name,
        domain,
        image,
      },
    });

    res.json(community);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating community", details: error.message });
  }
};

const deleteCommunity = async (req, res) => {
  try {
    const communityId = parseInt(req.params.id);

    await prisma.community.delete({
      where: { id: communityId },
    });

    res.json({ message: "Community deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting community", details: error.message });
  }
};

export { getCommunity, createCommunity, updateCommunity, deleteCommunity };
