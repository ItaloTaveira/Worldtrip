import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Trips({ trips }) {
  const navigate = useNavigate();

  return (
    <section style={{ padding: '60px 0' }}>
      <h2 style={{ fontSize: '36px', marginBottom: '30px', color: '#1e3a5f' }}>
        Nossos Pacotes de Viagem
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill', gap: '30px' }}>
        {trips.map((trip) => (
          <div
            key={trip.id}
            style={{
              background: 'white',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s',
              width: '100%',
            }}
          >
            <img
              src={trip.imageUrl}
              alt={trip.title}
              style={{ width: '100%', height: 200, objectFit: 'cover' }}
            />
            <div
              style={{
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
            >
              <div>
                <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#1e3a5f' }}>
                  {trip.title}
                </h3>
                <p style={{ fontSize: '16px', color: '#666', mb: '10px' }}>
                  {trip.destination}
                </p>
                <p style={{ fontSize: '14px', color: '#888' }}>
                  {trip.duration} dias • A partir de R$ {trip.price.toFixed(2)}
                </p>
              </div>
              <Link
                to={`/pacotes/${trip.id}`}
                style={{
                  display: 'inline-block',
                  background: '#1e3a5f',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '5px',
                  fontSize: '14px',
                }}
              >
                Ver detalhes
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Trips;