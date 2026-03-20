import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="container">
        <p>© 2026 Pousada Melodie. Todos los derechos reservados.</p>
        <p style={{ marginTop: '0.5rem' }}>Buzios, Rio de Janeiro, Brasil</p>
        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <a 
            href="/privacy" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-privacy-link"
            style={{ textDecoration: 'none' }}
          >
            Política de Privacidad
          </a>
        </div>
        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Instagram</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>WhatsApp</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Facebook</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
