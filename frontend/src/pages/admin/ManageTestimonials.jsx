import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { FiTrash2, FiSearch, FiFilter } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import ConfirmModal from '../../components/admin/ConfirmModal';

const ManageTestimonials = () => {
  const { testimonials, addTestimonial, deleteTestimonial } = useData();
  const [formData, setFormData] = useState({ name: '', role: '', text: '' });

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState(null);

  const filteredTestimonials = useMemo(() => {
    if (!testimonials) return [];
    return testimonials.filter(testi => {
      const matchesSearch = testi.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            testi.text.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterRole ? testi.role === filterRole : true;
      return matchesSearch && matchesFilter;
    });
  }, [testimonials, searchQuery, filterRole]);

  const uniqueRoles = useMemo(() => {
    if (!testimonials) return [];
    return [...new Set(testimonials.map(t => t.role).filter(Boolean))];
  }, [testimonials]);

  const handleDeleteClick = (id) => {
    setTestimonialToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (testimonialToDelete) {
      deleteTestimonial(testimonialToDelete);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.role || !formData.text) return;
    addTestimonial(formData);
    setFormData({ name: '', role: '', text: '' });
  };

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-brand-maroon mb-8">Manage Testimonials</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-xl font-heading font-bold text-brand-maroon mb-4">Add Testimonial</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-body text-gray-700 mb-1">Student Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-maroon/50"
                  placeholder="e.g. Pooja Patel"
                />
              </div>
              <div>
                <label className="block text-sm font-body text-gray-700 mb-1">Role / Status</label>
                <input 
                  type="text" 
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-maroon/50"
                  placeholder="e.g. Former Student"
                />
              </div>
              <div>
                <label className="block text-sm font-body text-gray-700 mb-1">Review Text</label>
                <textarea 
                  value={formData.text}
                  onChange={(e) => setFormData({...formData, text: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-maroon/50"
                  rows="4"
                  placeholder="Write the review here..."
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-brand-maroon text-white py-2 rounded-md hover:bg-brand-maroon-dark transition-colors font-bold">
                Add Testimonial
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h2 className="text-xl font-heading font-bold text-brand-maroon">Existing Testimonials</h2>
              
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search names or text..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-maroon/50 w-full sm:w-48"
                  />
                </div>
                
                {/* Filter */}
                <div className="relative">
                  <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select 
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="pl-9 pr-8 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-maroon/50 appearance-none bg-white w-full sm:w-auto cursor-pointer"
                  >
                    <option value="">All Roles</option>
                    {uniqueRoles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {filteredTestimonials.map((testimonial) => (
                <div key={testimonial.id} className="relative p-6 border rounded-xl bg-gray-50 flex flex-col">
                  <button 
                    onClick={() => handleDeleteClick(testimonial.id)} 
                    className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <FiTrash2 className="text-xl" />
                  </button>
                  
                  <FaQuoteLeft className="text-brand-gold/30 text-2xl mb-2" />
                  <p className="text-gray-600 font-body italic mb-4 pr-8">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-maroon/10 rounded-full flex items-center justify-center text-brand-maroon font-heading font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-brand-maroon text-sm">{testimonial.name}</h4>
                      <p className="text-xs font-body text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
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
        title="Delete Testimonial"
        message="Are you sure you want to delete this testimonial? This action cannot be undone."
      />
    </div>
  );
};

export default ManageTestimonials;
