import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';

const Contact = ({ isPreview = false }) => {
  const { addInquiry } = useData();
  const [formData, setFormData] = useState({ name: '', phone: '', course: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const success = await addInquiry({
      ...formData,
      created_at: new Date().toLocaleString()
    });

    setIsSubmitting(false);
    if (success) {
      setIsSuccess(true);
      setFormData({ name: '', phone: '', course: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000); // Reset after 5s
    }
  };

  return (
    <section id="contact" className={`py-20 ${isPreview ? 'bg-brand-cream-dark' : 'bg-white'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-1 bg-brand-maroon/10 text-brand-maroon font-body font-semibold rounded-full mb-4">
            Get In Touch
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-maroon mb-6">
            {isPreview ? "Start Your Journey Today" : "Contact Us"}
          </h2>
          <p className="text-gray-600 font-body text-lg">
            Ready to master the art of tailoring? Reach out to us for course details and admissions.
          </p>
        </div>

        {isPreview ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border-2 border-brand-gold/30 p-8 md:p-12 text-center"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
              <div className="flex items-center gap-3 text-brand-maroon">
                <FiPhone className="text-2xl" />
                <span className="font-heading font-bold text-xl">+91 78747 89633</span>
              </div>
              <div className="hidden md:block w-px h-12 bg-gray-200"></div>
              <div className="flex items-center gap-3 text-brand-maroon">
                <FiMapPin className="text-2xl" />
                <span className="font-heading font-bold text-xl">Dahod Road, Limbdi</span>
              </div>
            </div>
            
            <Link 
              to="/contact" 
              className="inline-block px-10 py-4 bg-brand-maroon text-white font-body font-bold rounded-full hover:bg-brand-maroon-dark transition-colors shadow-lg hover:shadow-xl cursor-pointer text-lg"
            >
              Contact Us Now
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-brand-cream-dark p-8 rounded-2xl border border-brand-gold/30 shadow-lg"
            >
              <h3 className="text-2xl font-heading font-bold text-brand-maroon mb-6">Visit Our Class</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-maroon text-brand-gold rounded-full flex items-center justify-center shrink-0 text-xl shadow-md">
                    <FiMapPin />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-brand-maroon text-lg">Location</h4>
                    <p className="text-gray-600 font-body mt-1">
                      Near Shakbhaji Market Gate,<br />
                      Dahod Road, Limbdi - 389180
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-maroon text-brand-gold rounded-full flex items-center justify-center shrink-0 text-xl shadow-md">
                    <FiPhone />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-brand-maroon text-lg">Phone Number</h4>
                    <p className="text-gray-600 font-body mt-1 flex flex-col gap-1">
                      <a href="tel:+917874789633" className="hover:text-brand-maroon transition-colors">+91 78747 89633</a>
                      <a href="tel:+919979475873" className="hover:text-brand-maroon transition-colors">+91 99794 75873</a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed Placeholder */}
              <div className="mt-8 rounded-xl overflow-hidden shadow-inner h-64 bg-gray-200 border-2 border-white relative group">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14691.801648356868!2d74.1751381!3d22.9806497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3960ec8b88d8b67b%3A0x6b10620cdde7b4eb!2sLimbdi%2C%20Gujarat%20389180!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{border:0}} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-500"
                  title="Google Maps Location"
                ></iframe>
              </div>
            </motion.div>

            {/* Quick Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl"
            >
              <h3 className="text-2xl font-heading font-bold text-brand-maroon mb-6">Send a Message</h3>
              
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center h-64 text-center space-y-4 bg-green-50 rounded-xl p-6 border border-green-200">
                  <FiCheckCircle className="text-5xl text-green-500" />
                  <div>
                    <h4 className="text-xl font-heading font-bold text-green-800">Inquiry Sent!</h4>
                    <p className="text-green-600 mt-2">Thank you for reaching out. We will get back to you shortly.</p>
                  </div>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-body font-medium text-gray-700 mb-1">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-maroon/50 focus:border-brand-maroon transition-colors bg-gray-50"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-body font-medium text-gray-700 mb-1">Phone Number *</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-maroon/50 focus:border-brand-maroon transition-colors bg-gray-50"
                      placeholder="Your Phone Number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-body font-medium text-gray-700 mb-1">Course Interested In *</label>
                    <select 
                      required
                      value={formData.course}
                      onChange={(e) => setFormData({...formData, course: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-maroon/50 focus:border-brand-maroon transition-colors bg-gray-50"
                    >
                      <option value="">Select a Course</option>
                      <option value="Basic to Advanced Blouse">Basic to Advanced Blouse</option>
                      <option value="Salwar Suit & Kurti">Salwar Suit & Kurti</option>
                      <option value="Complete Dress Making">Complete Dress Making</option>
                      <option value="Advanced Embroidery & Aari Work">Advanced Embroidery & Aari Work</option>
                      <option value="Kids Wear Specialization">Kids Wear Specialization</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-body font-medium text-gray-700 mb-1">Message (Optional)</label>
                    <textarea 
                      rows="4" 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-maroon/50 focus:border-brand-maroon transition-colors bg-gray-50 resize-none"
                      placeholder="Any questions?"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-maroon text-white font-body font-bold py-4 rounded-lg shadow-md hover:bg-brand-maroon-dark hover:shadow-lg transition-all disabled:opacity-70"
                  >
                    {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;
