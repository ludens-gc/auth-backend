import AuthService from "../services/authService.js";

const authService = new AuthService();

class AuthController {
  static login = async (req, res) => {
    try {
      const data = req.body;
      const login = await authService.login(data);
      res.status(200).send(login);
    } catch (error) {
      res.status(401).send({ message: error.message });
    }
  };
}

export default AuthController;
