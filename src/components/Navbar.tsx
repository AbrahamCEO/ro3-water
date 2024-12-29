import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/ro3.svg';

const navItems = [
  { id: 'products', label: 'Products' },
  { id: 'about', label: 'About' },
  { id: 'find-store', label: 'Find a Store' },
  { id: 'contact', label: 'Contact' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(scrollPosition / windowHeight, 1);
      setScrollProgress(progress);

      // Update active section based on scroll position
      const sections = navItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id)
      }));

      const viewportHeight = window.innerHeight;
      const currentSection = sections.reduce((acc, section) => {
        if (!section.element) return acc;
        const rect = section.element.getBoundingClientRect();
        // Consider a section active when it takes up most of the viewport
        const isVisible = rect.top < viewportHeight * 0.5 && rect.bottom >= viewportHeight * 0.3;
        return isVisible ? section.id : acc;
      }, '');

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navHeight = 80; // Height of the fixed navbar
      const offset = 20; // Additional offset for better positioning
      const sectionPosition = section.offsetTop - navHeight - offset;
      
      window.scrollTo({
        top: sectionPosition,
        behavior: 'smooth'
      });
      
      // Add a small delay to ensure the scroll is complete before updating the active section
      setTimeout(() => {
        setIsOpen(false);
        setActiveSection(sectionId);
      }, 100);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
        scrollProgress > 0 ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center focus:outline-none group"
          >
            <img 
              src={logo} 
              alt="RO3 Water" 
              className={`h-10 md:h-12 transition-all duration-300 group-hover:scale-105 ${
                scrollProgress > 0 ? 'brightness-50' : 'brightness-100'
              }`}
            />
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300
                  ${scrollProgress > 0
                    ? activeSection === item.id
                      ? 'text-[#002B5B] bg-[#002B5B]/5'
                      : 'text-gray-700 hover:text-[#002B5B] hover:bg-gray-50'
                    : activeSection === item.id
                      ? 'text-white bg-white/20'
                      : 'text-white hover:text-white hover:bg-white/10'
                  }
                `}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100/10"
          >
            {isOpen ? (
              <X className={scrollProgress > 0 ? 'text-gray-700' : 'text-white'} />
            ) : (
              <Menu className={scrollProgress > 0 ? 'text-gray-700' : 'text-white'} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg transition-all duration-300 ${
            isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full px-4 py-3 text-left rounded-lg transition-colors duration-300 ${
                  activeSection === item.id
                    ? 'text-[#002B5B] bg-[#002B5B]/5'
                    : 'text-gray-700 hover:text-[#002B5B] hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}