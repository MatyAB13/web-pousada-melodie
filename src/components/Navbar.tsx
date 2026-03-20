import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#" className="nav-logo">POUSADA MELODIE</a>
      <div className="nav-links">
        <a href="#hero" className="nav-link">Home</a>
        <a href="#rooms" className="nav-link">Habitaciones</a>
        <a href="#reservar" className="nav-link">Reservar</a>
      </div>
    </nav>
  );
};

export default Navbar;
