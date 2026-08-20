import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { hashPassword } from './auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, 'data');

fs.mkdirSync(DATA_DIR, { recursive: true });

const FILES = {
  trips: path.join(DATA_DIR, 'trips.json'),
  leads: path.join(DATA_DIR, 'leads.json'),
  users: path.join(DATA_DIR, 'users.json'),
};

function writeFile(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`✓ Created ${path.basename(filePath)}`);
}

// Default admin user
const adminUser = {
  id: 'admin-1',
  username: 'admin',
  passwordHash: hashPassword('admin123'),
  role: 'admin',
  createdAt: new Date().toISOString(),
};

// Sample trips
const trips = [
  {
    id: 'trip-1',
    title: 'Fernando de Noronha - Paraíso Brasileiro',
    description: 'Descubra o arquipélago mais bonito do Brasil com águas cristalinas, vida marinha exuberante e praias de areia branca. Um destino imperdível para quem ama natureza e mergulho.',
    destination: 'Fernando de Noronha, PE',
    price: 4850.00,
    duration: 5,
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    highlights: [
      'Mergulho com golfinhos rotadores',
      'Trilha até o Mirante dos Golfinhos',
      'Praia do Sancho (eleita a mais bonita do mundo)',
      'Passeio de barco pelas ilhas',
      'Observação de tartarugas marinhas'
    ],
    includes: [
      'Passagens aéreas (ida e volta)',
      '4 noites de hospedagem em pousada charmosa',
      'Café da manhã diário',
      'Traslados aeroporto-hotel-aeroporto',
      'Passeios guiados conforme roteiro',
      'Seguro viagem'
    ],
    excludes: [
      'Almoços e jantares (exceto café da manhã)',
      'Taxa de preservação ambiental (R$ 106,14/dia)',
      'Despesas pessoais e gorjetas',
      'Equipamento de mergulho (opcional)'
    ],
    isActive: true,
    createdAt: '2024-01-15T10:00:00.000Z',
    updatedAt: '2024-01-15T10:00:00.000Z',
  },
  {
    id: 'trip-2',
    title: 'Jalapão - Aventura no Cerrado',
    description: 'Explore o coração do Tocantins com suas dunas douradas, fervedouros de águas cristalinas, cachoeiras impressionantes e formações rochosas únicas. Uma aventura inesquecível no cerrado brasileiro.',
    destination: 'Jalapão, TO',
    price: 3290.00,
    duration: 6,
    imageUrl: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80',
    highlights: [
      'Banho nos fervedouros de água cristalina',
      'Dunas do Jalapão ao pôr do sol',
      'Cachoeira da Velha e Cachoeira do Formiga',
      'Serra do Espírito Santo',
      'Comunidades quilombolas e artesanato local'
    ],
    includes: [
      'Transporte em veículo 4x4 com ar-condicionado',
      '5 noites de hospedagem (pousadas e camping)',
      'Pensão completa (café, almoço, jantar)',
      'Guia local especializado',
      'Todos os passeios e entradas',
      'Seguro viagem'
    ],
    excludes: [
      'Passagens aéreas até Palmas',
      'Bebidas alcoólicas',
      'Despesas pessoais e souvenirs',
      'Gorjetas para guias e motoristas'
    ],
    isActive: true,
    createdAt: '2024-01-20T10:00:00.000Z',
    updatedAt: '2024-01-20T10:00:00.000Z',
  },
  {
    id: 'trip-3',
    title: 'Chapada Diamantina - Trilhas e Cachoeiras',
    description: 'Aventure-se pelo Parque Nacional da Chapada Diamantina com suas grutas de águas azuis, cachoeiras monumental, vales e morros. O destino perfeito para trilheiros e amantes da natureza.',
    destination: 'Chapada Diamantina, BA',
    price: 2890.00,
    duration: 5,
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    highlights: [
      'Gruta da Pratinha e Gruta Azul',
      'Cachoeira da Fumaça (340m de queda livre)',
      'Vale do Pati - trekking de 3 dias',
      'Morro do Pai Inácio ao nascer do sol',
      'Poço Encantado e Poço Azul'
    ],
    includes: [
      'Transporte terrestre a partir de Salvador',
      '4 noites de hospedagem em pousadas',
      'Café da manhã e lanches de trilha',
      'Guia de trilhas certificado',
      'Equipamento de segurança para grutas',
      'Seguro viagem'
    ],
    excludes: [
      'Passagens aéreas até Salvador',
      'Almoços e jantares em Lençóis',
      'Equipamento pessoal de trilha (botas, mochila)',
      'Despesas extras e gorjetas'
    ],
    isActive: true,
    createdAt: '2024-02-01T10:00:00.000Z',
    updatedAt: '2024-02-01T10:00:00.000Z',
  },
  {
    id: 'trip-4',
    title: 'Pantanal - Safari Brasileiro',
    description: 'Viva a maior planície alagada do mundo com safáris fotográficos, focagem noturna de jacarés, observação de onças-pintadas e a rica cultura pantaneira. Natureza selvagem no seu estado mais puro.',
    destination: 'Pantanal Norte, MT',
    price: 5680.00,
    duration: 6,
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
    highlights: [
      'Safári fotográfico na Transpantaneira',
      'Focagem noturna de jacarés',
      'Observação de onça-pintada (melhor época: jul-out)',
      'Passeio a cavalo pela fazenda',
      'Pescaria esportiva de piranha'
    ],
    includes: [
      'Transporte a partir de Cuiabá',
      '5 noites em lodge de selva',
      'Pensão completa com culinária pantaneira',
      'Todos os passeios com guia naturalista',
      'Barco privativo para focagem',
      'Seguro viagem'
    ],
    excludes: [
      'Passagens aéreas até Cuiabá',
      'Bebidas premium',
      'Equipamento fotográfico',
      'Gorjetas e despesas pessoais'
    ],
    isActive: true,
    createdAt: '2024-02-10T10:00:00.000Z',
    updatedAt: '2024-02-10T10:00:00.000Z',
  },
  {
    id: 'trip-5',
    title: 'Lençóis Maranhenses - Dunas e Lagoas',
    description: 'Encante-se com o deserto brasileiro que se enche de lagoas cristalinas na estação chuvosa. Caminhe por dunas brancas infinitas e banhe-se em águas azul-turquesa neste cenário surreal.',
    destination: 'Lençóis Maranhenses, MA',
    price: 2590.00,
    duration: 4,
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    highlights: [
      'Lagoa Azul e Lagoa Bonita',
      'Circuito das lagoas em veículo 4x4',
      'Pôr do sol nas dunas',
      'Visita a Atins e Caburé',
      'Voo panorâmico (opcional)'
    ],
    includes: [
      'Transporte a partir de São Luís',
      '3 noites de hospedagem em Barreirinhas',
      'Café da manhã diário',
      'Passeios em 4x4 com guia local',
      'Lanches durante os passeios',
      'Seguro viagem'
    ],
    excludes: [
      'Passagens aéreas até São Luís',
      'Almoços e jantares',
      'Voo panorâmico (R$ 350,00)',
      'Despesas pessoais e gorjetas'
    ],
    isActive: true,
    createdAt: '2024-02-15T10:00:00.000Z',
    updatedAt: '2024-02-15T10:00:00.000Z',
  },
  {
    id: 'trip-6',
    title: 'Bonito - Mergulho em Águas Cristalinas',
    description: 'Capital do ecoturismo brasileiro, Bonito oferece rios de transparência única, grutas submersas, flutuação com peixes coloridos e cavernas impressionantes. Um paraíso subaquático no Mato Grosso do Sul.',
    destination: 'Bonito, MS',
    price: 3580.00,
    duration: 5,
    imageUrl: 'https://images.unsplash.com/photo-1544551763-7bf34361ebf5?w=800&q=80',
    highlights: [
      'Flutuação no Rio Sucuri e Rio da Prata',
      'Gruta do Lago Azul',
      'Abismo Anhumas (rapel + mergulho)',
      'Balneário Municipal',
      'Bóia Cross no Rio Formoso'
    ],
    includes: [
      'Transporte a partir de Campo Grande',
      '4 noites de hospedagem',
      'Café da manhã diário',
      'Ingressos para atrativos (voucher único)',
      'Equipamento de flutuação (roupa, snorkel, colete)',
      'Guia credenciado em todos os passeios',
      'Seguro viagem'
    ],
    excludes: [
      'Passagens aéreas até Campo Grande',
      'Almoços e jantares',
      'Mergulho com cilindro (opcional, R$ 280)',
      'Transporte interno opcional',
      'Gorjetas e despesas pessoais'
    ],
    isActive: true,
    createdAt: '2024-03-01T10:00:00.000Z',
    updatedAt: '2024-03-01T10:00:00.000Z',
  },
];

