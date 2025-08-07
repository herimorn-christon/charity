import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Calendar, Heart, Users, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchCampaignById } from '../store/slices/campaignsSlice';
import { fetchDonationsByTarget } from '../store/slices/donationsSlice';
import DonationForm from '../components/common/DonationForm';
import type { AppDispatch, RootState } from '../store';

const CampaignDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  
  const { currentCampaign: campaign, loading: campaignLoading, error: campaignError } = 
    useSelector((state: RootState) => state.campaigns);
  const { donations, loading: donationsLoading } = 
    useSelector((state: RootState) => state.donations);

  useEffect(() => {
    if (id) {
      dispatch(fetchCampaignById(id));
      dispatch(fetchDonationsByTarget({ type: 'campaign', id }));
    }
  }, [dispatch, id]);

  if (campaignLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (campaignError || !campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-error-600 text-lg mb-4">{campaignError || t('campaigns.notFound')}</p>
          <Link to="/campaigns" className="btn-primary">
            {t('campaigns.backToList')}
          </Link>
        </div>
      </div>
    );
  }

  const daysLeft = Math.ceil(
    (new Date(campaign.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Hero Section */}
      <div className="relative bg-primary-900 h-96">
        <div className="absolute inset-0">
          <img
            src={campaign.imageUrl || "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg"}
            alt={campaign.title}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/70 to-transparent" />
        </div>
        <div className="relative container-custom h-full flex items-end pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${
              campaign.status === 'active'
                ? 'bg-success-100 text-success-700'
                : 'bg-gray-100 text-gray-700'
            }`}>
              {campaign.status === 'active' ? t('campaigns.active') : t('campaigns.completed')}
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              {campaign.title}
            </h1>
            <div className="flex items-center space-x-6 text-gray-300">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{new Date(campaign.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>{daysLeft > 0 ? `${daysLeft} ${t('common.daysLeft')}` : t('campaigns.ended')}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container-custom -mt-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-6 mb-8"
            >
              <h2 className="text-2xl font-semibold mb-4">{t('campaigns.about')}</h2>
              <p className="text-gray-600 whitespace-pre-line">
                {campaign.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl font-semibold mb-6">{t('campaigns.recentDonations')}</h2>
              {donationsLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
                </div>
              ) : donations.length > 0 ? (
                <div className="space-y-4">
                  {donations.slice(0, 5).map((donation) => (
                    <div key={donation.id} className="flex items-center justify-between py-3 border-b last:border-0">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                          <Heart className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <p className="font-medium">
                            {donation.isAnonymous ? t('donation.anonymous') : donation.donorName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(donation.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-primary-600">
                          {t('common.currency')} {donation.amount.toLocaleString()}
                        </p>
                        {donation.message && (
                          <p className="text-sm text-gray-500 italic">"{donation.message}"</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">
                  {t('campaigns.noDonations')}
                </p>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Progress Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-6">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {t('common.currency')} {campaign.currentAmount.toLocaleString()}
                  </span>
                  <span className="text-gray-500">
                    {t('common.target')}: {t('common.currency')} {campaign.targetAmount.toLocaleString()}
                  </span>
                </div>
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
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>
                    {Math.round((campaign.currentAmount / campaign.targetAmount) * 100)}% {t('common.funded')}
                  </span>
                  <span>{donations.length} {t('campaigns.donors')}</span>
                </div>
              </div>

              {campaign.status === 'active' && (
                <DonationForm
                  preselectedType="campaign"
                  preselectedId={campaign.id}
                  preselectedName={campaign.title}
                  onSubmit={() => {}}
                  isLoading={false}
                />
              )}
            </div>

            {/* Share Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">{t('campaigns.share')}</h3>
              <div className="flex space-x-4">
                <button className="flex-1 btn-outline flex items-center justify-center">
                  <Users className="h-5 w-5 mr-2" />
                  {t('campaigns.invite')}
                </button>
                <button className="flex-1 btn-outline flex items-center justify-center">
                  {t('campaigns.share')}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetailPage;