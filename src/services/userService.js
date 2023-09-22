import { PrismaClient } from "@prisma/client";
import pkg from "bcryptjs";
import { v4 } from "uuid";

const { hash } = pkg;
const prisma = new PrismaClient();

class UserService {
  registerUser = async (dataObject) => {
    const user = await prisma.users.findUnique({
      where: {
        email: dataObject.email
      }
    });
    if (user) {
      throw new Error("Usuário já cadastrado.");
    }
    try {
      const passwordHash = await hash(dataObject.password, 8);
      const newUser = await prisma.users.create({
        data: {
          id: v4(),
          name: dataObject.name,
          email: dataObject.email,
          password: passwordHash
        }
      });
      return newUser;
    } catch (error) {
      throw new Error("Erro ao cadastrar usuário");
    }
  };

  getAllUsers = async () => {
    try {
      const users = await prisma.users.findMany();
      return users;
    } catch (error) {
      throw new Error("Usuários não encontrados.");
    }
  };

  getUserByID = async (id) => {
    try {
      const user = await prisma.users.findUnique({
        where: {
          id: id,
        },
      });
      return user;
    } catch (error) {
      throw new Error("Usuário não encontrado.");
    }
  };

  updateUserByID = async (id, dataObject) => {
    try {
      const user = await prisma.users.update({
        where: {
          id: id,
        },
        data: dataObject
      });
      return user;
    } catch (error) {
      throw new Error("Erro ao atualizar usuário.");
    }
  };

  deleteUserByID = async (id) => {
    try {
      const user = await prisma.users.delete({
        where: {
          id: id,
        },
      });
      return user;
    } catch (error) {
      throw new Error("Erro ao deletar usuário.");
    }
  };

  deleteAllUsers = async () => {
    try {
      const result = await prisma.users.deleteMany({});
      return result;
    } catch (error) {
      throw new Error("Erro ao deletar usuários.");
    }
  };
}

export default UserService;
