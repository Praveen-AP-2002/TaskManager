import React from 'react';

const ViewTaskPopup = ({ isOpen, onClose, task }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">View Task</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">&times;</button>
        </div>
        <div className="space-y-4">
          <div>
            <span className="font-semibold">Title:</span>
            <p>{task.heading}</p>
          </div>
          <div>
            <span className="font-semibold">Description:</span>
            <p>{task.description}</p>
          </div>
          <div>
            <span className="font-semibold">Priority:</span>
            <p>{task.priority}</p>
          </div>
          <div>
            <span className="font-semibold">Status:</span>
            <p>{task.status}</p>
          </div>
          <div>
            <span className="font-semibold">Created At:</span>
            <p>{task.createdAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTaskPopup;
