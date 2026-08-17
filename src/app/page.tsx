'use client';

import React, { useState } from 'react';

import {
  ExperienceTheme,
  TableComposition,
  DateRange,
  Product,
  CuratedItem,
} from '@/types/sirius';

import {
  THEME_PRESETS,
  getRuleBasedRecommendations,
} from '@/lib/recommendationEngine';

import { CinematicHero } from '@/components/ui/CinematicHero';
import { Header } from '@/components/ui/Header';

import { CompositionBuilder } from '@/components/composition/CompositionBuilder';

import { ProductCatalog } from '@/components/catalog/ProductCatalog';
import { ProductDetailModal } from '@/components/catalog/ProductDetailModal';

import { CurationDrawer } from '@/components/curation/CurationDrawer';

import { QuoteModal } from '@/components/quote/QuoteModal';

import { Sparkles } from 'lucide-react';

function createDefaultDateRange(): DateRange {
  const now = new Date();

  const start = new Date(now);
  start.setDate(start.getDate() + 7);

  const end = new Date(now);
  end.setDate(end.getDate() + 9);

  return {
    startDate: start
      .toISOString()
      .split('T')[0],

    endDate: end
      .toISOString()
      .split('T')[0],
  };
}

const DEFAULT_DATE_RANGE =
  createDefaultDateRange();

