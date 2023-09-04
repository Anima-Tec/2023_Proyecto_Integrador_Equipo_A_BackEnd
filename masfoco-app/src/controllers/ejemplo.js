import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getTutores = async (req, res) => {
  if (await prisma.Tutor.findMany()) {
    const tutor = await prisma.Tutor.findMany();
    res.json(tutor);
  } else {
    console.error("404 Not Found");
  }
};

const getTutor = async (req, res) => {
  const tutorId = parseInt(req.body.id_tutor);
  try {
    const response = await prisma.Tutor.findUnique({
      where: {
        id_tutor: tutorId,
      },
      select: {
        id_tutor: true,
        ci: true,
        nombre: true,
        apellido: true,
        fecha_nacimiento: true,
        email: true,
      },
    });
    res.send(response);
  } catch (error) {}
};

const postTutores = async (req, res) => {
  const { nombre, contrasenia, ci, apellido, fecha_nacimiento, email } =
    req.body;
  try {
    await prisma.Tutor.create({
      data: {
        nombre: nombre,
        contrasenia: contrasenia,
        ci: ci,
        apellido: apellido,
        fecha_nacimiento: fecha_nacimiento,
        email: email,
      },
    });
    res.status(200).send("¡¡Tutor creado exitosamente!!");
  } catch (error) {
    console.log(error);
  }
};

const deleteTutor = async (req, res) => {
  const id = req.body.id;
  try {
    await prisma.Tutor.delete({
      where: {
        id_tutor: id,
      },
    });
    res.status(200).send("Tutor eliminado correctamente");
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar Tutor" });
    res.status(404).json({ error: "No se ha encontrado el Tutor" });
    console.log(req.body.id);
  }
};

export { getTutor, getTutores, postTutores, deleteTutor };