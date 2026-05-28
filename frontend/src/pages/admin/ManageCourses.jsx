import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { FiTrash2, FiSearch, FiFilter } from 'react-icons/fi';
import ConfirmModal from '../../components/admin/ConfirmModal';

const ManageCourses = () => {
  const { courses, addCourse, deleteCourse } = useData();
  const [formData, setFormData] = useState({ title: '', description: '', duration: '', icon: '' });
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDuration, setFilterDuration] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const filteredCourses = useMemo(() => {
    if (!courses) return [];
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterDuration ? course.duration === filterDuration : true;
      return matchesSearch && matchesFilter;
    });
  }, [courses, searchQuery, filterDuration]);

  const uniqueDurations = useMemo(() => {
    if (!courses) return [];
    return [...new Set(courses.map(c => c.duration).filter(Boolean))];
  }, [courses]);

  const handleDeleteClick = (id) => {
    setCourseToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (courseToDelete) {
      deleteCourse(courseToDelete);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.duration || !formData.icon) return;
    addCourse(formData);
    setFormData({ title: '', description: '', duration: '', icon: '' });
  };

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-brand-maroon mb-8">Manage Courses</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-xl font-heading font-bold text-brand-maroon mb-4">Add New Course</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-body text-gray-700 mb-1">Title</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-maroon/50"
                  placeholder="e.g. Blouse Stitching"
                />
              </div>
              <div>
                <label className="block text-sm font-body text-gray-700 mb-1">Duration</label>
                <input 
                  type="text" 
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-maroon/50"
                  placeholder="e.g. 2 Months"
                />
              </div>
              <div>
                <label className="block text-sm font-body text-gray-700 mb-1">Icon (Emoji)</label>
                <input 
                  type="text" 
                  value={formData.icon}
                  onChange={(e) => setFormData({...formData, icon: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-maroon/50"
                  placeholder="e.g. 👗"
                />
              </div>
              <div>
                <label className="block text-sm font-body text-gray-700 mb-1">Description</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-maroon/50"
                  rows="3"
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-brand-maroon text-white py-2 rounded-md hover:bg-brand-maroon-dark transition-colors font-bold">
                Add Course
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h2 className="text-xl font-heading font-bold text-brand-maroon">Existing Courses</h2>
              
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search courses..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-maroon/50 w-full sm:w-48"
                  />
                </div>
                
                {/* Filter */}
                <div className="relative">
                  <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select 
                    value={filterDuration}
                    onChange={(e) => setFilterDuration(e.target.value)}
                    className="pl-9 pr-8 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-maroon/50 appearance-none bg-white w-full sm:w-auto cursor-pointer"
                  >
                    <option value="">All Durations</option>
                    {uniqueDurations.map(duration => (
                      <option key={duration} value={duration}>{duration}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {filteredCourses.map((course) => (
                <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{course.icon}</span>
                      <h3 className="font-bold font-heading text-brand-maroon">{course.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                    <span className="text-xs bg-brand-gold/20 text-brand-gold-dark px-2 py-1 rounded mt-2 inline-block font-semibold">
                      {course.duration}
                    </span>
                  </div>
                  <button onClick={() => handleDeleteClick(course.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors ml-4">
                    <FiTrash2 className="text-xl" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={confirmDelete}
        title="Delete Course"
        message="Are you sure you want to delete this course? This action cannot be undone."
      />
    </div>
  );
};

export default ManageCourses;
