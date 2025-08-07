import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedCampaigns from '../components/home/FeaturedCampaigns';
import OrphanagesShowcase from '../components/home/OrphanagesShowcase';
import ImpactStats from '../components/home/ImpactStats';
import EmergencyRelief from '../components/home/EmergencyRelief';
import TestimonialsSection from '../components/home/TestimonialsSection';

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <FeaturedCampaigns />
      <OrphanagesShowcase />
      <ImpactStats />
      <EmergencyRelief />
      <TestimonialsSection />
    </>
  );
};

export default HomePage;