import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { MapPin, Users, Heart, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchOrphanageById } from '../store/slices/orphanagesSlice';
import { fetchDonationsByTarget } from '../store/slices/donationsSlice';
import DonationForm from '../components/common/DonationForm';
import type { AppDispatch, RootState } from '../store';

const OrphanageDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  
  const { currentOrphanage: orphanage, loading: orphanageLoading, error: orphanageError } = 
    useSelector((state: RootState) => state.orphanages);
  const { donations, loading: donationsLoading } = 
    useSelector((state: RootState) => state.donations);

  useEffect(() => {
    if (id) {
      dispatch(fetchOrphanageById(id));
      dispatch(fetchDonationsByTarget({ type: 'orphanage', id }));
    }
  }, [dispatch, id]);

  if (orphanageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (orphanageError || !orphanage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-error-600 text-lg mb-4">{orphanageError || t('orphanages.notFound')}</p>
          <Link to="/orphanages" className="btn-primary">
            {t('orphanages.backToList')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Hero Section */}
      <div className="relative bg-primary-900 h-96">
        <div className="absolute inset-0">
          <img
            src={orphanage.imageUrl || "https://images.pexels.com/photos/8613277/pexels-photo-8613277.jpeg"}
            alt={orphanage.name}
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
            {orphanage.isVerified && (
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 bg-success-100 text-success-700">
                {t('orphanages.verified')}
              </div>
            )}
            <h1 className="text-4xl font-bold text-white mb-4">
              {orphanage.name}
            </h1>
            <div className="flex items-center space-x-6 text-gray-300">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{orphanage.location}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <span>{orphanage.orphanCount} {t('orphanages.children')}</span>
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
              <h2 className="text-2xl font-semibold mb-4">{t('orphanages.about')}</h2>
              <p className="text-gray-600 whitespace-pre-line mb-6">
                {orphanage.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-gray-600">
                  <Phone className="h-5 w-5 mr-2 text-primary-600" />
                  <a href={`tel:${orphanage.phoneNumber}`} className="hover:text-primary-600">
                    {orphanage.phoneNumber}
                  </a>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="h-5 w-5 mr-2 text-primary-600" />
                  <a href={`mailto:${orphanage.email}`} className="hover:text-primary-600">
                    {orphanage.email}
                  </a>
                </div>
              </div>
            </motion.div>

            {orphanage.orphans && orphanage.orphans.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-lg shadow-md p-6 mb-8"
              >
                <h2 className="text-2xl font-semibold mb-6">{t('orphanages.children')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {orphanage.orphans.map((orphan) => (
                    <div key={orphan.id} className="flex items-start space-x-4">
                      <div className="h-16 w-16 rounded-full overflow-hidden">
                        <img
                          src={orphan.imageUrl || "https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg"}
                          alt={orphan.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{orphan.name}</h3>
                        <p className="text-sm text-gray-500">
                          {orphan.age} {t('orphanages.yearsOld')}
                        </p>
                        {orphan.needsUrgentHelp && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-error-100 text-error-700">
                            {t('orphanages.urgentHelp')}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl font-semibold mb-6">{t('orphanages.recentDonations')}</h2>
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
                  {t('orphanages.noDonations')}
                </p>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-8"
          >
            {/* Donation Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-6">{t('orphanages.support')}</h3>
              <DonationForm
                preselectedType="orphanage"
                preselectedId={orphanage.id}
                preselectedName={orphanage.name}
                onSubmit={() => {}}
                isLoading={false}
              />
            </div>

            {/* Share Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">{t('orphanages.share')}</h3>
              <div className="flex space-x-4">
                <button className="flex-1 btn-outline flex items-center justify-center">
                  <Users className="h-5 w-5 mr-2" />
                  {t('orphanages.invite')}
                </button>
                <button className="flex-1 btn-outline flex items-center justify-center">
                  {t('orphanages.share')}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OrphanageDetailPage;