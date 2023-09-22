import UserService from "../services/userService.js";

const userService = new UserService();

class UserController {
  static registerUser = async (req, res) => {
    const data = req.body;
    try {
      const user = await userService.registerUser(data);
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };

  static getAllUsers = async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  static getUserByID = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await userService.getUserByID(id);
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  static updateUserByID = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
      const user = await userService.updateUserByID(id, data);
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  static deleteUserByID = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await userService.deleteUserByID(id);
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  static deleteAllUsers = async (req, res) => {
    try {
      const result = await userService.deleteAllUsers();
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
}

export default UserController;
