import { Issue, issues } from "../issue";

export class IssueService {
  issues: Issue[] = issues;

  getAll(): Issue[] {
    console.log("this.issues: ", this.issues);
    return this.issues;
  }

  getById(id: string): Issue | undefined {
    return this.issues.find((issue) => issue.id == id);
  }

  create(issue: Omit<Issue, "id" | "createdAt" | "updatedAt">): Issue {
    const newIssue: Issue = {
      ...issue,
      id: issues.length.toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.issues.push(newIssue);
    return newIssue;
  }

  update(id: string, issue: Partial<Issue>): Issue | undefined {
    const idx = this.issues.findIndex((issue) => issue.id == id);
    if (idx != -1) {
      this.issues[idx] = {
        ...this.issues[idx],
        ...issue,
        updatedAt: new Date(),
      };
      return this.issues[idx];
    }
    return undefined;
  }

  delete(id: string): boolean {
    const length = this.issues.length;
    this.issues = this.issues.filter((issue) => issue.id !== id);
    return this.issues.length !== length;
  }
}
