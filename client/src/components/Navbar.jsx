import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const activePillRef = useRef(null);
  const navButtonsRef = useRef([]);

  const location = useLocation();

  // Navigation items
  const navItems = [
    { path: '/', label: 'Home', icon: HomeIcon },
    { path: '/sobre', label: 'Sobre', icon: ListIcon },
    { path: '/contato', label: 'Contato', icon: CallIcon  },
  ];

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update active index based on current route
  useEffect(() => {
    const index = navItems.findIndex(item => location.pathname === item.path);
    if (index !== -1) {
      setActiveIndex(index);
    }
  }, [location.pathname]);

  // Update active pill position
  useEffect(() => {
    if (activePillRef.current && navButtonsRef.current[activeIndex]) {
      const button = navButtonsRef.current[activeIndex];
      const pill = activePillRef.current;
      pill.style.width = `${button.offsetWidth}px`;
      pill.style.transform = `translateX(${button.offsetLeft}px)`;
    }
  }, [activeIndex, isMobile]);

  // Handle dark mode
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    setIsDarkMode(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  const handleNavClick = (index) => {
    setActiveIndex(index);
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Render mobile menu or desktop nav
  if (isMobile) {
    return (
      <>
        <div className="bg-mesh">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>
        <nav className="liquid-nav mobile" id="nav" role="navigation" aria-label="Main navigation">
          <div className="nav-header">
            <Link to="/" className="nav-brand" aria-label="World Trip Home">
              World Trip
            </Link>
            <button
              className="hamburger"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <span className={isMobileMenuOpen ? 'open' : ''}></span>
              <span className={isMobileMenuOpen ? 'open' : ''}></span>
              <span className={isMobileMenuOpen ? 'open' : ''}></span>
            </button>
          </div>

          {isMobileMenuOpen && (
            <div className="mobile-menu" role="menu">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-btn-mobile ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => handleNavClick(index)}
                  role="menuitem"
                >
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              ))}
              <button
                className="nav-btn-mobile cta-mobile"
                onClick={closeMobileMenu}
                role="menuitem"
              >
                Pacotes
              </button>
              <button
                className="theme-btn-mobile"
                onClick={toggleDarkMode}
                aria-label={isDarkMode ? 'Modo claro' : 'Modo escuro'}
              >
                <div className="theme-icon-wrapper">
                  <svg className="sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                  </svg>
                  <svg className="moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                </div>
              </button>
            </div>
          )}
        </nav>
      </>
    );
  }

  // Desktop version
  return (
    <>
      <div className="bg-mesh">
        
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
      <nav className="liquid-nav" id="nav" role="navigation" aria-label="Main navigation">
        <div className="liquid-glare-container">
          <div className="liquid-glare" id="glare"></div>
        </div>
        <div className="nav-items">
          <div className="active-pill" id="active-pill" ref={activePillRef}></div>
          {navItems.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-btn ${index === activeIndex ? 'active' : ''}`}
              onClick={() => handleNavClick(index)}
              ref={(el) => { navButtonsRef.current[index] = el; }}
              role="menuitem"
              aria-selected={index === activeIndex}
            >
              <div className="btn-content">
                <item.icon />
                <span>{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
        
        {/* <button
          className="theme-btn"
          id="theme-btn"
          onClick={toggleDarkMode}
          aria-label={isDarkMode ? 'Modo claro' : 'Modo escuro'}
        >
          <div className="theme-icon-wrapper">
            <svg className="sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <svg className="moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </div>
        </button> */}
      </nav>
    </>
  );
}

// Icon components
function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  );
}

function CallIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"></line>
      <line x1="8" y1="12" x2="21" y2="12"></line>
      <line x1="8" y1="18" x2="21" y2="18"></line>
      <line x1="3" y1="6" x2="3.01" y2="6"></line>
      <line x1="3" y1="12" x2="3.01" y2="12"></line>
      <line x1="3" y1="18" x2="3.01" y2="18"></line>
    </svg>
  );
}

export default Navbar;