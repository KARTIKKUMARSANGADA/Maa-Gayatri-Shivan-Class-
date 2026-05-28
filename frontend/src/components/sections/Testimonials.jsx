import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';

const Testimonials = ({ isPreview = false }) => {
  const { testimonials } = useData();
  const displayedTestimonials = isPreview ? testimonials.slice(0, 3) : testimonials;

  return (
    <section id="testimonials" className="py-20 bg-brand-cream relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-maroon/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-1 bg-brand-maroon/10 text-brand-maroon font-body font-semibold rounded-full mb-4">
            Student Stories
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-maroon mb-6">
            What Our Students Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayedTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-brand-cream-dark relative flex flex-col"
            >
              <FaQuoteLeft className="text-brand-gold/30 text-4xl absolute top-6 left-6" />
              <div className="relative z-10 pt-4 flex-grow flex flex-col">
                <p className="text-gray-600 font-body italic mb-6 flex-grow">"{testimonial.text}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 bg-brand-maroon/10 rounded-full flex items-center justify-center text-brand-maroon font-heading font-bold text-xl shrink-0">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-brand-maroon">{testimonial.name}</h4>
                    <p className="text-sm font-body text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {isPreview && (
          <div className="text-center mt-12">
            <Link 
              to="/testimonials" 
              className="inline-block px-8 py-3 bg-brand-maroon text-white font-body font-medium rounded-full hover:bg-brand-maroon-dark transition-colors shadow-lg hover:shadow-xl cursor-pointer"
            >
              Read All Testimonials
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
