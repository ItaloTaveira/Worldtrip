import React from 'react';
import Coverflow3D from '../components/Coverflow3D';
import './Home.css';

function Home() {
  const slides = [
    {
      image: { src: '/assets/viagem_01.webp', alt: 'Praias do Brasil' },
      title: 'Praias do Brasil'
    },
    {
      image: { src: '/assets/viagem_02.webp', alt: 'Cidades Históricas' },
      title: 'Cidades Históricas'
    },
    {
      image: { src: '/assets/viagem_03.webp', alt: 'Montanhas e Serras' },
      title: 'Montanhas e Serras'
    },
    {
      image: { src: '/assets/viagem_04.webp', alt: 'Cataratas do Iguaçu' },
      title: 'Cataratas do Iguaçu'
    },
    {
      image: { src: '/assets/viagem_05.webp', alt: 'Chapada Diamantina' },
      title: 'Chapada Diamantina'
    },
    {
      image: { src: '/assets/viagem_06.webp', alt: 'Fernando de Noronha' },
      title: 'Fernando de Noronha'
    }
  ];

  return (
    <section className="home">
      <div className="home-hero">
        <h1 className="home-title">WorldTrip</h1>
        <p className="home-subtitle">
          Explore os destinos mais incríveis do Brasil e do mundo.
        </p>
      </div>

      <div className="home-coverflow-wrapper">
        <Coverflow3D
          slides={slides}
          cardWidth={480}
          cardHeight={360}
          radius={5}
          tilt={12}
          sideTilt={8}
          gap={6}
          opacity={60}
          autoplay={true}
          autoplayDirection="rightToLeft"
          showTitle={true}
          titlePosition={{
            position: 'bottomLeft',
            paddingLeft: 24,
            paddingRight: 24,
            paddingTop: 20,
            paddingBottom: 20
          }}
          transition={{
            duration: 0.7,
            delay: 3.5,
            ease: [0.22, 1, 0.36, 1]
          }}
        />
      </div>

      <div className="home-cta">
        <a href="/pacotes" className="home-cta-btn">
          Ver Todos os Pacotes
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </section>
  );
}

export default Home;