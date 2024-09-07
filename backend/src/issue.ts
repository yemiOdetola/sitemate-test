export interface Issue {
  id: string;
  title: string;
  description: string;
  status: "open" | "closed" | "in progress";
  createdAt: Date;
  updatedAt: Date;
  assignedBy?: string;
}

export const issues: Issue[] = [
  {
    id: "1",
    title: "Bug in login redirect",
    description: "Users cannot log in",
    status: "open",
    assignedBy: "John",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "UI issue on dashboard",
    description: "The layout is broken",
    status: "in progress",
    assignedBy: "Jane",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
