import express from "express";
import cors from "cors";
import { IssueService } from "./services/issue";
import { IssueController } from "./controllers/issue";

const app = express();
app.use(express.json());
const port = 3000;

app.use(cors({ origin: "http://localhost:3001" }));

const db = new IssueService();
const issueController = new IssueController(db);

app.get("/issues", issueController.getAll.bind(issueController));
app.get("/issues/:id", issueController.getById.bind(issueController));
app.post("/issues", issueController.create.bind(issueController));
app.put("/issues/:id", issueController.update.bind(issueController));
app.delete("/issues/:id", issueController.delete.bind(issueController));

app.get("/", (req, res) => {
  res.send("OOOOOdetola");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
