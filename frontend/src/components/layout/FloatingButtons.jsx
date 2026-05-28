
import { FaWhatsapp } from 'react-icons/fa';
import { FiPhoneCall } from 'react-icons/fi';
import { motion } from 'framer-motion';

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      {/* Phone Button */}
      <motion.a
        href="tel:+917874789633"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 bg-brand-maroon text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-brand-maroon-dark transition-all"
        aria-label="Call Us"
      >
        <FiPhoneCall className="text-2xl" />
      </motion.a>

      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/918140255951"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-green-600 transition-all"
        aria-label="WhatsApp Us"
      >
        <FaWhatsapp className="text-3xl" />
      </motion.a>
    </div>
  );
};

export default FloatingButtons;
