
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import aboutDemo from '../../assets/about_demo.png';

const About = ({ isPreview = false }) => {
  return (
    <section id="about" className={`py-20 ${isPreview ? 'bg-white' : 'bg-brand-cream'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full"
          >
            <div className="relative">
              {/* Decorative background box */}
              <div className="absolute top-4 -left-4 w-full h-full bg-brand-gold rounded-lg -z-10"></div>
              <div className="bg-brand-cream rounded-lg overflow-hidden border border-brand-maroon/10 shadow-lg aspect-[4/3] flex items-center justify-center">
                 <img src={aboutDemo} alt="About Maa Gayatri Shivan Class" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <div className="inline-block px-4 py-1 bg-brand-maroon/10 text-brand-maroon font-body font-semibold rounded-full mb-4">
              About Us
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-maroon mb-6">
              Empowering Through <br /> Traditional Skills
            </h2>
            <p className="text-gray-700 font-body text-lg mb-6 leading-relaxed">
              At <strong className="text-brand-maroon">Maa Gayatri Shivan Class</strong>, we believe in the power of skill development. Located in the heart of Limbdi, our institute has been a beacon of learning for women looking to master the art of tailoring and fashion design.
            </p>
            
            {!isPreview && (
              <>
                <p className="text-gray-700 font-body text-lg mb-6 leading-relaxed">
                  We blend traditional Indian sewing techniques with modern design aesthetics. Whether you are a beginner looking to stitch your first blouse or aiming to become a professional boutique owner, our comprehensive training ensures you achieve your goals with confidence.
                </p>
                <p className="text-gray-700 font-body text-lg mb-8 leading-relaxed">
                  Our legacy spans years of dedicated teaching, focusing on 100% practical knowledge. We provide a supportive, empowering environment where creativity flourishes. Every student receives personal mentorship, ensuring that intricate details like embroidery, measurements, and fabric handling are mastered perfectly.
                </p>
              </>
            )}

            {isPreview && (
              <div className="mb-8 mt-4">
                <Link to="/about" className="text-brand-maroon font-bold font-body border-b-2 border-brand-maroon pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors">
                  Read More About Our Journey &rarr;
                </Link>
              </div>
            )}

            {/* Stats/Features */}
            <div className="grid grid-cols-2 gap-6 mt-6">
              <div className="border-l-4 border-brand-gold pl-4">
                <h4 className="text-2xl font-heading font-bold text-brand-maroon">Expert</h4>
                <p className="text-sm font-body text-gray-500">Mentorship</p>
              </div>
              <div className="border-l-4 border-brand-gold pl-4">
                <h4 className="text-2xl font-heading font-bold text-brand-maroon">100%</h4>
                <p className="text-sm font-body text-gray-500">Practical Focus</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
