import React from 'react';
import { Link, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { FiGrid, FiImage, FiMessageSquare, FiHome, FiInbox, FiLogOut } from 'react-icons/fi';
import { useData } from '../../context/DataContext';
import ManageCourses from './ManageCourses';
import ManageGallery from './ManageGallery';
import ManageTestimonials from './ManageTestimonials';
import ManageInquiries from './ManageInquiries';
import logo from '../../assets/LOGO.png';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useData();

  const navItems = [
    { name: 'Dashboard', path: '/gayatriclass-portal', icon: <FiGrid /> },
    { name: 'Courses', path: '/gayatriclass-portal/courses', icon: <FiGrid /> },
    { name: 'Gallery', path: '/gayatriclass-portal/gallery', icon: <FiImage /> },
    { name: 'Testimonials', path: '/gayatriclass-portal/testimonials', icon: <FiMessageSquare /> },
    { name: 'Inquiries', path: '/gayatriclass-portal/inquiries', icon: <FiInbox /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-body">
      {/* Sidebar */}
      <div className="w-64 bg-brand-maroon text-white flex flex-col shadow-xl z-20">
        <div className="p-6 text-center">
          <img src={logo} alt="Maa Gayatri Shivan Class Logo" className="h-16 mx-auto mb-3" />
          <h2 className="text-xl font-heading font-bold">Admin Panel</h2>
        </div>
        
        <nav className="flex-1 mt-6">
          <ul className="space-y-2 px-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === item.path 
                      ? 'bg-white/20 text-brand-gold font-bold' 
                      : 'hover:bg-white/10 text-gray-200'
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-white/20 space-y-2">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-gray-200">
            <FiHome />
            Back to Website
          </Link>
          <button 
            onClick={() => { logout(); navigate('/gayatriclass-portal/login'); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/20 text-red-200 transition-colors"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto bg-gray-50 p-8">
        <div className="max-w-5xl mx-auto">
          <Routes>
            <Route path="/" element={<div className="text-2xl font-heading text-brand-maroon">Welcome to the Admin Dashboard. Select a module from the sidebar.</div>} />
            <Route path="/courses" element={<ManageCourses />} />
            <Route path="/gallery" element={<ManageGallery />} />
            <Route path="/testimonials" element={<ManageTestimonials />} />
            <Route path="/inquiries" element={<ManageInquiries />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
