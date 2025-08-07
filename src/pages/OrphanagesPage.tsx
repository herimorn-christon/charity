import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MapPin, Users, Heart, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchOrphanages } from '../store/slices/orphanagesSlice';
import type { AppDispatch, RootState } from '../store';
import type { Orphanage } from '../store/slices/orphanagesSlice';

const OrphanagesPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { orphanages, loading, error } = useSelector((state: RootState) => state.orphanages);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    dispatch(fetchOrphanages());
  }, [dispatch]);

  const locations = Array.from(new Set(orphanages.map(o => o.location)));

  const filteredOrphanages = orphanages.filter(orphanage => {
    const matchesSearch = orphanage.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         orphanage.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !selectedLocation || orphanage.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

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
            onClick={() => dispatch(fetchOrphanages())}
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
      <div className="relative bg-primary-900 py-16">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/8613277/pexels-photo-8613277.jpeg"
            alt="Orphanages"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-primary-900 mix-blend-multiply" />
        </div>
        <div className="relative container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              {t('orphanages.hero.title')}
            </h1>
            <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
              {t('orphanages.hero.description')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="py-8 bg-white shadow-sm">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('orphanages.searchPlaceholder')}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="">{t('orphanages.allLocations')}</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Orphanages Grid */}
      <div className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOrphanages.map((orphanage, index) => (
              <motion.div
                key={orphanage.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={orphanage.imageUrl || "https://images.pexels.com/photos/8613277/pexels-photo-8613277.jpeg"}
                    alt={orphanage.name}
                    className="w-full h-full object-cover"
                  />
                  {orphanage.isVerified && (
                    <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {t('orphanages.verified')}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {orphanage.name}
                  </h3>
                  <div className="flex items-center text-gray-500 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{orphanage.location}</span>
                  </div>
                  <div className="flex items-center text-primary-600 mb-4">
                    <Users className="h-4 w-4 mr-1" />
                    <span>
                      {orphanage.orphanCount} {t('orphanages.children')}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {orphanage.description}
                  </p>
                  <div className="flex space-x-3">
                    <Link
                      to={`/orphanages/${orphanage.id}`}
                      className="btn-outline flex-1 text-center"
                    >
                      {t('common.details')}
                    </Link>
                    <Link
                      to={`/donate?orphanage=${orphanage.id}`}
                      className="btn-primary flex-1 flex items-center justify-center"
                    >
                      <Heart className="h-4 w-4 mr-1" />
                      {t('common.support')}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredOrphanages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {t('orphanages.noResults')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrphanagesPage;