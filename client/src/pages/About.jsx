import React from 'react';

function About() {
  return (
    <section style={{ padding: '60px 0' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', marginBottom: '30px', color: '#1e3a5f' }}>
          Sobre a Agência
        </h2>

        <p style={{ fontSize: '18px', marginBottom: '20px', lineHeight: '1.8' }}>
          A WorldTrip nasceu do amor por viagens e do desejo de compartilhar as
          belezas do nosso Brasil com viajantes de todo o mundo. Especializada em
          destinos nacionais, oferecemos experiências autênticas e bem planejadas.
        </p>

        <p style={{ fontSize: '18px', marginBottom: '20px', lineHeight: '1.8' }}>
          Com mais de 10 anos de operação, já levamos milhares de pessoas a
          descobrirem paraísos como Fernando de Noronha, a aventura do Jalapão,
          a magia da Chapada Diamantina e muito mais.
        </p>

        <blockquote style={{
          background: 'linear-gradient(135deg, #1e3a5f, #3d6b99)',
          color: 'white',
          padding: '30px',
          borderRadius: '10px',
          margin: '30px 0',
          fontStyle: 'italic',
        }}>
          'Viajar não é apenas conhecer novos lugares, é transformar a própria
          visão de mundo.'
        </blockquote>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '30px' }}>
          <div>
            <h4 style={{ color: '#1e3a5f', marginBottom: '15px' }}>Destinos Populares</h4>
            <ul style={{ listStyle: 'none', padding: '0' }}>
              <li style={{ marginBottom: '10px' }}>
                <a href="/pacotes" style={{ color: '#333', textDecoration: 'none', fontSize: '15px' }}>
                  Fernando de Noronha
                </a>
              </li>
              <li style={{ marginBottom: '10x' }}>
                <a href="/pacotes" style={{ color: '#333', textDecoration: 'none', fontSize: '15px' }}>
                  Jalapão
                </a>
              </li>
              <li style={{ marginBottom: '10x' }}>
                <a href="/pacotes" style={{ color: '#333', textDecoration: 'none', fontSize: '15px' }}>
                  Lençóis Maranhenses
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#1e3a5f', marginBottom: '15px' }}>Contato</h4>
            <ul style={{ listStyle: 'none', padding: '0' }}>
              <li style={{ marginBottom: '10x' }}>
                <a href="mailto:contato@worldtrip.com" style={{ color: '#333', textDecoration: 'none', fontSize: '15px' }}>
                  angel@worldtripbr.com.br
                </a>
              </li>
              <li style={{ marginBottom: '10x' }}>
                <a href="tel:+5511999998888" style={{ color: '#333', textDecoration: 'none', fontSize: '15px' }}>
                  +55 16 99329-8754
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;