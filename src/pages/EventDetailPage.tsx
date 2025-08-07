import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Calendar, MapPin, Users, Clock, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchEventById, registerForEvent } from '../store/slices/eventsSlice';
import type { AppDispatch, RootState } from '../store';

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  
  const { currentEvent: event, loading, error } = useSelector((state: RootState) => state.events);
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(fetchEventById(id));
    }
  }, [dispatch, id]);

  const handleRegister = () => {
    if (id && user) {
      dispatch(registerForEvent({ eventId: id, userId: user.id }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-error-600 text-lg mb-4">{error || t('events.notFound')}</p>
          <Link to="/events" className="btn-primary">
            {t('events.backToList')}
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
            src={event.imageUrl || "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg"}
            alt={event.title}
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
              event.status === 'upcoming'
                ? 'bg-success-100 text-success-700'
                : event.status === 'ongoing'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-gray-100 text-gray-700'
            }`}>
              {t(`events.status.${event.status}`)}
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-300">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{event.location}</span>
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
              <h2 className="text-2xl font-semibold mb-4">{t('events.about')}</h2>
              <p className="text-gray-600 whitespace-pre-line">
                {event.description}
              </p>
            </motion.div>

            {event.maxParticipants && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h2 className="text-2xl font-semibold mb-6">{t('events.participants')}</h2>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-primary-600">
                    <Users className="h-5 w-5 mr-2" />
                    <span className="text-lg font-medium">
                      {event.currentParticipants}/{event.maxParticipants}
                    </span>
                  </div>
                  <div className="text-gray-500">
                    {event.maxParticipants - event.currentParticipants} {t('events.spotsLeft')}
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                  <div
                    className="bg-primary-600 h-2.5 rounded-full"
                    style={{
                      width: `${Math.min(
                        Math.round((event.currentParticipants / event.maxParticipants) * 100),
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Registration Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-6">{t('events.registration')}</h3>
              
              {event.registrationFee ? (
                <div className="flex items-center text-2xl font-bold text-gray-900 mb-6">
                  <DollarSign className="h-6 w-6 text-primary-600 mr-2" />
                  {t('common.currency')} {event.registrationFee.toLocaleString()}
                </div>
              ) : (
                <div className="text-lg font-medium text-success-600 mb-6">
                  {t('events.freeEvent')}
                </div>
              )}

              {event.status === 'upcoming' ? (
                isAuthenticated ? (
                  <button
                    onClick={handleRegister}
                    className="w-full btn-primary py-3"
                    disabled={event.maxParticipants && event.currentParticipants >= event.maxParticipants}
                  >
                    {event.maxParticipants && event.currentParticipants >= event.maxParticipants
                      ? t('events.eventFull')
                      : event.registrationFee
                      ? t('events.register')
                      : t('events.joinFree')}
                  </button>
                ) : (
                  <Link to="/login" className="w-full btn-primary py-3 text-center">
                    {t('events.loginToRegister')}
                  </Link>
                )
              ) : (
                <button
                  className="w-full btn-outline py-3"
                  disabled
                >
                  {t(`events.status.${event.status}`)}
                </button>
              )}

              {event.maxParticipants && event.currentParticipants >= event.maxParticipants && (
                <p className="mt-2 text-sm text-error-600 text-center">
                  {t('events.noSpotsLeft')}
                </p>
              )}
            </div>

            {/* Share Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">{t('events.share')}</h3>
              <div className="flex space-x-4">
                <button className="flex-1 btn-outline flex items-center justify-center">
                  <Users className="h-5 w-5 mr-2" />
                  {t('events.invite')}
                </button>
                <button className="flex-1 btn-outline flex items-center justify-center">
                  {t('events.share')}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;