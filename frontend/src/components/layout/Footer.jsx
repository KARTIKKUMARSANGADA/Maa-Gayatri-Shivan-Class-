
import { FiPhone, FiMapPin, FiClock } from 'react-icons/fi';
const Footer = () => {
  return (
    <footer className="bg-brand-maroon text-brand-cream py-10 mt-20 border-t-4 border-brand-gold">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Info */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-brand-gold mb-4">
              Maa Gayatri Shivan Class
            </h2>
            <p className="text-brand-cream/80 font-body mb-4 leading-relaxed">
              Empowering women through professional tailoring and stitching training. Join us to learn the art of fashion design.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-heading font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 font-body">
              <li><a href="#home" className="hover:text-brand-gold transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-brand-gold transition-colors">About Us</a></li>
              <li><a href="#courses" className="hover:text-brand-gold transition-colors">Our Courses</a></li>
              <li><a href="#gallery" className="hover:text-brand-gold transition-colors">Gallery</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-heading font-bold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 font-body">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-brand-gold mt-1 shrink-0" />
                <span>Near Shakbhaji Market Gate, Dahod Road, Limdi - 389180</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-brand-gold shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+917874789633" className="hover:text-brand-gold transition-colors">+91 78747 89633</a>
                  <a href="tel:+919979475873" className="hover:text-brand-gold transition-colors">+91 99794 75873</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <FiClock className="text-brand-gold shrink-0" />
                <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-brand-cream/20 pt-6 mt-6 flex flex-col md:flex-row justify-between items-center text-sm font-body text-brand-cream/60">
          <p>&copy; {new Date().getFullYear()} Maa Gayatri Shivan Class. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed for elegance and tradition.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
