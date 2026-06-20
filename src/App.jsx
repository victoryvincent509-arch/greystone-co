import { lazy, Suspense, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { gsap } from './utils/animations';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { killAllScrollTriggers, refreshScrollTrigger } from './utils/animations';
import { scrollToTop } from './utils/scroll';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import PageTransition from './components/PageTransition/PageTransition';
import './styles/global.css';

gsap.registerPlugin(useGSAP);

const Home = lazy(() => import('./pages/Home/Home'));
const Listings = lazy(() => import('./pages/Listings/Listings'));
const PropertyDetail = lazy(() => import('./pages/PropertyDetail/PropertyDetail'));
const About = lazy(() => import('./pages/About/About'));
const Services = lazy(() => import('./pages/Services/Services'));
const Agents = lazy(() => import('./pages/Agents/Agents'));
const AgentDetail = lazy(() => import('./pages/AgentDetail/AgentDetail'));
const Blog = lazy(() => import('./pages/Blog/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost/BlogPost'));
const Contact = lazy(() => import('./pages/Contact/Contact'));

function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    scrollToTop();
    // Note: ScrollTrigger cleanup is handled by PageTransition component
    // to avoid conflicts with page transition animations
    const timer = setTimeout(() => {
      refreshScrollTrigger();
    }, 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
}

function AppContent() {
  useSmoothScroll();

  return (
    <>
      <ScrollManager />
      <Navbar />
      <main>
        <PageTransition>
          <Suspense fallback={<div className="page-loading" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/listings/:slug" element={<PropertyDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/agents/:slug" element={<AgentDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </PageTransition>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}
