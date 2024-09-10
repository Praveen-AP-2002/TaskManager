import React from 'react';
import { FaTrashAlt, FaEdit, FaEye } from 'react-icons/fa';

const TaskCard = ({ task, onDelete, onEdit, onView }) => {
  return (
    <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-4 transition duration-300 ease-in-out hover:bg-white">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg">{task.heading}</span>
          <span className={`text-sm font-semibold ${task.priority === 'High' ? 'text-red-500' : task.priority === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}>
            {task.priority}
          </span>
        </div>
        <p className="text-gray-700">{task.description}</p>
        <p className="text-gray-500 text-sm">Created at: {task.createdAt}</p>
        <p className="text-gray-500 text-sm">Status: {task.status}</p>
        <p className="text-gray-500 text-sm">Task No: {task.id}</p>

        {/* Align buttons to the right */}
        <div className="flex justify-end space-x-2 mt-4">
          <button className="flex items-center px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition" onClick={onDelete}>
            <FaTrashAlt className="mr-1" /> Delete
          </button>
          <button className="flex items-center px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition" onClick={onEdit}>
            <FaEdit className="mr-1" /> Edit
          </button>
          <button className="flex items-center px-3 py-1 rounded bg-gray-500 text-white hover:bg-gray-600 transition" onClick={onView}>
            <FaEye className="mr-1" /> View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
