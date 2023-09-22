import pkgJWT from "jsonwebtoken";

const { verify, decode } = pkgJWT;

export default async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send("Token de acesso não informado.");
  }
  const [, accessToken] = token.split(" ");
  try {
    verify(accessToken, process.env.JWT_SECRET);
    const { id, email } = await decode(accessToken);
    req.userID = id;
    req.userEmail = email;
    next();
  } catch (error) {
    res.status(401).send("Usuário não autorizado.");
  }
};
