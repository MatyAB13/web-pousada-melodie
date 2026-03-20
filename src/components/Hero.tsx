import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="hero">
      <img src="/hero-bg.png" alt="Pousada Melodie" className="hero-bg" />
      <div className="hero-content">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
        >
          Vive la Experiencia Melodie
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Un oasis de paz y elegancia en el corazón de Brasil. Disfruta de vistas inigualables y un servicio de primera clase.
        </motion.p>
        <motion.a 
          href="#reservar" 
          className="btn-primary"
          style={{ width: 'fit-content', margin: '0 auto', padding: '16px 32px' }}
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Reserva Ahora
        </motion.a>
      </div>
      <motion.div 
        className="scroll-indicator"
        style={{ position: 'absolute', bottom: '2rem', color: '#fff' }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

export default Hero;
