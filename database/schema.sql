-- Melodie Pousada Database Schema
-- Supabase PostgreSQL

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Rooms table
CREATE TABLE rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    name_en VARCHAR(255),
    name_es VARCHAR(255),
    description TEXT,
    description_en TEXT,
    description_es TEXT,
    price DECIMAL(10, 2) NOT NULL,
    capacity INTEGER NOT NULL DEFAULT 2,
    size VARCHAR(50),
    bed_type VARCHAR(100),
    view_type VARCHAR(100) DEFAULT 'garden',
    amenities JSONB DEFAULT '[]',
    images JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_id UUID REFERENCES rooms(id) ON DELETE SET NULL,
    booking_code VARCHAR(20) UNIQUE NOT NULL,
    guest_name VARCHAR(255) NOT NULL,
    guest_email VARCHAR(255) NOT NULL,
    guest_phone VARCHAR(50) NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    adults INTEGER NOT NULL DEFAULT 1,
    children INTEGER DEFAULT 0,
    total_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    payment_method VARCHAR(50),
    payment_status VARCHAR(50) DEFAULT 'pending',
    special_requests TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blocked dates table
CREATE TABLE blocked_dates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    reason VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    guest_name VARCHAR(255) NOT NULL,
    guest_country VARCHAR(100),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    is_verified BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery table
CREATE TABLE gallery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255),
    title_en VARCHAR(255),
    title_es VARCHAR(255),
    category VARCHAR(100) NOT NULL,
    url TEXT NOT NULL,
    thumbnail_url TEXT,
    is_video BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Settings table
CREATE TABLE settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT,
    type VARCHAR(50) DEFAULT 'string',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin users table
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Promotions table
CREATE TABLE promotions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_type VARCHAR(20) NOT NULL,
    discount_value DECIMAL(10, 2) NOT NULL,
    min_stay INTEGER,
    max_uses INTEGER,
    uses_count INTEGER DEFAULT 0,
    valid_from DATE,
    valid_until DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default rooms
INSERT INTO rooms (name, name_en, name_es, description, description_en, description_es, price, capacity, view_type, amenities, sort_order) VALUES
('Quarto Duplo', 'Double Room', 'Habitación Doble', 'Acomodação confortável com vista para o mar, ideal para casais.', 'Comfortable accommodation with sea view, ideal for couples.', 'Alojamiento cómodo con vista al mar, ideal para parejas.', 250, 2, 'sea', '["WiFi", "TV", "Ar Condicionado", "Banheiro Privativo"]', 1),
('Quarto Família', 'Family Room', 'Habitación Familia', 'Espaçoso quarto familiar com vista para o mar, perfeito para famílias.', 'Spacious family room with sea view, perfect for families.', 'Habitación familiar espaciosa con vista al mar, perfecta para familias.', 350, 4, 'sea', '["WiFi", "TV", "Ar Condicionado", "Banheiro Privativo", "Varanda"]', 2),
('Suíte Master', 'Master Suite', 'Suite Master', 'Luxuosa suíte com vista panorâmica para o mar e varanda privativa.', 'Luxurious suite with panoramic sea view and private balcony.', 'Suite lujosa con vista panorámica al mar y balcón privado.', 450, 2, 'sea', '["WiFi", "TV", "Ar Condicionado", "Banheiro Privativo", "Varanda", "Cofre", "Mini Bar"]', 3);

-- Insert default settings
INSERT INTO settings (key, value, type) VALUES
('site_name', 'Melodie Pousada à Beira Mar', 'string'),
('site_description', 'Pousada frente ao mar em Ingleses Norte, Florianópolis', 'string'),
('contact_phone', '+55 48 98821-2772', 'string'),
('contact_email', 'contato@melodiepousada.com.br', 'string'),
('address', 'Servidão Fermino Manoel Zeferino, 79', 'string'),
('neighborhood', 'Ingleses Norte', 'string'),
('city', 'Florianópolis', 'string'),
('state', 'SC', 'string'),
('cep', '88058-402', 'string'),
('check_in_time', '14:00', 'string'),
('check_out_time', '11:00', 'string'),
('cancellation_policy', 'Cancelamento grátis até 7 dias antes do check-in', 'string'),
('rating', '4.9', 'string'),
('review_count', '58', 'number');

-- Insert sample gallery items
INSERT INTO gallery (title, category, url, is_video, sort_order) VALUES
('Vista da Praia', 'beach', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', false, 1),
('Pôr do Sol', 'beach', 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=800', false, 2),
('Quarto Principal', 'interior', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800', false, 3),
('Suite', 'interior', 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800', false, 4),
('Área de Convivência', 'exterior', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', false, 5),
('Churrasqueira', 'amenities', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800', false, 6);

-- Insert sample reviews
INSERT INTO reviews (guest_name, guest_country, rating, comment) VALUES
('Maria Silva', 'Brasil', 5, 'Local perfeito! Fabio e esposa são excelente hosts. Voltarei com certeza!'),
('Carlos García', 'Espanha', 5, 'Increíble ubicación frente a la playa. El trato familiar fue excepcional.'),
('John Smith', 'Estados Unidos', 5, 'Perfect location, amazing hosts. The beach access is fantastic!'),
('Ana Paula', 'Brasil', 5, 'Adorei a experiência. Quartos limpos, atendimento excelente e vista deslumbrante.'),
('Roberto', 'Brasil', 5, 'Férias perfeitas! Recomendo para quem busca tranquilidade e conforto.');

-- Create indexes for better performance
CREATE INDEX idx_bookings_room_id ON bookings(room_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_dates ON bookings(check_in, check_out);
CREATE INDEX idx_blocked_dates_room_id ON blocked_dates(room_id);
CREATE INDEX idx_blocked_dates_date ON blocked_dates(date);
CREATE INDEX idx_gallery_category ON gallery(category);

