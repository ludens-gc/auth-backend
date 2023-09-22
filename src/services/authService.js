import { PrismaClient } from "@prisma/client";
import pkgBC from "bcryptjs";
import pkgJWT from "jsonwebtoken";

const { sign } = pkgJWT;
const { compare } = pkgBC;
const prisma = new PrismaClient();

class AuthService {
  login = async (dataObject) => {
    const user = await prisma.users.findUnique({
      where: {
        email: dataObject.email
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true
      }
    });
    if (!user) {
      throw new Error("Usuário não cadastrado");
    }
    const isEqual = await compare(dataObject.password, user.password);
    if (!isEqual) {
      throw new Error("Senha incorreta");
    }
    const jwtSecret = process.env.JWT_SECRET;
    const accessToken = sign({
      id: user.id,
      email: user.email
    }, jwtSecret, {
      expiresIn: 86400
    });
    return { accessToken };
  };
}

export default AuthService;
