import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Heart, Users, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="relative bg-gray-900 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/1250452/pexels-photo-1250452.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          alt="Children smiling"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/70 to-gray-900/70" />
      </div>
      
      <div className="relative container-custom py-20 md:py-28 lg:py-32">
        <div className="max-w-2xl">
          <motion.h1 
            className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t('home.hero.title')}
          </motion.h1>
          <motion.p 
            className="mt-6 text-xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('home.hero.description')}
          </motion.p>
          <motion.div 
            className="mt-10 flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/donate" className="btn-primary text-center px-8 py-3 text-lg">
              <span className="flex items-center justify-center">
                <Heart className="h-5 w-5 mr-2" />
                {t('common.donate')}
              </span>
            </Link>
            <Link to="/orphanages" className="btn-outline border-white text-white hover:bg-white/10 text-center px-8 py-3 text-lg">
              {t('nav.orphanages')}
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="relative bg-primary-900 py-6 md:py-8">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <motion.div 
              className="flex items-center justify-center md:justify-start text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <Heart className="h-10 w-10 text-primary-300 mr-4" />
              <div>
                <div className="text-3xl font-bold">150+</div>
                <div className="text-primary-200">{t('home.stats.donations')}</div>
              </div>
            </motion.div>
            <motion.div 
              className="flex items-center justify-center md:justify-start text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <Users className="h-10 w-10 text-primary-300 mr-4" />
              <div>
                <div className="text-3xl font-bold">50+</div>
                <div className="text-primary-200">{t('home.stats.orphanages')}</div>
              </div>
            </motion.div>
            <motion.div 
              className="flex items-center justify-center md:justify-start text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <Calendar className="h-10 w-10 text-primary-300 mr-4" />
              <div>
                <div className="text-3xl font-bold">30+</div>
                <div className="text-primary-200">{t('home.stats.campaigns')}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;