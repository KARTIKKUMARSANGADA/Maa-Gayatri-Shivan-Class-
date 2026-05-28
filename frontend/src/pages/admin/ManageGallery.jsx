import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { FiTrash2, FiSearch, FiFilter } from 'react-icons/fi';
import ConfirmModal from '../../components/admin/ConfirmModal';

const ManageGallery = () => {
  const { gallery, addGalleryItem, deleteGalleryItem } = useData();
  const [formData, setFormData] = useState({ title: '', icon: '🖼️', span: 'col-span-1 row-span-1', image_url: '' });
  const [isUploading, setIsUploading] = useState(false);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpan, setFilterSpan] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const filteredGallery = useMemo(() => {
    if (!gallery) return [];
    return gallery.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterSpan ? item.span === filterSpan : true;
      return matchesSearch && matchesFilter;
    });
  }, [gallery, searchQuery, filterSpan]);

  const uniqueSpans = useMemo(() => {
    if (!gallery) return [];
    return [...new Set(gallery.map(i => i.span).filter(Boolean))];
  }, [gallery]);

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      deleteGalleryItem(itemToDelete);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('upload_preset', 'gayatri-project');

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dvloie3bn/image/upload', {
        method: 'POST',
        body: uploadData
      });
      const data = await res.json();
      if (data.secure_url) {
        setFormData(prev => ({ ...prev, image_url: data.secure_url }));
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.icon) return;
    addGalleryItem(formData);
    setFormData({ title: '', icon: '🖼️', span: 'col-span-1 row-span-1', image_url: '' });
  };

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-brand-maroon mb-8">Manage Gallery</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-xl font-heading font-bold text-brand-maroon mb-4">Add Gallery Item</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-body text-gray-700 mb-1">Title</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-maroon/50"
                  placeholder="e.g. Student Work"
                />
              </div>
              <div>
                <label className="block text-sm font-body text-gray-700 mb-1">Photo Upload</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-maroon/50"
                />
                {isUploading && <p className="text-sm text-brand-gold mt-1 font-bold">Uploading to Cloudinary...</p>}
                {formData.image_url && (
                  <div className="mt-2 h-32 w-full rounded-md overflow-hidden border">
                    <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-body text-gray-700 mb-1">Icon (Emoji Fallback)</label>
                <input 
                  type="text" 
                  value={formData.icon}
                  onChange={(e) => setFormData({...formData, icon: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-maroon/50"
                  placeholder="e.g. 🖼️"
                />
              </div>
              <div>
                <label className="block text-sm font-body text-gray-700 mb-1">Grid Size</label>
                <select 
                  value={formData.span}
                  onChange={(e) => setFormData({...formData, span: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-maroon/50"
                >
                  <option value="col-span-1 row-span-1">Small (1x1)</option>
                  <option value="col-span-1 md:col-span-2 row-span-1">Wide (2x1)</option>
                  <option value="col-span-1 row-span-2">Tall (1x2)</option>
                </select>
              </div>
              <button 
                type="submit" 
                disabled={isUploading}
                className={`w-full text-white py-2 rounded-md transition-colors font-bold ${isUploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand-maroon hover:bg-brand-maroon-dark'}`}
              >
                {isUploading ? 'Uploading...' : 'Add to Gallery'}
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h2 className="text-xl font-heading font-bold text-brand-maroon">Existing Items</h2>
              
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search titles..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-maroon/50 w-full sm:w-48"
                  />
                </div>
                
                {/* Filter */}
                <div className="relative">
                  <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select 
                    value={filterSpan}
                    onChange={(e) => setFilterSpan(e.target.value)}
                    className="pl-9 pr-8 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-maroon/50 appearance-none bg-white w-full sm:w-auto cursor-pointer"
                  >
                    <option value="">All Spans</option>
                    {uniqueSpans.map(span => (
                      <option key={span} value={span}>{span === 'col-span-1 row-span-1' ? 'Small (1x1)' : span === 'col-span-1 md:col-span-2 row-span-1' ? 'Wide (2x1)' : span === 'col-span-1 row-span-2' ? 'Tall (1x2)' : span}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredGallery.map((item) => (
                <div key={item.id} className="relative group bg-gray-50 border rounded-lg p-4 text-center aspect-square flex flex-col items-center justify-center overflow-hidden">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.title} className="absolute inset-0 w-full h-full object-cover z-0" />
                  ) : (
                    <span className="text-4xl mb-2 relative z-10">{item.icon}</span>
                  )}
                  <div className="absolute bottom-0 left-0 w-full bg-black/60 p-2 z-10">
                    <h3 className="font-bold font-heading text-sm text-white">{item.title}</h3>
                  </div>
                  <button 
                    onClick={() => handleDeleteClick(item.id)} 
                    className="absolute top-2 right-2 p-2 bg-red-100 text-red-600 hover:bg-red-500 hover:text-white rounded-full transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <FiTrash2 className="text-sm" />
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
        title="Delete Gallery Item"
        message="Are you sure you want to delete this gallery item? This action cannot be undone."
      />
    </div>
  );
};

export default ManageGallery;
