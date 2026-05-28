
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingButtons from './components/layout/FloatingButtons';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Courses from './components/sections/Courses';
import Gallery from './components/sections/Gallery';
import Testimonials from './components/sections/Testimonials';
import Contact from './components/sections/Contact';

// Context
import { DataProvider, useData } from './context/DataContext';

// Admin Components
import AdminLayout from './pages/admin/AdminLayout';
import Login from './pages/admin/Login';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useData();
  if (!isAuthenticated) {
    return <Navigate to="/gayatriclass-portal/login" replace />;
  }
  return children;
};

const HomePage = () => (
  <>
    <Hero />
    <About isPreview={true} />
    <Courses isPreview={true} />
    <Gallery isPreview={true} />
    <Testimonials isPreview={true} />
    <Contact isPreview={true} />
  </>
);

function App() {
  return (
    <HelmetProvider>
      <DataProvider>
        <div className="font-body text-gray-800 bg-brand-cream selection:bg-brand-gold selection:text-brand-maroon flex flex-col min-h-screen">
          <Helmet>
            <title>Maa Gayatri Shivan Class | Professional Tailoring Training</title>
            <meta name="description" content="Master the art of stitching and fashion design at Maa Gayatri Shivan Class. Professional tailoring training institute in Limbdi." />
            <meta name="keywords" content="Tailoring class, stitching, fashion design, Limbdi, Maa Gayatri Shivan Class, blouse stitching, salwar suit" />
          </Helmet>

          <Routes>
            {/* Admin Login Route */}
            <Route path="/gayatriclass-portal/login" element={
              <Login />
            } />
            
            {/* Admin Route - Without Main Navbar/Footer */}
            <Route path="/gayatriclass-portal/*" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            } />
            
            {/* Main Application Routes */}
            <Route path="*" element={
              <>
                <Navbar />
                <main className="flex-grow pt-20">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/testimonials" element={<Testimonials />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                </main>
                <Footer />
                <FloatingButtons />
              </>
            } />
          </Routes>
        </div>
      </DataProvider>
    </HelmetProvider>
  );
}

export default App;
