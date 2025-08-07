import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Calendar, Heart, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchCampaigns } from '../store/slices/campaignsSlice';
import type { AppDispatch, RootState } from '../store';
import type { Campaign } from '../store/slices/campaignsSlice';

const CampaignsPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { campaigns, loading, error } = useSelector((state: RootState) => state.campaigns);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    dispatch(fetchCampaigns());
  }, [dispatch]);

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
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
            onClick={() => dispatch(fetchCampaigns())}
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
            src="https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg"
            alt="Campaigns"
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
              {t('campaigns.hero.title')}
            </h1>
            <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
              {t('campaigns.hero.description')}
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
                placeholder={t('campaigns.searchPlaceholder')}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'completed')}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">{t('campaigns.allStatus')}</option>
                <option value="active">{t('campaigns.activeStatus')}</option>
                <option value="completed">{t('campaigns.completedStatus')}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCampaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={campaign.imageUrl || "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg"}
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      campaign.status === 'active'
                        ? 'bg-success-100 text-success-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {campaign.status === 'active' ? t('campaigns.active') : t('campaigns.completed')}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {campaign.title}
                  </h3>
                  <div className="flex items-center text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(campaign.endDate).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {campaign.description}
                  </p>
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
                      className="btn-outline flex-1 text-center"
                    >
                      {t('common.details')}
                    </Link>
                    <Link
                      to={`/donate?campaign=${campaign.id}`}
                      className="btn-primary flex-1 flex items-center justify-center"
                    >
                      <Heart className="h-4 w-4 mr-1" />
                      {t('common.donate')}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredCampaigns.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {t('campaigns.noResults')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignsPage;