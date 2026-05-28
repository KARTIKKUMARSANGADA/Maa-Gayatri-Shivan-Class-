import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';

const CourseCard = ({ course, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-white rounded-2xl p-8 shadow-xl border-t-4 border-brand-maroon hover:-translate-y-2 transition-transform duration-300 flex flex-col"
  >
    <div className="text-5xl mb-6">{course.icon}</div>
    <h3 className="text-2xl font-heading font-bold text-brand-maroon mb-3">{course.title}</h3>
    <p className="text-gray-600 font-body mb-6 flex-grow">{course.description}</p>
    <div className="flex items-center justify-between mt-auto">
      <span className="text-sm font-body font-semibold text-brand-gold-dark bg-brand-gold-light/20 px-3 py-1 rounded-full">
        Duration: {course.duration}
      </span>
      <a href="tel:+917874789633" className="text-brand-maroon font-body font-bold hover:underline">
        Enquire &rarr;
      </a>
    </div>
  </motion.div>
);

const Courses = ({ isPreview = false }) => {
  const { courses } = useData();
  const displayedCourses = isPreview ? courses.slice(0, 3) : courses;

  return (
    <section id="courses" className="py-20 bg-brand-cream-dark">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-1 bg-brand-maroon/10 text-brand-maroon font-body font-semibold rounded-full mb-4">
            Our Offerings
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-maroon mb-6">
            Professional Training Courses
          </h2>
          <p className="text-gray-600 font-body text-lg">
            Choose from our specialized courses designed to take you from a beginner to an expert.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedCourses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>

        {isPreview && (
          <div className="text-center mt-12">
            <Link 
              to="/courses" 
              className="inline-block px-8 py-3 bg-brand-maroon text-white font-body font-medium rounded-full hover:bg-brand-maroon-dark transition-colors shadow-lg hover:shadow-xl cursor-pointer"
            >
              View All Courses
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Courses;
