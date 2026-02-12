import Hero from '@/app/en/Hero';
import AboutSection from './AboutSection';
import HistoricalTimeline from './HistoricalTimeline';
import DirectorMessage from './DirectorMessage';
import FeaturedTopics from './FeaturedTopics';
import GlobalInitiativeHighlights from './GlobalInitiativeHighlights';
import KeyFeaturesSection from './KeyFeaturesSection';
import DataResources from './DataResources';
import InteractiveMap from './InteractiveMap';
import ArchitecturalLandmarks from './ArchitecturalLandmarks';
import ParticipationRoadmap from './ParticipationRoadmap';
import InitiativeSection from './InitiativeSection';
import ParticipationProcess from './ParticipationProcess';
import EventHighlights from '@/app/en/EventHighlights';
import FAQ from './FAQ';
import ContactForm from './ContactForm';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <DirectorMessage />
      <FeaturedTopics />
      <GlobalInitiativeHighlights />
      <KeyFeaturesSection />
      <HistoricalTimeline />
      <DataResources />
      <ArchitecturalLandmarks />
      <ParticipationRoadmap />
      <InitiativeSection />
      <ParticipationProcess />
      {/* <EventHighlights /> */}
      <FAQ />
      <ContactForm />
      <Footer />
    </>
  );
}
