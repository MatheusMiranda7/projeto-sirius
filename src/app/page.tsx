'use client';

import React, { useState } from 'react';
import { ExperienceTheme, TableComposition, DateRange } from '@/types/sirius';
import { THEME_PRESETS, getRuleBasedRecommendations } from '@/lib/recommendationEngine';
import { Header } from '@/components/ui/Header';
import { TableSceneCanvas } from '@/components/3d/TableSceneCanvas';
import { CompositionBuilder } from '@/components/composition/CompositionBuilder';
import { ProductCatalog } from '@/components/catalog/ProductCatalog';
import { QuoteModal } from '@/components/quote/QuoteModal';
import { Sparkles, ArrowRight, ShieldCheck, MessageCircle, Calendar } from 'lucide-react';

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState<ExperienceTheme>('minimalista');
  const [composition, setComposition] = useState<TableComposition>(THEME_PRESETS.minimalista.composition);

  // Período do evento padrão (próximos 30 dias por padrão)
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0], // daqui 7 dias
    endDate: new Date(Date.now() + 86400000 * 9).toISOString().split('T')[0]   // daqui 9 dias
  });

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const selectedThemePreset = THEME_PRESETS[currentTheme];
  const selectedItemsCount = Object.values(composition).filter(Boolean).length;
  const recommendations = getRuleBasedRecommendations(composition);

  const handleSelectTheme = (theme: ExperienceTheme) => {
    setCurrentTheme(theme);
    setComposition(THEME_PRESETS[theme].composition);
  };

  return (
    <main className="min-h-screen bg-[#0b0b0d] text-[#f7f7f4] selection:bg-[#c6a56a]/30">
      {/* HEADER FIXO */}
      <Header
        currentTheme={currentTheme}
        onSelectTheme={handleSelectTheme}
        selectedItemsCount={selectedItemsCount}
        onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        onOpenDateModal={() => setIsQuoteModalOpen(true)}
        eventDatesLabel={`${dateRange.startDate.split('-').reverse().join('/')} até ${dateRange.endDate.split('-').reverse().join('/')}`}
      />

      {/* HERO SECTION CINEMATOGRÁFICA & CANVAS 3D */}
      <section className="relative pt-28 pb-12 px-6 overflow-hidden">
        {/* LUZ RADIAL CINEMÁTICA DE FUNDO */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-radial from-[#c6a56a]/15 via-transparent to-transparent pointer-events-none blur-3xl opacity-60" />

        <div className="max-w-7xl mx-auto space-y-8">
          {/* MENSAGEM NARRATIVA DO SCRIPT DE EXPERIÊNCIA */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-[0.4em] text-[#c6a56a] font-semibold block">
              {selectedThemePreset.subtitle}
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#f7f7f4]">
              {selectedThemePreset.title}
            </h1>

            <p className="text-sm sm:text-base text-[#b7b7b2] leading-relaxed max-w-xl mx-auto">
              {selectedThemePreset.description}
            </p>
          </div>

          {/* VIEWPORT 3D INTERATIVA (THREE.JS / REACT THREE FIBER) */}
          <div className="relative w-full h-[500px] sm:h-[600px] rounded-3xl glass-panel-gold p-2 shadow-2xl gold-glow border border-[#c6a56a]/30">
            <TableSceneCanvas
              composition={composition}
              lightIntensity={selectedThemePreset.lightIntensity}
              interactive={true}
            />

            {/* BARRA INFORMATIVA FLUTUANTE INFERIOR */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-white/10 pointer-events-auto">
              <div className="flex items-center space-x-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#c6a56a] animate-pulse" />
                <span className="text-xs text-[#b7b7b2]">
                  Experiência 3D Interativa • Use o mouse ou touch para rotacionar
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-[#c6a56a] hover:bg-[#d8c6a5] text-black text-xs font-bold transition flex items-center space-x-2 shadow-lg"
                >
                  <span>Solicitar Orçamento Desta Mesa</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: CONFIGURADOR DE COMPOSIÇÃO DE MESA */}
      <section className="py-12 px-6 max-w-7xl mx-auto space-y-8">
        <CompositionBuilder
          composition={composition}
          onUpdateComposition={setComposition}
          dateRange={dateRange}
        />

        {/* BARRA DE RECOMENDAÇÕES BASEADA EM REGRAS (SEM IA EM PROD) */}
        {recommendations.length > 0 && (
          <div className="glass-panel rounded-3xl p-6 border border-[#c6a56a]/20 space-y-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#c6a56a]" />
              <h3 className="text-sm font-semibold text-[#f7f7f4]">
                Combinações Harmoniosas Recomendadas
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {recommendations.slice(0, 4).map(rec => (
                <div key={rec.id} className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs flex justify-between items-center">
                  <div>
                    <span className="font-medium text-[#f7f7f4] block truncate">{rec.name}</span>
                    <span className="text-[10px] text-[#c6a56a]">{rec.material}</span>
                  </div>
                  <span className="text-xs font-bold text-[#c6a56a]">R$ {rec.pricePerDay.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* SEÇÃO 3: CATÁLOGO DE LOUÇAS & UTENSÍLIOS */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <ProductCatalog
          composition={composition}
          onUpdateComposition={setComposition}
          dateRange={dateRange}
        />
      </section>

      {/* FOOTER CINEMATOGRÁFICO DE LUXO */}
      <footer className="mt-20 py-16 px-6 border-t border-white/10 bg-[#070708]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-2">
            <h2 className="text-xl font-bold tracking-tight text-[#f7f7f4]">PROJECT SIRIUS</h2>
            <p className="text-xs text-[#b7b7b2] max-w-md">
              Nós não vendemos pratos. Nós vendemos momentos, encontros, celebrações e memórias inesquecíveis.
            </p>
          </div>

          <div className="flex items-center space-x-6 text-xs text-[#b7b7b2]">
            <span>© 2026 Project Sirius. Todos os direitos reservados.</span>
          </div>
        </div>
      </footer>

      {/* MODAL DE ORÇAMENTO WHATSAPP */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        composition={composition}
        dateRange={dateRange}
        onUpdateDateRange={setDateRange}
      />
    </main>
  );
}