import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AlertTriangle, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const EmergencyRelief: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="bg-error-500 p-4 rounded-full">
              <AlertTriangle className="h-10 w-10 text-white" />
            </div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold mb-4"
          >
            {t('emergency.title')}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-300 mb-8"
          >
            {t('emergency.description')}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              to="/disaster-relief"
              className="btn-primary bg-error-600 hover:bg-error-700 focus:ring-error-500 px-8 py-3 text-lg inline-flex items-center"
            >
              <Heart className="h-5 w-5 mr-2" />
              {t('emergency.donateNow')}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EmergencyRelief;