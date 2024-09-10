import React from 'react';

const AddTaskPopup = ({ isOpen, onClose, onCreate, newTask, handleNewTaskChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Task</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">&times;</button>
        </div>
        <form className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-gray-700">Title:</label>
            <input
              id="title"
              name="heading"
              value={newTask.heading}
              onChange={handleNewTaskChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
              placeholder="Task Title"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-700">Description:</label>
            <textarea
              id="description"
              name="description"
              value={newTask.description}
              onChange={handleNewTaskChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
              placeholder="Task Description"
              required
            />
          </div>
          <div>
            <label htmlFor="priority" className="block text-gray-700">Priority:</label>
            <select
              id="priority"
              name="priority"
              value={newTask.priority}
              onChange={handleNewTaskChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div>
            <label htmlFor="status" className="block text-gray-700">Status:</label>
            <select
              id="status"
              name="status"
              value={newTask.status}
              onChange={handleNewTaskChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button
            type="button"
            onClick={onCreate}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskPopup;
