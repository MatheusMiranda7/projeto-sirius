import { Product } from '@/types/sirius';

export const INITIAL_PRODUCTS: Product[] = [
  // SOUSPLATS
  {
    id: 'sp-nogueira-01',
    name: 'Sousplat Nogueira Orgânica',
    category: 'sousplat',
    collection: 'Orgânica',
    description: 'Madeira nogueira maciça esculpida artesanalmente com selamento acetinado impermeável.',
    material: 'Madeira Nogueira',
    color: 'Amadeirado Escuro',
    pricePerDay: 18.50,
    dimensions: 'Ø 34 cm x 1.8 cm',
    totalStock: 300,
    imageUrl: '/images/sousplat-nogueira.jpg',
    hexColor: '#3d2516',
    badge: 'Mais Desejado',
    recommendedWith: ['pr-alabastro-01', 'tl-ouro-faca-01', 'tc-baccarat-01']
  },
  {
    id: 'sp-latao-02',
    name: 'Sousplat Latão Escovado',
    category: 'sousplat',
    collection: 'Metalurgia Fina',
    description: 'Liga metálica nobre com acabamento escovado à mão e toque caloroso.',
    material: 'Latão Maciço',
    color: 'Dourado Fosco',
    pricePerDay: 24.00,
    dimensions: 'Ø 33 cm',
    totalStock: 200,
    imageUrl: '/images/sousplat-latao.jpg',
    hexColor: '#c6a56a',
    recommendedWith: ['pr-nero-02', 'tl-ouro-garfo-01']
  },
  {
    id: 'sp-pedra-03',
    name: 'Sousplat Quartzo Grafite',
    category: 'sousplat',
    collection: 'Mineral',
    description: 'Pedra natural esculpida com textura suave e bordas facetadas.',
    material: 'Quartzo Natural',
    color: 'Grafite Mineral',
    pricePerDay: 22.00,
    dimensions: 'Ø 32 cm',
    totalStock: 150,
    imageUrl: '/images/sousplat-quartzo.jpg',
    hexColor: '#2b2c30',
    recommendedWith: ['pr-nero-02', 'tl-titanio-faca-02']
  },

  // PRATOS PRINCIPAIS
  {
    id: 'pr-alabastro-01',
    name: 'Prato Raízes Alabastro',
    category: 'prato_principal',
    collection: 'Raízes',
    description: 'Porcelana de alta temperatura com esmalte acetinado mineral e bordas suavemente irregularizadass.',
    material: 'Porcelana Fina',
    color: 'Branco Alabastro',
    pricePerDay: 14.00,
    dimensions: 'Ø 28 cm',
    totalStock: 450,
    imageUrl: '/images/prato-alabastro.jpg',
    hexColor: '#f4f2eb',
    badge: 'Clássico Contemporâneo',
    recommendedWith: ['sp-nogueira-01', 'pr-sob-alabastro-01', 'gd-linho-cru-01']
  },
  {
    id: 'pr-nero-02',
    name: 'Prato Noite Nero Marquis',
    category: 'prato_principal',
    collection: 'Noturna',
    description: 'Cerâmica de cinza vulcânica com textura tátil aveludada em tom preto profundo.',
    material: 'Cerâmica Vulcânica',
    color: 'Preto Carbono',
    pricePerDay: 16.00,
    dimensions: 'Ø 27.5 cm',
    totalStock: 280,
    imageUrl: '/images/prato-nero.jpg',
    hexColor: '#141416',
    recommendedWith: ['sp-latao-02', 'tl-ouro-garfo-01', 'tc-fumee-02']
  },

  // PRATOS DE SOBREMESA
  {
    id: 'pr-sob-alabastro-01',
    name: 'Prato Sobremesa Alabastro',
    category: 'prato_sobremesa',
    collection: 'Raízes',
    description: 'Harmonização perfeita para entradas e sobremesas, em porcelana fina com borda em relevo discreto.',
    material: 'Porcelana Fina',
    color: 'Branco Alabastro',
    pricePerDay: 10.50,
    dimensions: 'Ø 21 cm',
    totalStock: 450,
    imageUrl: '/images/prato-sobremesa-alabastro.jpg',
    hexColor: '#f4f2eb',
    recommendedWith: ['pr-alabastro-01']
  },
  {
    id: 'pr-sob-nero-02',
    name: 'Prato Sobremesa Carbono',
    category: 'prato_sobremesa',
    collection: 'Noturna',
    description: 'Esmaltação fosca sobre cerâmica vulcânica preta.',
    material: 'Cerâmica Vulcânica',
    color: 'Preto Carbono',
    pricePerDay: 12.00,
    dimensions: 'Ø 20.5 cm',
    totalStock: 280,
    imageUrl: '/images/prato-sobremesa-nero.jpg',
    hexColor: '#141416',
    recommendedWith: ['pr-nero-02']
  },

  // GUARDANAPOS
  {
    id: 'gd-linho-cru-01',
    name: 'Guardanapo Linho Puro Cru',
    category: 'guardanapo',
    collection: 'Textura Natural',
    description: 'Linho belga 100% puro lavada a pedra com ponto bainha ajour feito à mão.',
    material: 'Linho Belga 100%',
    color: 'Cru Natural',
    pricePerDay: 6.50,
    dimensions: '50 cm x 50 cm',
    totalStock: 600,
    imageUrl: '/images/guardanapo-linho-cru.jpg',
    hexColor: '#d6cdbd',
    recommendedWith: ['pr-alabastro-01', 'sp-nogueira-01']
  },
  {
    id: 'gd-linho-grafite-02',
    name: 'Guardanapo Linho Grafite',
    category: 'guardanapo',
    collection: 'Textura Natural',
    description: 'Linho denso tingido com pigmentação mineral em tom carvão suave.',
    material: 'Linho Belga 100%',
    color: 'Grafite Sombrio',
    pricePerDay: 7.00,
    dimensions: '50 cm x 50 cm',
    totalStock: 400,
    imageUrl: '/images/guardanapo-linho-grafite.jpg',
    hexColor: '#36373b',
    recommendedWith: ['pr-nero-02', 'sp-latao-02']
  },

  // TALHERES - GARFOS
  {
    id: 'tl-ouro-garfo-01',
    name: 'Garfo de Mesa Ouro Champanhe',
    category: 'talher_garfo',
    collection: 'Ouro Imperial',
    description: 'Aço inoxidável 18/10 com revestimento PVD em Ouro Champanhe escovado.',
    material: 'Aço Inox 18/10 + PVD',
    color: 'Ouro Champanhe',
    pricePerDay: 5.50,
    dimensions: '21 cm',
    totalStock: 500,
    imageUrl: '/images/garfo-ouro.jpg',
    hexColor: '#c6a56a',
    recommendedWith: ['tl-ouro-faca-01', 'tl-ouro-colher-01']
  },
  {
    id: 'tl-titanio-garfo-02',
    name: 'Garfo de Mesa Titânio Black Satin',
    category: 'talher_garfo',
    collection: 'Design Minimalista',
    description: 'Acabamento acetinado negro de altíssima dureza e ergonomia balanceada.',
    material: 'Aço Inox 18/10 + Titânio',
    color: 'Preto Acetinado',
    pricePerDay: 5.50,
    dimensions: '21.5 cm',
    totalStock: 350,
    imageUrl: '/images/garfo-titanio.jpg',
    hexColor: '#1d1e22',
    recommendedWith: ['tl-titanio-faca-02', 'tl-titanio-colher-02']
  },

  // TALHERES - FACAS
  {
    id: 'tl-ouro-faca-01',
    name: 'Faca de Mesa Ouro Champanhe',
    category: 'talher_faca',
    collection: 'Ouro Imperial',
    description: 'Lâmina temperada com afiação de precisão e cabo ergonômico sólido.',
    material: 'Aço Inox 18/10 + PVD',
    color: 'Ouro Champanhe',
    pricePerDay: 5.50,
    dimensions: '23.5 cm',
    totalStock: 500,
    imageUrl: '/images/faca-ouro.jpg',
    hexColor: '#c6a56a'
  },
  {
    id: 'tl-titanio-faca-02',
    name: 'Faca de Mesa Titânio Black Satin',
    category: 'talher_faca',
    collection: 'Design Minimalista',
    description: 'Faca forjada em monobloco com revestimento fosco resistente a arranhões.',
    material: 'Aço Inox 18/10 + Titânio',
    color: 'Preto Acetinado',
    pricePerDay: 5.50,
    dimensions: '23.8 cm',
    totalStock: 350,
    imageUrl: '/images/faca-titanio.jpg',
    hexColor: '#1d1e22'
  },

  // TALHERES - COLHERES
  {
    id: 'tl-ouro-colher-01',
    name: 'Colher de Mesa Ouro Champanhe',
    category: 'talher_colher',
    collection: 'Ouro Imperial',
    description: 'Bojo arredondado perfeito e curvatura suave para alta gastronomia.',
    material: 'Aço Inox 18/10 + PVD',
    color: 'Ouro Champanhe',
    pricePerDay: 5.00,
    dimensions: '20.5 cm',
    totalStock: 500,
    imageUrl: '/images/colher-ouro.jpg',
    hexColor: '#c6a56a'
  },
  {
    id: 'tl-titanio-colher-02',
    name: 'Colher de Mesa Titânio Black Satin',
    category: 'talher_colher',
    collection: 'Design Minimalista',
    description: 'Geometria contemporânea com toque aveludado.',
    material: 'Aço Inox 18/10 + Titânio',
    color: 'Preto Acetinado',
    pricePerDay: 5.00,
    dimensions: '21 cm',
    totalStock: 350,
    imageUrl: '/images/colher-titanio.jpg',
    hexColor: '#1d1e22'
  },

  // TAÇAS
  {
    id: 'tc-baccarat-01',
    name: 'Taça de Água Cristal Sopro SOPHIA',
    category: 'taca',
    collection: 'Cristaleria Real',
    description: 'Cristal nobre sopra a boca sem chumbo com ressonância prolongada e transparência pura.',
    material: 'Cristal de Rocha Sopro',
    color: 'Cristal Transparente',
    pricePerDay: 12.00,
    dimensions: '580 ml - h 24 cm',
    totalStock: 400,
    imageUrl: '/images/taca-cristal.jpg',
    hexColor: '#eef2f5',
    badge: 'Cristal Nobre',
    recommendedWith: ['pr-alabastro-01', 'sp-nogueira-01']
  },
  {
    id: 'tc-fumee-02',
    name: 'Taça Vinho Nobre Fumée Slate',
    category: 'taca',
    collection: 'Cristaleria Real',
    description: 'Cristal soprado à mão com degradê fumê orgânico da haste à boca.',
    material: 'Cristal Soprado Fumê',
    color: 'Fumê Degradê',
    pricePerDay: 15.00,
    dimensions: '650 ml - h 25.5 cm',
    totalStock: 250,
    imageUrl: '/images/taca-fume.jpg',
    hexColor: '#7a7d85',
    recommendedWith: ['pr-nero-02', 'sp-latao-02']
  }
];