export default function Home() {
  /*
   * TEMA / COMPOSIÇÃO VISUAL
   */
  const [currentTheme, setCurrentTheme] =
    useState<ExperienceTheme>(
      'minimalista'
    );

  const [composition, setComposition] =
    useState<TableComposition>(
      THEME_PRESETS.minimalista.composition
    );

  /*
   * DATAS
   */
  const [dateRange, setDateRange] =
    useState<DateRange>(
      DEFAULT_DATE_RANGE
    );

  /*
   * MODAL LEGADO DE ORÇAMENTO
   *
   * Mantemos por enquanto para não destruir
   * funcionalidades existentes.
   */
  const [
    isQuoteModalOpen,
    setIsQuoteModalOpen,
  ] = useState(false);

  /*
   * DETALHE DO PRODUTO
   */
  const [
    selectedProduct,
    setSelectedProduct,
  ] = useState<Product | null>(null);

  /*
   * CURADORIA SIRIUS
   */
  const [curation, setCuration] =
    useState<CuratedItem[]>([]);

  const [
    isCurationOpen,
    setIsCurationOpen,
  ] = useState(false);

  /*
   * DADOS DERIVADOS
   */
  const selectedItemsCount =
    Object.values(composition).filter(
      Boolean
    ).length;

  const recommendations =
    getRuleBasedRecommendations(
      composition
    );

  /*
   * ALTERAÇÃO DE TEMA
   */
  const handleSelectTheme = (
    theme: ExperienceTheme
  ) => {
    setCurrentTheme(theme);

    setComposition(
      THEME_PRESETS[theme].composition
    );
  };

  /*
   * ADICIONAR À CURADORIA
   */
  const handleAddToCuration = (
    product: Product,
    quantity: number
  ) => {
    setCuration((current) => {
      const existing =
        current.find(
          (item) =>
            item.product.id ===
            product.id
        );

      if (existing) {
        return current.map(
          (item) =>
            item.product.id ===
              product.id
              ? {
                ...item,

                quantity: Math.min(
                  item.quantity +
                  quantity,

                  Math.max(
                    1,
                    product.totalStock
                  )
                ),
              }
              : item
        );
      }

      return [
        ...current,
        {
          product,
          quantity: Math.min(
            quantity,
            Math.max(
              1,
              product.totalStock
            )
          ),
        },
      ];
    });

    setSelectedProduct(null);
    setIsCurationOpen(true);
  };

  /*
   * ALTERAR QUANTIDADE
   */
  const handleUpdateCurationQuantity = (
    productId: string,
    quantity: number
  ) => {
    setCuration((current) =>
      current.map((item) =>
        item.product.id === productId
          ? {
            ...item,
            quantity,
          }
          : item
      )
    );
  };

  /*
   * REMOVER DA CURADORIA
   */
  const handleRemoveFromCuration = (
    productId: string
  ) => {
    setCuration((current) =>
      current.filter(
        (item) =>
          item.product.id !==
          productId
      )
    );
  };

  /*
   * TOTAL DE UNIDADES SELECIONADAS
   *
   * Ex.:
   * 20 pratos + 20 taças = 40
   */
  const curationUnits =
    curation.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  return (
    <main className="min-h-screen bg-[#0b0b0d] text-[#f7f7f4] selection:bg-[#c6a56a]/30">
      {/*
       * HEADER
       *
       * Continua escondido durante o MVP
       * cinematográfico.
       */}
      <div className="hidden">
        <Header
          currentTheme={currentTheme}
          onSelectTheme={
            handleSelectTheme
          }
          selectedItemsCount={
            selectedItemsCount
          }
          onOpenQuoteModal={() =>
            setIsQuoteModalOpen(true)
          }
          onOpenDateModal={() =>
            setIsQuoteModalOpen(true)
          }
          eventDatesLabel={`${dateRange.startDate
            .split('-')
            .reverse()
            .join('/')} até ${dateRange.endDate
              .split('-')
              .reverse()
              .join('/')}`}
        />
      </div>

      {/* EXPERIÊNCIA CINEMATOGRÁFICA */}
      <CinematicHero />

      {/* COMPOSIÇÃO */}
      <section
        id="configurador"
        className="mx-auto max-w-7xl space-y-8 px-6 py-12"
      >
        <div className="pb-16 pt-16 text-center sm:pb-24 sm:pt-24">
          <span className="text-[10px] uppercase tracking-[0.45em] text-[#c6a56a] sm:text-xs">
            Sua experiência
          </span>

          <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-light tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
            Agora, componha a sua mesa.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
            Escolha cada elemento e
            transforme uma composição em
            algo único.
          </p>
        </div>

        <CompositionBuilder
          composition={composition}
          onUpdateComposition={
            setComposition
          }
          dateRange={dateRange}
        />

        {/* RECOMENDAÇÕES DA COMPOSIÇÃO */}
        {recommendations.length > 0 && (
          <div className="glass-panel space-y-4 rounded-3xl border border-[#c6a56a]/20 p-6">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-[#c6a56a]" />

              <h3 className="text-sm font-semibold text-[#f7f7f4]">
                Combinações Harmoniosas
                Recomendadas
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
              {recommendations
                .slice(0, 4)
                .map((rec) => (
                  <button
                    key={rec.id}
                    type="button"
                    onClick={() =>
                      setSelectedProduct(rec)
                    }
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-3 text-left text-xs transition hover:border-[#c6a56a]/30 hover:bg-white/10"
                  >
                    <div className="min-w-0">
                      <span className="block truncate font-medium text-[#f7f7f4]">
                        {rec.name}
                      </span>

                      <span className="text-[10px] text-[#c6a56a]">
                        {rec.material}
                      </span>
                    </div>

                    <span className="ml-3 shrink-0 text-xs font-bold text-[#c6a56a]">
                      R${' '}
                      {rec.pricePerDay.toFixed(
                        2
                      )}
                    </span>
                  </button>
                ))}
            </div>
          </div>
        )}
      </section>

      {/* CATÁLOGO */}
      <section
        id="catalogo"
        className="mx-auto max-w-7xl px-6 py-12"
      >
        <ProductCatalog
          composition={composition}
          onUpdateComposition={
            setComposition
          }
          onOpenProduct={
            setSelectedProduct
          }
        />
      </section>

      {/* FOOTER */}
      <footer className="mt-20 border-t border-white/10 bg-[#070708] px-6 py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
          <div className="space-y-2">
            <h2 className="text-xl font-bold tracking-tight text-[#f7f7f4]">
              PROJECT SIRIUS
            </h2>

            <p className="max-w-md text-xs text-[#b7b7b2]">
              Nós não vendemos pratos. Nós
              vendemos momentos, encontros,
              celebrações e memórias
              inesquecíveis.
            </p>
          </div>

          <span className="text-xs text-[#b7b7b2]">
            © 2026 Project Sirius. Todos os
            direitos reservados.
          </span>
        </div>
      </footer>

      {/* BOTÃO FLUTUANTE DA CURADORIA */}
      {curation.length > 0 && (
        <button
          type="button"
          onClick={() =>
            setIsCurationOpen(true)
          }
          className="fixed bottom-5 right-5 z-[100] flex items-center gap-3 rounded-full border border-white/15 bg-[#c6a56a] px-5 py-3 text-sm font-semibold text-black shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition hover:scale-[1.02] sm:bottom-8 sm:right-8 sm:px-6"
        >
          <span>
            Minha Curadoria
          </span>

          <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-black px-1.5 text-[11px] text-white">
            {curationUnits}
          </span>
        </button>
      )}

      {/* DETALHE DO PRODUTO */}
      <ProductDetailModal
        key={selectedProduct?.id ?? 'closed'}
        product={selectedProduct}
        composition={composition}
        onClose={() =>
          setSelectedProduct(null)
        }
        onAddToCuration={
          handleAddToCuration
        }
        onSelectProduct={
          setSelectedProduct
        }
      />

      {/* CURADORIA */}
      <CurationDrawer
        isOpen={isCurationOpen}
        items={curation}
        dateRange={dateRange}
        onClose={() =>
          setIsCurationOpen(false)
        }
        onUpdateQuantity={
          handleUpdateCurationQuantity
        }
        onRemove={
          handleRemoveFromCuration
        }
        onRequestAvailability={() => {
          setIsCurationOpen(false);
          setIsQuoteModalOpen(true);
        }}
      />

      {/* MODAL ANTIGO — PRESERVADO */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() =>
          setIsQuoteModalOpen(false)
        }
        items={curation}
        dateRange={dateRange}
        onUpdateDateRange={setDateRange}
      />
    </main>
  );
}