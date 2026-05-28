
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-cream">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-brand-maroon rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-brand-gold rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-brand-maroon rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-brand-maroon mb-6 leading-tight">
            Master the Art of <br />
            <span className="text-brand-gold">Stitching & Design</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 font-body mb-8 max-w-2xl mx-auto md:mx-0">
            Professional tailoring training institute offering specialized courses in Blouse Stitching, Salwar Suits, and Kurti Designs. Empowering creativity since inception.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <Link 
              to="/courses" 
              className="px-8 py-3 bg-brand-maroon text-white font-body font-medium rounded-full hover:bg-brand-maroon-dark transition-colors shadow-lg hover:shadow-xl cursor-pointer"
            >
              Explore Courses
            </Link>
            <a 
              href="tel:+917874789633"
              className="px-8 py-3 bg-white text-brand-maroon border-2 border-brand-maroon font-body font-medium rounded-full hover:bg-brand-cream transition-colors shadow-md cursor-pointer"
            >
              Contact Us
            </a>
          </div>
        </motion.div>

        {/* Hero Image placeholder with decorative border */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 w-full max-w-md md:max-w-none relative"
        >
          <div className="relative rounded-t-full rounded-b-3xl border-8 border-white shadow-2xl overflow-hidden aspect-[4/5] bg-brand-maroon-light/20 flex items-center justify-center">
             <img src="/src/assets/hero_demo.png" alt="Tailoring Class Training" className="object-cover w-full h-full" />
          </div>
          {/* Decorative badge */}
          <div className="absolute -bottom-6 -left-6 bg-brand-gold text-brand-maroon p-6 rounded-full shadow-xl border-4 border-white flex flex-col items-center justify-center w-32 h-32 transform rotate-12">
            <span className="font-heading font-bold text-2xl">100%</span>
            <span className="font-body text-sm font-semibold text-center leading-tight">Practical Training</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
