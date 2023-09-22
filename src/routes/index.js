import express from "express";
import users from "./usersRoutes.js";
import auth from "./authRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ title: "PhysiCare API" });
  });

  app.use(express.json(), auth, users);
};

export default routes;
