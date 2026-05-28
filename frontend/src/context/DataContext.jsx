import React, { createContext, useState, useEffect, useContext } from 'react';

const DataContext = createContext();

const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:8080/api';

export const DataProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('site_auth') === 'true';
  });

  const login = async (username, password) => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        setIsAuthenticated(true);
        localStorage.setItem('site_auth', 'true');
        return true;
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('site_auth');
  };

  // Fetch initial data
  useEffect(() => {
    fetch(`${API_URL}/courses/`)
      .then(res => res.json())
      .then(data => Array.isArray(data) ? setCourses(data) : setCourses([]))
      .catch(err => console.error("Error fetching courses:", err));

    fetch(`${API_URL}/gallery/`)
      .then(res => res.json())
      .then(data => Array.isArray(data) ? setGallery(data) : setGallery([]))
      .catch(err => console.error("Error fetching gallery:", err));

    fetch(`${API_URL}/testimonials/`)
      .then(res => res.json())
      .then(data => Array.isArray(data) ? setTestimonials(data) : setTestimonials([]))
      .catch(err => console.error("Error fetching testimonials:", err));
      
    // Fetch inquiries if authenticated
    if (isAuthenticated) {
      fetch(`${API_URL}/inquiries/`)
        .then(res => res.json())
        .then(data => Array.isArray(data) ? setInquiries(data) : setInquiries([]))
        .catch(err => console.error("Error fetching inquiries:", err));
    }
  }, [isAuthenticated]);

  // Actions
  const addCourse = async (course) => {
    try {
      const res = await fetch(`${API_URL}/courses/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(course)
      });
      const newCourse = await res.json();
      setCourses([...courses, newCourse]);
    } catch (err) {
      console.error("Error adding course:", err);
    }
  };

  const deleteCourse = async (id) => {
    try {
      await fetch(`${API_URL}/courses/${id}`, { method: 'DELETE' });
      setCourses(courses.filter(c => c.id !== id));
    } catch (err) {
      console.error("Error deleting course:", err);
    }
  };

  const addGalleryItem = async (item) => {
    try {
      const res = await fetch(`${API_URL}/gallery/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      const newItem = await res.json();
      setGallery([...gallery, newItem]);
    } catch (err) {
      console.error("Error adding gallery item:", err);
    }
  };

  const deleteGalleryItem = async (id) => {
    try {
      await fetch(`${API_URL}/gallery/${id}`, { method: 'DELETE' });
      setGallery(gallery.filter(g => g.id !== id));
    } catch (err) {
      console.error("Error deleting gallery item:", err);
    }
  };

  const addTestimonial = async (testimonial) => {
    try {
      const res = await fetch(`${API_URL}/testimonials/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testimonial)
      });
      const newTestimonial = await res.json();
      setTestimonials([...testimonials, newTestimonial]);
    } catch (err) {
      console.error("Error adding testimonial:", err);
    }
  };

  const deleteTestimonial = async (id) => {
    try {
      await fetch(`${API_URL}/testimonials/${id}`, { method: 'DELETE' });
      setTestimonials(testimonials.filter(t => t.id !== id));
    } catch (err) {
      console.error("Error deleting testimonial:", err);
    }
  };
  
  const addInquiry = async (inquiry) => {
    try {
      const res = await fetch(`${API_URL}/inquiries/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiry)
      });
      const newInquiry = await res.json();
      setInquiries([newInquiry, ...inquiries]); // Add to beginning
      return true;
    } catch (err) {
      console.error("Error adding inquiry:", err);
      return false;
    }
  };

  const deleteInquiry = async (id) => {
    try {
      await fetch(`${API_URL}/inquiries/${id}`, { method: 'DELETE' });
      setInquiries(inquiries.filter(i => i.id !== id));
    } catch (err) {
      console.error("Error deleting inquiry:", err);
    }
  };

  return (
    <DataContext.Provider value={{
      courses, addCourse, deleteCourse,
      gallery, addGalleryItem, deleteGalleryItem,
      testimonials, addTestimonial, deleteTestimonial,
      inquiries, addInquiry, deleteInquiry,
      isAuthenticated, login, logout
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
