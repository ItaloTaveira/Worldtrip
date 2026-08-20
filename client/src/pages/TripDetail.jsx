import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function TripDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Try to fetch from server or use fallback
  const trip = {
    id: 'trip-1',
    title: 'Fernando de Noronha - Paraíso Brasileiro',
    description:
      'Descubra o arquipélago mais bonito do Brasil com águas cristalinas, vida marinha exuberante e praias de areia branca. Um destino imperdível para quem ama natureza e mergulho.',
    destination: 'Fernando de Noronha, PE',
    price: 4850,
    duration: 5,
    imageUrl:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    highlights: [
      'Mergulho com golfinhos rotadores',
      'Trilha até o Mirante dos Golfinhos',
      'Praia do Sancho (eleita a mais bonita do mundo)',
      'Passeio de barco pelas ilhas',
      'Observação de tartarugas marinhas',
    ],
    includes: [
      'Passagens aéreas (ida e volta)',
      '4 noites de hospedagem em pousada charmosa',
      'Café da manhã diário',
      'Traslados aeroporto-hotel-aeroporto',
      'Passeios guiados conforme roteiro',
      'Seguro viagem',
    ],
    excludes: [
      'Almoços e jantares (exceto café da manhã)',
      'Taxa de preservação ambiental (R$ 106,14/dia)',
      'Despesas pessoais e gorjetas',
      'Equipamento de mergulho (opcional)',
    ],
    isActive: true,
    createdAt: '2024-01-15T10:00:00.000Z',
    updatedAt: '2024-01-15T10:00:00.000Z',
  };

  return (
    <section style={{ padding: '60px 0' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <nav style={{ marginBottom: '30px' }}>
          <Link
            to="/pacotes"
            style={{ display: 'inline-block', fontSize: '14px', color: '#666', textDecoration: 'underline' }}
          >
            Voltar aos pacotes
          </Link>
        </nav>

        <img
          src={trip.imageUrl}
          alt={trip.title}
          style={{ width: '100%', height: 400, borderRadius: '8px', objectFit: 'cover', marginBottom: '30px' }}
        />

        <div style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '36px', marginBottom: '20px', color: '#1e3a5f' }}>{trip.title}</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
            <div>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Duração</p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e3a5f' }}>{trip.duration} dias</p>
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Preço</p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#e83e8c' }}>R$ {trip.price.toFixed(2)}</p>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Destino</p>
            <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e3a5f' }}>{trip.destination}</p>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Destaques</h3>
            <ul style={{ listStyle: 'none', padding: '0' }}>
              {trip.highlights.map((h, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '8px',
                    fontSize: '15px',
                  }}
                >
                  <span style={{ width: '12px', height: '12px', background: '#27ae60', borderRadius: '50%', marginRight: '8px' }}></span>{h}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Inclui</h3>
            <ul style={{ listStyle: 'none', padding: '0' }}>
              {trip.includes.map((item, i) => (
                <li key={i} style={{ fontSize: '15px', marginBottom: '8px' }}>
                  ✅ {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Exclui</h3>
            <ul style={{ listStyle: 'none', padding: '0' }}>
              {trip.excludes.map((item, i) => (
                <li key={i} style={{ fontSize: '15px', marginBottom: '8px' }}>
                  ❌ {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TripDetail;