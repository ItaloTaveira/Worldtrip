import React from 'react';

function Contact() {
  return (
    <section style={{ padding: '60px 0' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', marginBottom: '30px', color: '#1e3a5f', textAlign: 'center' }}>
          Entre em Contato
        </h2>

        <form
          style={{
            background: 'white',
            padding: '40px',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          <div style={{ display: 'grid', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Nome</label>
              <input
                type="text"
                placeholder="Seu nome completo"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '15px',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email</label>
              <input
                type="email"
                placeholder="seu@email.com"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '15px',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Telefone</label>
              <input
                type="tel"
                placeholder="(XX) 99999-9999"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '15px',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Pacote Interessado</label>
              <select
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '15px',
                }}
              >
                <option value="">Selecione um pacote</option>
                <option value="trip-1">
                  Fernando de Noronha - Paraíso Brasileiro
                </option>
                <option value="trip-2">
                  Jalapão - Aventura no Cerrado
                </option>
                <option value="trip-3">
                  Chapada Diamantina - Trilhas e Cachoeiras
                </option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Mensagem</label>
            <textarea
              rows={4}
              placeholder="Sua mensagem..."
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '15px',
                resize: 'vertical',
              }}
            ></textarea>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              background: '#1e3a5f',
              color: 'white',
              padding: '15px',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Enviar Mensagem
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;