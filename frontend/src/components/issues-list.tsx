import React from 'react';
import { Issue } from '@/types';


interface IssuesListProps {
  issues: Issue[] | null;
  openFormEdit: (issue: Issue) => void;
  handleDelete: (issueId: string) => void;
}

const IssueList = ({ openFormEdit, handleDelete, issues }: IssuesListProps) => {

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">Issues List</h2>
      {issues && issues.length > 0 ? (
        <ul className="space-y-4">
          {issues.map((issue) => (
            <li
              key={issue.id}
              className="border rounded-lg p-4 shadow-sm bg-white hover:bg-gray-50 transition"
            >
              <h3 className="text-xl font-bold text-gray-900">{issue.title}</h3>
              <p className="text-gray-700">{issue.description}</p>
              <p className="text-sm text-gray-500">Status: {issue.status}</p>
              <button
                className="mt-3 px-4 py-1 mr-4 bg-red-500 text-white rounded hover:bg-red-600 transition"
                onClick={() => handleDelete(issue.id)}
              >
                Delete
              </button>

              <button
                className="mt-3 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                onClick={() => openFormEdit(issue)}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No issues available.</p>
      )}
    </div>
  );
};

export default IssueList;
