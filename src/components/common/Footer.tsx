import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center">
              <Heart className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-xl font-bold text-white">
                {t('common.brand')}
              </span>
            </Link>
            <p className="mt-4 text-gray-400">
              {t('footer.tagline')}
            </p>
            <div className="mt-6 flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/orphanages"
                  className="text-gray-400 hover:text-primary-500 transition-colors"
                >
                  {t('nav.orphanages')}
                </Link>
              </li>
              <li>
                <Link
                  to="/campaigns"
                  className="text-gray-400 hover:text-primary-500 transition-colors"
                >
                  {t('nav.campaigns')}
                </Link>
              </li>
              <li>
                <Link
                  to="/disaster-relief"
                  className="text-gray-400 hover:text-primary-500 transition-colors"
                >
                  {t('nav.disaster')}
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="text-gray-400 hover:text-primary-500 transition-colors"
                >
                  {t('nav.events')}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-primary-500 transition-colors"
                >
                  {t('nav.about')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.support')}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/donate"
                  className="text-gray-400 hover:text-primary-500 transition-colors"
                >
                  {t('common.donate')}
                </Link>
              </li>
              <li>
                <Link
                  to="/volunteer"
                  className="text-gray-400 hover:text-primary-500 transition-colors"
                >
                  {t('footer.volunteer')}
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-400 hover:text-primary-500 transition-colors"
                >
                  {t('footer.faq')}
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-400 hover:text-primary-500 transition-colors"
                >
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-primary-500 transition-colors"
                >
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary-500 mr-2 mt-0.5" />
                <span className="text-gray-400">
                  123 Charity Way, Dar es Salaam, Tanzania
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary-500 mr-2" />
                <a
                  href="tel:+255123456789"
                  className="text-gray-400 hover:text-primary-500 transition-colors"
                >
                  +255 123 456 789
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary-500 mr-2" />
                <a
                  href="mailto:info@tumaininetwork.org"
                  className="text-gray-400 hover:text-primary-500 transition-colors"
                >
                  info@tumaininetwork.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            &copy; {currentYear} Tumaini Network. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;