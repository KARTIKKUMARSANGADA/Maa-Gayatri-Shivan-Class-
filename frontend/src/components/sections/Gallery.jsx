import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';

const Gallery = ({ isPreview = false }) => {
  const { gallery } = useData();

  const displayedItems = isPreview ? gallery.slice(0, 4) : gallery;

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-1 bg-brand-maroon/10 text-brand-maroon font-body font-semibold rounded-full mb-4">
            Our Gallery
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-maroon mb-6">
            Glimpses of Our Class
          </h2>
        </div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[200px]">
          {displayedItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-xl overflow-hidden group bg-brand-cream-dark border border-brand-gold/20 flex items-center justify-center ${item.span}`}
            >
              {item.image_url ? (
                <img src={item.image_url} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <div className="text-brand-maroon/50 text-center relative z-10">
                  <span className="block text-3xl mb-2">{item.icon}</span>
                  <span className="font-heading font-semibold">{item.title}</span>
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-brand-maroon/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                <p className="text-brand-gold font-heading font-bold text-xl px-4 text-center">
                  {item.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {isPreview && (
          <div className="text-center mt-12">
            <Link 
              to="/gallery" 
              className="inline-block px-8 py-3 bg-brand-maroon text-white font-body font-medium rounded-full hover:bg-brand-maroon-dark transition-colors shadow-lg hover:shadow-xl cursor-pointer"
            >
              View Full Gallery
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
