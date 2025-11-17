import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import ProjectsSection from '../components/ProjectsSection';
import ClientsSection from '../components/ClientsSection';
import ContactForm from '../components/ContactForm';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />

      {/* Add padding to account for fixed nav */}
      <div className="pt-16">
        {/* Hero Section */}
        <HeroSection />

        {/* Projects Section */}
        <ProjectsSection />

        {/* Clients Section */}
        <ClientsSection />

        {/* Contact Form Section */}
        <ContactForm />

        {/* Newsletter Section */}
        <NewsletterSection />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
