import { createIssue, editIssue } from '@/api/issues';
import { Issue, IssueStatus } from '@/types';
import React, { useState } from 'react';

interface IssueFormProps {
  currentIssue?: Issue | null;
  onFormSubmit: () => void;
  handleEdit: (issue: Issue) => void;
}

const IssueForm: React.FC<IssueFormProps> = ({ currentIssue, onFormSubmit }) => {
  const [title, setTitle] = useState(currentIssue?.title || '');
  const [description, setDescription] = useState(currentIssue?.description || '');
  const [status, setStatus] = useState(currentIssue?.status || IssueStatus.OPEN);
  const [assignedBy, setAssignedBy] = useState(currentIssue?.assignedBy || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newIssue = { title, description, status, assignedBy };
    if (currentIssue) {
      await editIssue(currentIssue.id, newIssue);
    } else {
      await createIssue(newIssue);
    }
    onFormSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">{currentIssue ? 'Edit Issue' : 'Create New Issue'}</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="open">Open</option>
          <option value="in progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Assignee:</label>
        <input
          type="text"
          value={assignedBy}
          onChange={(e) => setAssignedBy(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
      >
        {currentIssue ? 'Update Issue' : 'Create Issue'}
      </button>
    </form>
  );
};

export default IssueForm;
