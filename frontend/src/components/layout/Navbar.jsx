
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiPhone } from 'react-icons/fi';
import logo from '../../assets/LOGO.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'About', to: '/about' },
    { name: 'Courses', to: '/courses' },
    { name: 'Gallery', to: '/gallery' },
    { name: 'Testimonials', to: '/testimonials' },
    { name: 'Contact', to: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-brand-cream shadow-md py-2' : 'bg-brand-cream py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Maa Gayatri Shivan Class Logo" className="w-16 h-16 md:w-20 md:h-20 object-contain scale-125 origin-center" />
          <div className="ml-2">
            <h1 className="text-xl md:text-2xl font-heading font-bold text-brand-maroon leading-none">
              Maa Gayatri
            </h1>
            <span className="text-xs md:text-sm text-gray-600 font-body block">
              Shivan Class
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <ul className="flex gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `cursor-pointer font-body font-medium transition-colors ${
                      isActive ? 'text-brand-maroon font-bold' : 'text-gray-700 hover:text-brand-maroon'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <a
            href="tel:+917874789633"
            className="flex items-center gap-2 bg-brand-maroon text-white px-5 py-2 rounded-full font-body font-medium hover:bg-brand-maroon-dark transition-colors shadow-md hover:shadow-lg"
          >
            <FiPhone /> Call Now
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-brand-maroon focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100"
        >
          <ul className="flex flex-col py-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-6 py-3 cursor-pointer font-body font-medium transition-colors border-b border-gray-50 last:border-none ${
                      isActive
                        ? 'bg-brand-maroon/10 text-brand-maroon font-bold'
                        : 'text-gray-700 hover:bg-brand-cream hover:text-brand-maroon'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </header>
  );
};

export default Navbar;
