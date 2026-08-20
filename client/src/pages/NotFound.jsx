import React from 'react';

function NotFound() {
  return (
    <section style={{ padding: '60px 0', textAlign: 'center' }}>
      <h1 style={{ fontSize: '80px', marginBottom: '20px', color: '#e83e8c' }}>404</h1>
      <h2 style={{ fontSize: '36px', marginBottom: '20px', color: '#555' }}>Página não encontrada</h2>
      <p style={{ fontSize: '18px', color: '#888', marginBottom: '40px' }}>
        O destino que você procura não existe.
      </p>
      <a href="/" style={{ display: 'inline-block', background: '#1e3a5f', color: 'white', padding: '15px 30px', borderRadius: '5px', fontSize: '18px' }}>
        Voltar ao início
      </a>
    </section>
  );
}

export default NotFound;