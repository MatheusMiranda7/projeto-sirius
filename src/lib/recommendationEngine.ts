import { ExperienceTheme, TableComposition, Product } from '@/types/sirius';
import { INITIAL_PRODUCTS } from './catalogData';

export interface ThemePreset {
  id: ExperienceTheme;
  title: string;
  subtitle: string;
  description: string;
  bgGradient: string;
  lightIntensity: number;
  composition: TableComposition;
}

export function getProductById(id: string): Product | undefined {
  return INITIAL_PRODUCTS.find(p => p.id === id);
}

export const THEME_PRESETS: Record<ExperienceTheme, ThemePreset> = {
  minimalista: {
    id: 'minimalista',
    title: 'Minimalismo Essencial',
    subtitle: 'Pureza das formas e serenidade visual',
    description: 'Composição focada na textura orgânica da porcelana Alabastro e linho belga cru, harmonizada com madeira nogueira nobre.',
    bgGradient: 'from-zinc-950 via-zinc-900 to-black',
    lightIntensity: 1.2,
    composition: {
      sousplat: getProductById('sp-nogueira-01'),
      pratoPrincipal: getProductById('pr-alabastro-01'),
      pratoSobremesa: getProductById('pr-sob-alabastro-01'),
      guardanapo: getProductById('gd-linho-cru-01'),
      talherGarfo: getProductById('tl-titanio-garfo-02'),
      talherFaca: getProductById('tl-titanio-faca-02'),
      taca: getProductById('tc-baccarat-01')
    }
  },
  casamento: {
    id: 'casamento',
    title: 'Celebração Imperial',
    subtitle: 'Brilho discreto do latão com nobreza do cristal',
    description: 'Elegância atemporal com detalhes em Ouro Champanhe e toques de cristal de rocha soprado.',
    bgGradient: 'from-stone-950 via-amber-950/20 to-black',
    lightIntensity: 1.6,
    composition: {
      sousplat: getProductById('sp-latao-02'),
      pratoPrincipal: getProductById('pr-alabastro-01'),
      pratoSobremesa: getProductById('pr-sob-alabastro-01'),
      guardanapo: getProductById('gd-linho-cru-01'),
      talherGarfo: getProductById('tl-ouro-garfo-01'),
      talherFaca: getProductById('tl-ouro-faca-01'),
      talherColher: getProductById('tl-ouro-colher-01'),
      taca: getProductById('tc-baccarat-01')
    }
  },
  contemporaneo: {
    id: 'contemporaneo',
    title: 'Noite Marquis',
    subtitle: 'Contraste dramático e sofisticação urbana',
    description: 'Cerâmica vulcânica preta combinada com titânio escuro e cristal fumê degradê.',
    bgGradient: 'from-neutral-950 via-zinc-900 to-black',
    lightIntensity: 1.0,
    composition: {
      sousplat: getProductById('sp-pedra-03'),
      pratoPrincipal: getProductById('pr-nero-02'),
      pratoSobremesa: getProductById('pr-sob-nero-02'),
      guardanapo: getProductById('gd-linho-grafite-02'),
      talherGarfo: getProductById('tl-titanio-garfo-02'),
      talherFaca: getProductById('tl-titanio-faca-02'),
      taca: getProductById('tc-fumee-02')
    }
  },
  natal: {
    id: 'natal',
    title: 'Gala Festiva',
    subtitle: 'Acolhimento aquecido e memórias inesquecíveis',
    description: 'Combinação aquecida de madeira nobre, metais nobres e atmosfera intimista.',
    bgGradient: 'from-red-950/20 via-zinc-950 to-black',
    lightIntensity: 1.4,
    composition: {
      sousplat: getProductById('sp-nogueira-01'),
      pratoPrincipal: getProductById('pr-alabastro-01'),
      pratoSobremesa: getProductById('pr-sob-alabastro-01'),
      guardanapo: getProductById('gd-linho-cru-01'),
      talherGarfo: getProductById('tl-ouro-garfo-01'),
      talherFaca: getProductById('tl-ouro-faca-01'),
      taca: getProductById('tc-baccarat-01')
    }
  },
  restaurante: {
    id: 'restaurante',
    title: 'Alta Gastronomia',
    subtitle: 'Precisão técnica e destaque total às criações culinárias',
    description: 'Vitrines neutras com alto contraste tátil desenvolvidas para restaurantes e eventos de haute cuisine.',
    bgGradient: 'from-slate-950 via-zinc-950 to-black',
    lightIntensity: 1.5,
    composition: {
      sousplat: getProductById('sp-latao-02'),
      pratoPrincipal: getProductById('pr-nero-02'),
      guardanapo: getProductById('gd-linho-grafite-02'),
      talherGarfo: getProductById('tl-ouro-garfo-01'),
      talherFaca: getProductById('tl-ouro-faca-01'),
      taca: getProductById('tc-fumee-02')
    }
  }
};

/**
 * Motor de Recomendação Baseado em Regras:
 * Sugere itens harmoniosos para preencher posições vazias na composição.
 */
export function getRuleBasedRecommendations(currentComposition: TableComposition): Product[] {
  const selectedProducts = Object.values(currentComposition).filter((p): p is Product => Boolean(p));
  
  if (selectedProducts.length === 0) {
    return INITIAL_PRODUCTS.slice(0, 4);
  }

  const recommendedIds = new Set<string>();
  selectedProducts.forEach(p => {
    p.recommendedWith?.forEach(id => recommendedIds.add(id));
  });

  const recommendations = INITIAL_PRODUCTS.filter(p => 
    recommendedIds.has(p.id) && !selectedProducts.some(selected => selected.id === p.id)
  );

  return recommendations.length > 0 ? recommendations : INITIAL_PRODUCTS.slice(0, 4);
}
