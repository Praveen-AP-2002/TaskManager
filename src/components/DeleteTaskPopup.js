import React from 'react';

const DeleteTaskPopup = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Delete Task</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">&times;</button>
        </div>
        <p className="mb-4">Are you sure you want to delete this task?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskPopup;
