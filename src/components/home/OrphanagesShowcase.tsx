import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MapPin, Users, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data for now
const orphanages = [
  {
    id: '1',
    name: 'Upendo Children\'s Home',
    location: 'Dar es Salaam',
    image: 'https://images.pexels.com/photos/7706670/pexels-photo-7706670.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    childrenCount: 35,
    description: 'Providing care, education, and love to orphaned children since 2010.',
  },
  {
    id: '2',
    name: 'Hope Foundation',
    location: 'Arusha',
    image: 'https://images.pexels.com/photos/8363104/pexels-photo-8363104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    childrenCount: 28,
    description: 'Creating a safe haven for vulnerable children with focus on education and development.',
  },
  {
    id: '3',
    name: 'Tumaini Children\'s Center',
    location: 'Mwanza',
    image: 'https://images.pexels.com/photos/6647119/pexels-photo-6647119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    childrenCount: 42,
    description: 'Dedicated to transforming the lives of orphaned and abandoned children through comprehensive care.',
  },
  {
    id: '4',
    name: 'Watoto Care Center',
    location: 'Dodoma',
    image: 'https://images.pexels.com/photos/8613277/pexels-photo-8613277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    childrenCount: 31,
    description: 'Nurturing children\'s physical, emotional, and educational needs in a loving environment.',
  },
];

const OrphanagesShowcase: React.FC = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('home.orphanages.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('home.orphanages.subtitle')}
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {orphanages.map((orphanage) => (
            <motion.div 
              key={orphanage.id} 
              className="card group hover:shadow-lg transition-shadow duration-300"
              variants={itemVariants}
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={orphanage.image}
                  alt={orphanage.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-1">{orphanage.name}</h3>
                <div className="flex items-center text-gray-500 mb-3 text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{orphanage.location}</span>
                </div>
                <div className="flex items-center text-primary-600 mb-3 text-sm font-medium">
                  <Users className="h-4 w-4 mr-1" />
                  <span>
                    {orphanage.childrenCount} {t('orphanages.children')}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{orphanage.description}</p>
                <div className="flex space-x-2 mt-auto">
                  <Link
                    to={`/orphanages/${orphanage.id}`}
                    className="btn-outline text-sm text-center flex-1"
                  >
                    {t('common.details')}
                  </Link>
                  <Link
                    to={`/donate?orphanage=${orphanage.id}`}
                    className="btn-primary text-sm text-center flex-1 flex items-center justify-center"
                  >
                    <Heart className="h-3 w-3 mr-1" />
                    {t('common.support')}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-10">
          <Link to="/orphanages" className="btn-secondary px-8 py-3">
            {t('home.orphanages.viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OrphanagesShowcase;