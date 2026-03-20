import React from 'react';
import { motion } from 'framer-motion';
import { Star, Wifi, Coffee, Wind } from 'lucide-react';

const rooms = [
  {
    name: 'Suite Melodie',
    desc: 'Nuestra habitación más exclusiva con jacuzzi privado y vista panorámica al océano.',
    price: '$250',
    img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: 'Doble Standard',
    desc: 'Elegancia y confort para parejas. Incluye desayuno continental y acceso a la piscina.',
    price: '$120',
    img: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800'
  },
  {
    name: 'Triple Vista Mar',
    desc: 'Perfecta para grupos pequeños o familias. Balcón privado con hamacas.',
    price: '$180',
    img: 'https://images.unsplash.com/photo-1595571024048-45a59177f538?auto=format&fit=crop&q=80&w=800'
  }
];

const RoomsSection: React.FC = () => {
  return (
    <section id="rooms" className="section container">
      <div className="section-title">
        <h1>Nuestras Habitaciones</h1>
        <p className="subtitle">Diseñadas para tu máximo confort</p>
      </div>

      <div className="rooms-grid">
        {rooms.map((room, index) => (
          <motion.div 
            key={index}
            className="room-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <img src={room.img} alt={room.name} className="room-img" />
            <div className="room-info">
              <div className="room-name">{room.name}</div>
              <p className="room-desc">{room.desc}</p>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                <Wifi size={16} /> <Coffee size={16} /> <Wind size={16} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="room-price">{room.price} <span style={{fontSize: '0.8rem', fontWeight: 400, color: 'var(--text-muted)'}}>/ noche</span></div>
                <div style={{ display: 'flex', color: '#fbbf24' }}><Star size={14} fill="#fbbf24" /><Star size={14} fill="#fbbf24" /><Star size={14} fill="#fbbf24" /><Star size={14} fill="#fbbf24" /><Star size={14} fill="#fbbf24" /></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RoomsSection;
