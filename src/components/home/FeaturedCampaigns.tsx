import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Clock, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data for now
const campaigns = [
  {
    id: '1',
    title: 'Education for Orphans',
    description: 'Help us provide quality education and school supplies to orphans.',
    image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    currentAmount: 15000,
    targetAmount: 25000,
    daysLeft: 12,
  },
  {
    id: '2',
    title: 'Nutrition Program',
    description: 'Support our program to provide balanced meals to children in need.',
    image: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    currentAmount: 8500,
    targetAmount: 12000,
    daysLeft: 8,
  },
  {
    id: '3',
    title: 'Healthcare Initiative',
    description: 'Provide medical check-ups and treatments for vulnerable children.',
    image: 'https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    currentAmount: 12000,
    targetAmount: 20000,
    daysLeft: 15,
  },
];

const FeaturedCampaigns: React.FC = () => {
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
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('home.featuredCampaigns.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('home.featuredCampaigns.subtitle')}
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {campaigns.map((campaign) => (
            <motion.div 
              key={campaign.id} 
              className="card group hover:shadow-lg transition-shadow duration-300"
              variants={itemVariants}
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <div className="flex justify-between items-center text-white">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm">{campaign.daysLeft} {t('common.daysLeft')}</span>
                    </div>
                    <div className="badge bg-primary-500 text-white">
                      {Math.round((campaign.currentAmount / campaign.targetAmount) * 100)}% {t('common.funded')}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{campaign.title}</h3>
                <p className="text-gray-600 mb-4">{campaign.description}</p>
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-primary-600 h-2.5 rounded-full"
                      style={{
                        width: `${Math.min(
                          Math.round((campaign.currentAmount / campaign.targetAmount) * 100),
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="font-medium">
                      {t('common.currency')} {campaign.currentAmount.toLocaleString()}
                    </span>
                    <span className="text-gray-500">
                      {t('common.target')}: {t('common.currency')} {campaign.targetAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Link
                    to={`/campaigns/${campaign.id}`}
                    className="btn-outline text-center flex-1"
                  >
                    {t('common.learnMore')}
                  </Link>
                  <Link
                    to={`/donate?campaign=${campaign.id}`}
                    className="btn-primary text-center flex-1 flex items-center justify-center"
                  >
                    <Heart className="h-4 w-4 mr-1" />
                    {t('common.donate')}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Link to="/campaigns" className="btn-secondary px-8 py-3">
            {t('home.featuredCampaigns.viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCampaigns;