import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerAutogen from "swagger-autogen";
import swaggerFile from "./swagger-output.json" assert { type: "json" };
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());
const __dirname = dirname(fileURLToPath(import.meta.url));

const doc = {
  info: {
    version: "1.0.0",
    title: "Swagger Autogen Docs",
    description:
      "Documentation automatically generated by the <b>swagger-autogen</b> module.",
  },
};
const outputFilePath = "./swagger-output.json";

swaggerAutogen()(outputFilePath, [path.join(__dirname, "./", "index.js")], doc);

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.get("/", (req, res) => {
  res
    .status(200)
    .send({ type: "success", message: "Welcome to Swagger Autogen Docs" });
});

app.post("/add", (req, res) => {
  const { id, name } = req.body;

  res.status(200).send({ type: "success", id, name });
});

app.patch("/update/:id/?qry", (req, res) => {
  const { name } = req.body;

  /**
   * #swagger.parameters['id'] = { description: 'ID number description...', required: 'true' }
   * #swagger.parameters['qry'] = { description: 'Some description...' }
   */

  res.status(200).send({
    type: "success",
    params: req.params.id,
    qry: req.query.qry,
    name,
  });
});

app.listen(3000, () => {
  console.log("Server Started!");
});