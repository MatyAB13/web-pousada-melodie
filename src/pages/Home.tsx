import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import RoomsSection from '../components/RoomsSection'
import BookingForm from '../components/BookingForm'
import Footer from '../components/Footer'

const Home: React.FC = () => {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Navbar />
      <Hero />
      <RoomsSection />
      
      <section id="reservar" className="section container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="section-title">
          <h1>Reserva Directa</h1>
          <p className="subtitle">Completa el formulario y Taisa te contactará</p>
        </div>
        <BookingForm />
      </section>

      <Footer />
    </div>
  )
}

export default Home
