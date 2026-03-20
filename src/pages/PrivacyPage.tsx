import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ overflowX: 'hidden', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main className="container section" style={{ marginTop: '4rem', flex: 1 }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', textDecoration: 'none', marginBottom: '2rem', fontSize: '0.9rem', fontWeight: 500 }}>
          <ArrowLeft size={18} /> Volver al Inicio
        </Link>

        <div className="glass-card" style={{ padding: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <ShieldCheck size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
            <h1 style={{ marginBottom: '0.5rem' }}>Política de Privacidad</h1>
            <p className="subtitle">Tu privacidad es nuestra prioridad</p>
          </div>

          <div className="policy-text">
            <p>En <strong>Pousada Melodie</strong>, valoramos tu privacidad y nos comprometemos a proteger tus datos personales. Esta política explica cómo manejamos la información que proporcionas a través de nuestro formulario de reserva.</p>

            <h3>1. Información que Recopilamos</h3>
            <p>Al realizar una reserva, solicitamos datos como tu nombre completo, número de teléfono, correo electrónico y detalles específicos de tu estancia (fechas y tipo de habitación).</p>

            <h3>2. Uso de la Información</h3>
            <p>Toda la información proporcionada se utiliza exclusivamente para gestionar tu solicitud de reserva. Tus datos son enviados directamente a la dueña, <strong>Taisa</strong>, para coordinar los detalles de tu estancia y acordar el horario de entrada.</p>

            <h3>3. Protección de Datos</h3>
            <p>No compartimos tu información personal con terceros para fines comerciales. Implementamos medidas técnicas para asegurar que tus datos lleguen de forma segura a nuestro sistema de gestión interno.</p>

            <h3>4. Tus Derechos</h3>
            <p>Puedes contactarnos en cualquier momento para solicitar la actualización o eliminación de tus datos de nuestros registros de contacto una vez finalizada tu gestión.</p>

            <p style={{ marginTop: '3rem', fontSize: '0.8rem', fontStyle: 'italic', borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
              Última actualización: Marzo 2026<br />
              Pousada Melodie - Buzios, Brasil
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPage;