// Sample leads
const leads = [
  {
    id: 'lead-1',
    name: 'Maria Silva',
    email: 'maria.silva@email.com',
    phone: '(11) 99999-1234',
    tripId: 'trip-1',
    message: 'Gostaria de saber mais detalhes sobre o pacote para Fernando de Noronha em janeiro.',
    status: 'em_contato',
    createdAt: '2024-03-10T14:30:00.000Z',
  },
  {
    id: 'lead-2',
    name: 'João Santos',
    email: 'joao.santos@email.com',
    phone: '(21) 98888-5678',
    tripId: 'trip-3',
    message: 'Tenho interesse na Chapada Diamantina. Vocês fazem grupo para casal?',
    status: 'novo',
    createdAt: '2024-03-12T09:15:00.000Z',
  },
  {
    id: 'lead-3',
    name: 'Ana Costa',
    email: 'ana.costa@email.com',
    phone: '(31) 97777-9012',
    tripId: null,
    message: 'Quero planejar uma viagem de lua de mel. Quais destinos vocês recomendam para casal?',
    status: 'convertido',
    createdAt: '2024-03-08T16:45:00.000Z',
  },
];

// Write all files
writeFile(FILES.users, [adminUser]);
writeFile(FILES.trips, trips);
writeFile(FILES.leads, leads);

console.log('\n✅ Seed completed successfully!');
console.log('\n📋 Default admin credentials:');
console.log('   Username: admin');
console.log('   Password: admin123');
console.log('\n📦 Sample data created:');
console.log(`   - ${trips.length} trips`);
console.log(`   - ${leads.length} leads`);
console.log(`   - 1 admin user`);