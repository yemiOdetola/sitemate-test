'use client';

import { useEffect, useState } from "react";
import IssueList from "@/components/issues-list";
import IssueForm from "@/components/issue-form";
import { Issue } from "@/types";
import { deleteIssue, editIssue, getIssues } from "@/api/issues";

export default function Home() {
  const [formVisible, setFormVisible] = useState(false);
  const [issues, setIssues] = useState<Issue[] | null>(null);
  const [currentIssue, setCurrentIssue] = useState<Issue | null>(null);

  useEffect(() => {
    getAll();
  }, []);

  const handleFormSubmit = async () => {
    await getAll();
    setFormVisible(false);
  };

  const getAll = async () => {
    const all = await getIssues();
    setIssues(all);
  }

  const handleEdit = async (issue: Issue) => {
    await editIssue(issue.id, issue);
  };

  const handleDelete = async (id: string) => {
    await deleteIssue(id);
    await getAll();
  };

  const openFormEdit = (issue: Issue) => {
    setFormVisible(true);
    setCurrentIssue(issue);
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Issue Tracker</h1>
        <button
          onClick={() => setFormVisible(true)}
          className="mb-4 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
        >
          Create New Issue
        </button>
        {formVisible && <IssueForm currentIssue={currentIssue} handleEdit={handleEdit} onFormSubmit={handleFormSubmit} />}
        <IssueList issues={issues} openFormEdit={openFormEdit} handleDelete={handleDelete} />
      </div>
    </div>
  );
}


