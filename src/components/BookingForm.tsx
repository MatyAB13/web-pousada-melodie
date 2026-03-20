import React, { useState } from 'react';
import { Calendar, User, Phone, Mail, Users, Hotel, Send, CheckCircle2 } from 'lucide-react';

interface FormData {
  nombre: string;
  telefono: string;
  email: string;
  habitacion: string;
  personas: string;
  entrada: string;
  salida: string;
}

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    telefono: '',
    email: '',
    habitacion: '',
    personas: '1',
    entrada: '',
    salida: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const webhookUrl = import.meta.env.VITE_WEBHOOK_URL || 'http://localhost:5678/webhook-test/334b92fe-0a15-46ce-807b-2e34b37dac57';

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'Website Reservation Form'
        }),
      });

      if (!response.ok) {
        throw new Error('Hubo un problema al enviar la reserva. Por favor intente de nuevo.');
      }

      setSuccess(true);
    } catch (err) {
      console.error('Submission error:', err);
      // Even if it fails (e.g. CORS or localhost not running), we'll show success for the demo if it's meant to be local 
      // But for a real app we should handle it better.
      // Since the user is likely testing this locally with n8n, we show error if it truly fails.
      setError('No se pudo conectar con el servidor. Asegúrese de que el webhook esté activo.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="success-message">
        <CheckCircle2 className="success-icon" />
        <h2>¡Reserva Enviada!</h2>
        <p className="subtitle" style={{marginBottom: '1rem'}}>Gracias, {formData.nombre}. Tu solicitud ha sido enviada con éxito.</p>
        <p className="text-muted">Taisa se pondrá en contacto contigo pronto para acordar el horario de entrada.</p>
        <button 
          className="btn-primary" 
          style={{maxWidth: '200px', margin: '2rem auto 0'}}
          onClick={() => setSuccess(false)}
        >
          Volver al formulario
        </button>
      </div>
    );
  }

  return (
    <form className="glass-card" onSubmit={handleSubmit}>
      <h1>Reservar Habitación</h1>
      <p className="subtitle">Pousada Melodie - Tu descanso soñado</p>

      <div className="form-grid">
        <div className="form-group">
          <label><User size={14} style={{marginRight: '4px'}} /> Nombre Completo</label>
          <input 
            type="text" 
            name="nombre" 
            value={formData.nombre} 
            onChange={handleChange} 
            required 
            placeholder="Ej: Juan Pérez"
          />
        </div>

        <div className="form-group">
          <label><Phone size={14} style={{marginRight: '4px'}} /> Teléfono</label>
          <input 
            type="tel" 
            name="telefono" 
            value={formData.telefono} 
            onChange={handleChange} 
            required 
            placeholder="+54 9 11 ..."
          />
        </div>

        <div className="form-group">
          <label><Mail size={14} style={{marginRight: '4px'}} /> Correo Electrónico</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            placeholder="nombre@ejemplo.com"
          />
        </div>

        <div className="form-group">
          <label><Hotel size={14} style={{marginRight: '4px'}} /> Tipo de Habitación</label>
          <select name="habitacion" value={formData.habitacion} onChange={handleChange} required>
            <option value="">Seleccione una opción</option>
            <option value="Suite Melodie">Suite Melodie</option>
            <option value="Doble Standard">Doble Standard</option>
            <option value="Triple Vista Mar">Triple Vista Mar</option>
            <option value="Familiar">Familiar</option>
          </select>
        </div>

        <div className="form-group">
          <label><Users size={14} style={{marginRight: '4px'}} /> Cantidad de Personas</label>
          <input 
            type="number" 
            name="personas" 
            value={formData.personas} 
            onChange={handleChange} 
            min="1" 
            max="10" 
            required
          />
        </div>

        <div className="form-group">
          <label><Calendar size={14} style={{marginRight: '4px'}} /> Fecha de Entrada</label>
          <input 
            type="date" 
            name="entrada" 
            value={formData.entrada} 
            onChange={handleChange} 
            required
          />
        </div>

        <div className="form-group" style={{gridColumn: 'span 2'}}>
          <label><Calendar size={14} style={{marginRight: '4px'}} /> Fecha de Salida</label>
          <input 
            type="date" 
            name="salida" 
            value={formData.salida} 
            onChange={handleChange} 
            required
          />
        </div>

        <div className="info-note">
           <strong>Nota:</strong> El horario de entrada es acordado directamente con la dueña <strong>Taisa</strong> una vez confirmada la disponibilidad.
        </div>

        {error && <div style={{gridColumn: 'span 2', color: '#ff4b2b', textAlign: 'center', fontSize: '0.9rem'}}>{error}</div>}

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Enviando...' : (
            <>
              Confirmar Reserva <Send size={18} />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
