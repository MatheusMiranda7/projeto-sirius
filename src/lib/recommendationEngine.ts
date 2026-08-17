import {
  ExperienceTheme,
  TableComposition,
  Product,
} from '@/types/sirius';

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

export function getProductById(
  id: string
): Product | undefined {
  return INITIAL_PRODUCTS.find(
    (product) => product.id === id
  );
}

export const THEME_PRESETS: Record<
  ExperienceTheme,
  ThemePreset
> = {
  minimalista: {
    id: 'minimalista',
    title: 'Minimalismo Essencial',
    subtitle:
      'Pureza das formas e serenidade visual',
    description:
      'Composição focada na textura orgânica da porcelana Alabastro e linho belga cru, harmonizada com madeira nogueira nobre.',
    bgGradient:
      'from-zinc-950 via-zinc-900 to-black',
    lightIntensity: 1.2,
    composition: {
      sousplat:
        getProductById(
          'sp-nogueira-01'
        ),
      pratoPrincipal:
        getProductById(
          'pr-alabastro-01'
        ),
      pratoSobremesa:
        getProductById(
          'pr-sob-alabastro-01'
        ),
      guardanapo:
        getProductById(
          'gd-linho-cru-01'
        ),
      talherGarfo:
        getProductById(
          'tl-titanio-garfo-02'
        ),
      talherFaca:
        getProductById(
          'tl-titanio-faca-02'
        ),
      taca:
        getProductById(
          'tc-baccarat-01'
        ),
    },
  },

  casamento: {
    id: 'casamento',
    title: 'Celebração Imperial',
    subtitle:
      'Brilho discreto do latão com nobreza do cristal',
    description:
      'Elegância atemporal com detalhes em Ouro Champanhe e toques de cristal de rocha soprado.',
    bgGradient:
      'from-stone-950 via-amber-950/20 to-black',
    lightIntensity: 1.6,
    composition: {
      sousplat:
        getProductById(
          'sp-latao-02'
        ),
      pratoPrincipal:
        getProductById(
          'pr-alabastro-01'
        ),
      pratoSobremesa:
        getProductById(
          'pr-sob-alabastro-01'
        ),
      guardanapo:
        getProductById(
          'gd-linho-cru-01'
        ),
      talherGarfo:
        getProductById(
          'tl-ouro-garfo-01'
        ),
      talherFaca:
        getProductById(
          'tl-ouro-faca-01'
        ),
      talherColher:
        getProductById(
          'tl-ouro-colher-01'
        ),
      taca:
        getProductById(
          'tc-baccarat-01'
        ),
    },
  },

  contemporaneo: {
    id: 'contemporaneo',
    title: 'Noite Marquis',
    subtitle:
      'Contraste dramático e sofisticação urbana',
    description:
      'Cerâmica vulcânica preta combinada com titânio escuro e cristal fumê degradê.',
    bgGradient:
      'from-neutral-950 via-zinc-900 to-black',
    lightIntensity: 1.0,
    composition: {
      sousplat:
        getProductById(
          'sp-pedra-03'
        ),
      pratoPrincipal:
        getProductById(
          'pr-nero-02'
        ),
      pratoSobremesa:
        getProductById(
          'pr-sob-nero-02'
        ),
      guardanapo:
        getProductById(
          'gd-linho-grafite-02'
        ),
      talherGarfo:
        getProductById(
          'tl-titanio-garfo-02'
        ),
      talherFaca:
        getProductById(
          'tl-titanio-faca-02'
        ),
      taca:
        getProductById(
          'tc-fumee-02'
        ),
    },
  },

  natal: {
    id: 'natal',
    title: 'Gala Festiva',
    subtitle:
      'Acolhimento aquecido e memórias inesquecíveis',
    description:
      'Combinação aquecida de madeira nobre, metais nobres e atmosfera intimista.',
    bgGradient:
      'from-red-950/20 via-zinc-950 to-black',
    lightIntensity: 1.4,
    composition: {
      sousplat:
        getProductById(
          'sp-nogueira-01'
        ),
      pratoPrincipal:
        getProductById(
          'pr-alabastro-01'
        ),
      pratoSobremesa:
        getProductById(
          'pr-sob-alabastro-01'
        ),
      guardanapo:
        getProductById(
          'gd-linho-cru-01'
        ),
      talherGarfo:
        getProductById(
          'tl-ouro-garfo-01'
        ),
      talherFaca:
        getProductById(
          'tl-ouro-faca-01'
        ),
      taca:
        getProductById(
          'tc-baccarat-01'
        ),
    },
  },

  restaurante: {
    id: 'restaurante',
    title: 'Alta Gastronomia',
    subtitle:
      'Precisão técnica e destaque total às criações culinárias',
    description:
      'Vitrines neutras com alto contraste tátil desenvolvidas para restaurantes e eventos de haute cuisine.',
    bgGradient:
      'from-slate-950 via-zinc-950 to-black',
    lightIntensity: 1.5,
    composition: {
      sousplat:
        getProductById(
          'sp-latao-02'
        ),
      pratoPrincipal:
        getProductById(
          'pr-nero-02'
        ),
      guardanapo:
        getProductById(
          'gd-linho-grafite-02'
        ),
      talherGarfo:
        getProductById(
          'tl-ouro-garfo-01'
        ),
      talherFaca:
        getProductById(
          'tl-ouro-faca-01'
        ),
      taca:
        getProductById(
          'tc-fumee-02'
        ),
    },
  },
};

