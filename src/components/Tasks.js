import React, { useState } from 'react';
import Navbar from './Navbar';
import TaskCard from './Taskcard';
import AddTaskPopup from './AddTaskPopup';
import EditTaskPopup from './EditTaskPopup';
import ViewTaskPopup from './ViewTaskPopup';
import DeleteTaskPopup from './DeleteTaskPopup';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Tasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, heading: 'Task 1', description: 'Task 1 Description', priority: 'High', createdAt: new Date().toISOString(), status: 'todo' },
    { id: 2, heading: 'Task 2', description: 'Task 2 Description', priority: 'Medium', createdAt: new Date().toISOString(), status: 'in-progress' },
    { id: 3, heading: 'Task 3', description: 'Task 3 Description', priority: 'Low', createdAt: new Date().toISOString(), status: 'completed' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('createdAt-low-to-high');
  const [showAddTaskPopup, setShowAddTaskPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newTask, setNewTask] = useState({
    heading: '',
    description: '',
    priority: 'High',
    status: 'todo'
  });

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleSortChange = (e) => setSortOption(e.target.value);

  const handleAddTask = () => setShowAddTaskPopup(true);
  const handleEditTask = (task) => {
    setSelectedTask(task);
    setShowEditPopup(true);
  };
  const handleViewTask = (task) => {
    setSelectedTask(task);
    setShowViewPopup(true);
  };
  const handleDeleteTask = (task) => {
    setSelectedTask(task);
    setShowDeletePopup(true);
  };

  const handleNewTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prevTask => ({
      ...prevTask,
      [name]: value
    }));
  };

  const handleCreateTask = () => {
    setTasks(prevTasks => [
      ...prevTasks,
      { ...newTask, id: prevTasks.length + 1, createdAt: new Date().toISOString() }
    ]);
    setNewTask({
      heading: '',
      description: '',
      priority: 'High',
      status: 'todo'
    });
    setShowAddTaskPopup(false);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(prevTasks => prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    setSelectedTask(null);
    setShowEditPopup(false);
  };

  const filteredTasks = tasks.filter(task =>
    task.heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortTasks = (taskArray) => {
    return taskArray.sort((a, b) => {
      switch (sortOption) {
        case 'createdAt-low-to-high':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'createdAt-high-to-low':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'priority-low-to-high':
          const priorityOrderLowToHigh = { 'Low': 1, 'Medium': 2, 'High': 3 };
          return priorityOrderLowToHigh[a.priority] - priorityOrderLowToHigh[b.priority];
        case 'priority-high-to-low':
          const priorityOrderHighToLow = { 'High': 1, 'Medium': 2, 'Low': 3 };
          return priorityOrderHighToLow[a.priority] - priorityOrderHighToLow[b.priority];
        default:
          return 0;
      }
    });
  };

  const sortedTasksByStatus = {
    'todo': sortTasks(filteredTasks.filter(task => task.status === 'todo')),
    'in-progress': sortTasks(filteredTasks.filter(task => task.status === 'in-progress')),
    'completed': sortTasks(filteredTasks.filter(task => task.status === 'completed'))
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // If the task is dropped in the same container but in a different position
    if (source.droppableId === destination.droppableId && source.index !== destination.index) {
      const tasksCopy = { ...sortedTasksByStatus };
      const [reorderedTask] = tasksCopy[source.droppableId].splice(source.index, 1);
      tasksCopy[source.droppableId].splice(destination.index, 0, reorderedTask);
      setTasks(tasksCopy['todo'].concat(tasksCopy['in-progress'], tasksCopy['completed']));
    } 
    // If the task is dropped in a different container
    else if (source.droppableId !== destination.droppableId) {
      const tasksCopy = { ...sortedTasksByStatus };
      const [movedTask] = tasksCopy[source.droppableId].splice(source.index, 1);
      movedTask.status = destination.droppableId;
      tasksCopy[destination.droppableId].splice(destination.index, 0, movedTask);
      setTasks(tasksCopy['todo'].concat(tasksCopy['in-progress'], tasksCopy['completed']));
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="flex flex-col min-h-screen">
        <div className="bg-white p-4">
          <div className="container mx-auto flex flex-col space-y-4">
            <div className="flex items-center justify-between mb-4">
              <button
                className="bg-blue-500 text-white px-6 py-3 rounded-lg w-full sm:w-auto flex items-center space-x-2 add-task-button"
                onClick={handleAddTask}
              >
                <FaPlus className="text-white text-lg" />
                <span className="text-lg">Add Task</span>
              </button>
            </div>
            <div className="bg-white p-3 shadow-md rounded-lg border border-gray-300">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4 w-full md:w-auto">
                  <label htmlFor="search" className="text-gray-700 font-semibold">Search:</label>
                  <div className="flex items-center border-2 border-gray-300 rounded-lg p-2 flex-grow">
                    <FaSearch className="text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search tasks..."
                      id="search"
                      className="border-none outline-none p-2 flex-grow"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4 w-full md:w-auto">
                  <label htmlFor="sortBy" className="text-gray-700 font-semibold">Sort By:</label>
                  <select
                    id="sortBy"
                    className="border-2 border-gray-300 rounded-lg p-2 w-full md:w-auto search-select"
                    value={sortOption}
                    onChange={handleSortChange}
                  >
                    <option value="createdAt-low-to-high">Date: Low to High</option>
                    <option value="createdAt-high-to-low">Date: High to Low</option>
                    <option value="priority-low-to-high">Priority: Low to High</option>
                    <option value="priority-high-to-low">Priority: High to Low</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex flex-col lg:flex-row p-4 space-y-4 lg:space-y-0 lg:space-x-4">
            {['todo', 'in-progress', 'completed'].map(status => (
              <Droppable key={status} droppableId={status}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex flex-col w-full lg:w-1/3 border border-gray-300 rounded-lg bg-white task-container overflow-hidden lg:max-h-screen lg:overflow-auto lg:flex-1 h-64 lg:h-auto"
                  >
                    <div className={`bg-${status === 'todo' ? 'blue' : status === 'in-progress' ? 'yellow' : 'green'}-100 p-2 sticky top-0 z-10`}>
                      <h2 className="text-lg font-semibold">{status === 'todo' ? 'To Do' : status === 'in-progress' ? 'In Progress' : 'Completed'}</h2>
                    </div>
                    <div className="flex flex-col flex-1 overflow-y-auto">
                      <div className="p-4 space-y-4">
                        {sortedTasksByStatus[status].map((task, index) => (
                          <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <TaskCard
                                  task={task}
                                  onDelete={() => handleDeleteTask(task)}
                                  onEdit={() => handleEditTask(task)}
                                  onView={() => handleViewTask(task)}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>

      {/* Add Task Popup */}
      <AddTaskPopup
        isOpen={showAddTaskPopup}
        onClose={() => setShowAddTaskPopup(false)}
        onCreate={handleCreateTask}
        newTask={newTask}
        handleNewTaskChange={handleNewTaskChange}
      />

      {/* Edit Task Popup */}
      {selectedTask && (
        <EditTaskPopup
          isOpen={showEditPopup}
          onClose={() => setShowEditPopup(false)}
          task={selectedTask}
          onUpdate={handleUpdateTask}
          handleTaskChange={(e) => setSelectedTask(prev => ({ ...prev, [e.target.name]: e.target.value }))}
        />
      )}

      {/* View Task Popup */}
      {selectedTask && (
        <ViewTaskPopup
          isOpen={showViewPopup}
          onClose={() => setShowViewPopup(false)}
          task={selectedTask}
        />
      )}

      {/* Delete Task Popup */}
      {selectedTask && (
        <DeleteTaskPopup
          isOpen={showDeletePopup}
          onClose={() => setShowDeletePopup(false)}
          onConfirm={() => {
            setTasks(prevTasks => prevTasks.filter(task => task.id !== selectedTask.id));
            setSelectedTask(null);
            setShowDeletePopup(false);
          }}
        />
      )}
    </>
  );
};

export default Tasks;
