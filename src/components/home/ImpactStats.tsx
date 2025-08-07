import React from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Heart, Home, Book } from 'lucide-react';
import { motion } from 'framer-motion';

const ImpactStats: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    {
      icon: <Users className="h-8 w-8 text-primary-600" />,
      count: '2,500+',
      label: t('impact.childrenHelped'),
    },
    {
      icon: <Heart className="h-8 w-8 text-primary-600" />,
      count: '$150K+',
      label: t('impact.donationsRaised'),
    },
    {
      icon: <Home className="h-8 w-8 text-primary-600" />,
      count: '75+',
      label: t('impact.orphanagesSupported'),
    },
    {
      icon: <Book className="h-8 w-8 text-primary-600" />,
      count: '1,800+',
      label: t('impact.educationProvided'),
    },
  ];

  return (
    <section className="py-16 bg-primary-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('impact.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('impact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-lg shadow-sm text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <motion.div
                className="text-4xl font-bold text-gray-900 mb-2"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + index * 0.1,
                  type: 'spring',
                  stiffness: 100,
                }}
              >
                {stat.count}
              </motion.div>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;