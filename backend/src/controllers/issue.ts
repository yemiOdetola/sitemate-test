import { Request, Response } from "express";
import { IssueService } from "../services/issue";

export class IssueController {
  db: IssueService;

  constructor(db: IssueService) {
    this.db = db;
  }

  getAll(req: Request, res: Response): void {
    const issues = this.db.getAll();
    res.json(issues);
  }

  getById(req: Request, res: Response): void {
    const id = req.params.id;
    const issue = this.db.getById(id);
    if (issue) {
      res.json(issue);
    } else {
      res.status(404).json({ message: "Issue not found" });
    }
  }

  create(req: Request, res: Response): void {
    const { title, description, status, assignedBy } = req.body;
    if (!title || !description || !status || !assignedBy) {
      res.status(400).json({
        message: "Title, description, status, and 'assigned by' are required",
      });
      return;
    }
    const newIssue = this.db.create({
      title,
      description,
      status,
      assignedBy,
    });
    res.status(201).json(newIssue);
  }

  update(req: Request, res: Response): void {
    const id = req.params.id;
    const { title, description, status, assignedBy } = req.body;
    const updatedIssue = this.db.update(id, {
      title,
      description,
      status,
      assignedBy,
    });
    if (updatedIssue) {
      res.json(updatedIssue);
    } else {
      res.status(404).json({ message: "Issue not found" });
    }
  }

  delete(req: Request, res: Response): void {
    const id = req.params.id;
    const deleted = this.db.delete(id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Issue not found" });
    }
  }
}