/**
 * Motor de recomendação da composição atual.
 *
 * Usa os relacionamentos `recommendedWith`
 * cadastrados nos próprios produtos.
 */
export function getRuleBasedRecommendations(
  currentComposition: TableComposition
): Product[] {
  const selectedProducts =
    Object.values(
      currentComposition
    ).filter(
      (
        product
      ): product is Product =>
        Boolean(product)
    );

  if (
    selectedProducts.length === 0
  ) {
    return INITIAL_PRODUCTS.slice(
      0,
      4
    );
  }

  const recommendedIds =
    new Set<string>();

  selectedProducts.forEach(
    (product) => {
      product.recommendedWith?.forEach(
        (id) =>
          recommendedIds.add(id)
      );
    }
  );

  const recommendations =
    INITIAL_PRODUCTS.filter(
      (product) =>
        recommendedIds.has(
          product.id
        ) &&
        !selectedProducts.some(
          (selected) =>
            selected.id ===
            product.id
        )
    );

  return recommendations.length > 0
    ? recommendations
    : INITIAL_PRODUCTS.filter(
      (product) =>
        !selectedProducts.some(
          (selected) =>
            selected.id ===
            product.id
        )
    ).slice(0, 4);
}

/**
 * Curadoria inteligente de um produto específico.
 *
 * Calcula um score com base em:
 * - categoria complementar;
 * - coleção;
 * - material;
 * - cor;
 * - composição atual.
 *
 * Continua sendo 100% determinístico
 * e sem custo de API.
 */
export function getProductRecommendations(
  referenceProduct: Product,
  products: Product[],
  composition: TableComposition,
  limit = 4
): Product[] {
  const compositionIds =
    new Set(
      Object.values(
        composition
      )
        .filter(
          (
            product
          ): product is Product =>
            Boolean(product)
        )
        .map(
          (product) =>
            product.id
        )
    );

  return products
    .filter(
      (product) =>
        product.id !==
        referenceProduct.id
    )
    .map((product) => {
      let score = 0;

      /*
       * Categoria complementar.
       *
       * Exemplo:
       * ao abrir um prato,
       * sousplat, talher e taça
       * recebem preferência.
       */
      if (
        product.category !==
        referenceProduct.category
      ) {
        score += 35;
      } else {
        score -= 20;
      }

      /*
       * Mesma coleção.
       */
      if (
        product.collection ===
        referenceProduct.collection
      ) {
        score += 40;
      }

      /*
       * Mesmo material.
       */
      if (
        product.material ===
        referenceProduct.material
      ) {
        score += 15;
      }

      /*
       * Mesma paleta.
       */
      if (
        product.hexColor ===
        referenceProduct.hexColor
      ) {
        score += 12;
      }

      /*
       * Produto já presente
       * na composição visual.
       */
      if (
        compositionIds.has(
          product.id
        )
      ) {
        score += 20;
      }

      /*
       * Relacionamento explícito
       * cadastrado no catálogo.
       *
       * Este deve receber peso alto,
       * porque representa uma curadoria
       * previamente definida.
       */
      if (
        referenceProduct
          .recommendedWith
          ?.includes(product.id)
      ) {
        score += 50;
      }

      /*
       * Relação inversa.
       */
      if (
        product.recommendedWith
          ?.includes(
            referenceProduct.id
          )
      ) {
        score += 25;
      }

      return {
        product,
        score,
      };
    })
    .sort(
      (a, b) =>
        b.score - a.score
    )
    .slice(0, limit)
    .map(
      ({ product }) =>
        product
    );
}
