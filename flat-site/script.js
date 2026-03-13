// Simple lang toggle (pt primary)
const languages = {
  pt: { name: 'PT', title: 'Melodie Pousada à Beira Mar | Hospedagem em Ingleses Norte Florianópolis', desc: 'Pousada frente ao mar em Ingleses Norte, Florianópolis. Hospedagem familiar com acesso direto à praia, churrasqueira e mirante. Avaliação 4.9 estrelas!' },
  es: { name: 'ES', title: 'Melodie Pousada à Beira Mar | Hospedaje en Ingleses Norte Florianopolis', desc: 'Pousada frente al mar en Ingleses Norte, Florianopolis. Hospedaje familiar con acceso directo a la playa, parrilla y mirador. Calificación 4.9 estrellas!' },
  en: { name: 'EN', title: 'Melodie Pousada à Beira Mar | Accommodation in Ingleses Norte Florianopolis', desc: 'Beachfront pousada in Ingleses Norte, Florianopolis. Family lodging with direct beach access, BBQ grill and viewpoint. 4.9 star rating!' }
};

let currentLang = 'pt';

function switchLang(lang) {
  currentLang = lang;
  document.querySelector('title').textContent = languages[lang].title;
  document.querySelector('meta[name="description"]').content = languages[lang].desc;
  document.documentElement.lang = lang;
  // Update texts - implement per page
  updateTexts();
}

function updateTexts() {
  // Hero example
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) heroTitle.textContent = languages[currentLang].title.split(' | ')[0];
  // Add more selectors as needed
}

// LocalStorage booking
function getBookings() {
  return JSON.parse(localStorage.getItem('bookings') || '[]');
}

function saveBooking(booking) {
  const bookings = getBookings();
  bookings.push({...booking, id: 'MEL' + Date.now().toString(36).toUpperCase()});
  localStorage.setItem('bookings', JSON.stringify(bookings));
  return booking.id;
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) langBtn.addEventListener('click', () => {
    const langs = Object.keys(languages);
    const nextIdx = (langs.indexOf(currentLang) + 1) % langs.length;
    switchLang(langs[nextIdx]);
  });
  
  // WhatsApp
  const whatsappBtns = document.querySelectorAll('.whatsapp-btn');
  whatsappBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const msg = currentLang === 'pt' ? 'Olá! Gostaria de fazer uma reserva.' : currentLang === 'es' ? 'Hola! Me gustaría hacer una reserva.' : 'Hello! I would like to make a reservation.';
      window.open(`https://wa.me/5548988212772?text=${encodeURIComponent(msg)}`, '_blank');
    });
  });
});

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (header) header.classList.toggle('scrolled', window.scrollY > 20);
});

