import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchEvents } from '../store/slices/eventsSlice';
import type { AppDispatch, RootState } from '../store';

const EventsPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { events, loading, error } = useSelector((state: RootState) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
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
            onClick={() => dispatch(fetchEvents())}
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
            src="https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg"
            alt="Events"
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
              {t('events.hero.title')}
            </h1>
            <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
              {t('events.hero.description')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search Section */}
      <div className="py-8 bg-white shadow-sm">
        <div className="container-custom">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder={t('events.searchPlaceholder')}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={event.imageUrl || "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg"}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      event.status === 'upcoming'
                        ? 'bg-success-100 text-success-700'
                        : event.status === 'ongoing'
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {t(`events.status.${event.status}`)}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {event.title}
                  </h3>
                  <div className="flex items-center text-gray-500 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{event.location}</span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {event.description}
                  </p>
                  {event.maxParticipants && (
                    <div className="mb-4">
                      <div className="flex items-center text-primary-600 mb-2">
                        <Users className="h-4 w-4 mr-1" />
                        <span>
                          {event.currentParticipants}/{event.maxParticipants} {t('events.participants')}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
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
                    </div>
                  )}
                  <div className="flex space-x-3">
                    <Link
                      to={`/events/${event.id}`}
                      className="btn-outline flex-1 text-center"
                    >
                      {t('common.details')}
                    </Link>
                    {event.status === 'upcoming' && (
                      <Link
                        to={`/events/${event.id}/register`}
                        className="btn-primary flex-1 text-center"
                      >
                        {event.registrationFee ? t('events.register') : t('events.joinFree')}
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {events.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {t('events.noEvents')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;