import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AlertTriangle, MapPin, Users, Heart, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchDisasters } from '../store/slices/disasterReliefSlice';
import type { AppDispatch, RootState } from '../store';

const DisasterReliefPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { disasters, loading, error } = useSelector((state: RootState) => state.disasterRelief);

  useEffect(() => {
    dispatch(fetchDisasters());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-error-600 text-lg mb-4">{error}</p>
          <button
            onClick={() => dispatch(fetchDisasters())}
            className="btn-primary"
          >
            {t('common.tryAgain')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-error-900 py-16">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1571442/pexels-photo-1571442.jpeg"
            alt="Disaster Relief"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-error-900 mix-blend-multiply" />
        </div>
        <div className="relative container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-error-500 p-4 rounded-full">
                <AlertTriangle className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              {t('disaster.hero.title')}
            </h1>
            <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
              {t('disaster.hero.description')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Active Disasters Grid */}
      <div className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {disasters.map((disaster, index) => (
              <motion.div
                key={disaster.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={disaster.imageUrl || "https://images.pexels.com/photos/1571442/pexels-photo-1571442.jpeg"}
                    alt={disaster.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      disaster.urgencyLevel === 'high'
                        ? 'bg-error-100 text-error-700'
                        : disaster.urgencyLevel === 'medium'
                        ? 'bg-warning-100 text-warning-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {t(`disaster.urgency.${disaster.urgencyLevel}`)}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {disaster.title}
                  </h3>
                  <div className="flex items-center text-gray-500 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{disaster.location}</span>
                  </div>
                  <div className="flex items-center text-error-600 mb-4">
                    <Users className="h-4 w-4 mr-1" />
                    <span>
                      {disaster.affectedCount.toLocaleString()} {t('disaster.affected')}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {disaster.description}
                  </p>
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-error-600 h-2.5 rounded-full"
                        style={{
                          width: `${Math.min(
                            Math.round((disaster.currentAmount / disaster.targetAmount) * 100),
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                      <span className="font-medium">
                        {t('common.currency')} {disaster.currentAmount.toLocaleString()}
                      </span>
                      <span className="text-gray-500">
                        {t('common.target')}: {t('common.currency')} {disaster.targetAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Link
                      to={`/disaster-relief/${disaster.id}`}
                      className="btn-outline flex-1 text-center"
                    >
                      {t('common.details')}
                    </Link>
                    <Link
                      to={`/donate?disaster=${disaster.id}`}
                      className="btn-error flex-1 flex items-center justify-center"
                    >
                      <Heart className="h-4 w-4 mr-1" />
                      {t('common.donate')}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {disasters.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {t('disaster.noActive')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisasterReliefPage;