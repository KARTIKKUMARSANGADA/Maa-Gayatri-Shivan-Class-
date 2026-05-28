import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { FiTrash2, FiUser, FiPhone, FiBook, FiSearch, FiFilter } from 'react-icons/fi';
import ConfirmModal from '../../components/admin/ConfirmModal';

const ManageInquiries = () => {
  const { inquiries, deleteInquiry } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inquiryToDelete, setInquiryToDelete] = useState(null);

  const filteredInquiries = useMemo(() => {
    if (!inquiries) return [];
    return inquiries.filter(inq => {
      const matchesSearch = inq.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            inq.phone.includes(searchQuery);
      const matchesFilter = filterCourse ? inq.course === filterCourse : true;
      return matchesSearch && matchesFilter;
    });
  }, [inquiries, searchQuery, filterCourse]);

  const uniqueCourses = useMemo(() => {
    if (!inquiries) return [];
    return [...new Set(inquiries.map(i => i.course).filter(Boolean))];
  }, [inquiries]);

  const handleDeleteClick = (id) => {
    setInquiryToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (inquiryToDelete) {
      deleteInquiry(inquiryToDelete);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-brand-maroon mb-8">Contact Inquiries</h1>

      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h2 className="text-xl font-heading font-bold text-brand-maroon">Recent Submissions</h2>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search name or phone..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-maroon/50 w-full sm:w-64"
              />
            </div>
            
            {/* Filter */}
            <div className="relative">
              <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select 
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
                className="pl-9 pr-8 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-maroon/50 appearance-none bg-white w-full sm:w-auto cursor-pointer"
              >
                <option value="">All Courses</option>
                {uniqueCourses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {(!filteredInquiries || filteredInquiries.length === 0) ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500 font-body">No inquiries found yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredInquiries.map((inquiry) => (
              <div key={inquiry.id} className="relative p-6 border rounded-xl bg-gray-50 flex flex-col">
                <button 
                  onClick={() => handleDeleteClick(inquiry.id)} 
                  className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  title="Delete Inquiry"
                >
                  <FiTrash2 className="text-xl" />
                </button>
                
                <div className="space-y-3 pr-8">
                  <div className="flex items-center gap-3 text-brand-maroon">
                    <FiUser className="text-brand-gold" />
                    <span className="font-heading font-bold">{inquiry.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-600">
                    <FiPhone className="text-brand-gold" />
                    <a href={`tel:${inquiry.phone}`} className="hover:text-brand-maroon">{inquiry.phone}</a>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <FiBook className="text-brand-gold" />
                    <span className="font-medium bg-brand-gold/10 px-2 py-1 rounded text-sm text-brand-gold-dark">{inquiry.course || "General Inquiry"}</span>
                  </div>

                  {inquiry.message && (
                    <div className="mt-4 p-3 bg-white border rounded-lg text-sm text-gray-700 italic">
                      "{inquiry.message}"
                    </div>
                  )}

                  <div className="text-xs text-gray-400 mt-2">
                    Submitted on: {inquiry.created_at}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={confirmDelete}
        title="Delete Inquiry"
        message="Are you sure you want to delete this contact inquiry? This action cannot be undone."
      />
    </div>
  );
};

export default ManageInquiries;
