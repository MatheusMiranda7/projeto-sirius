'use client';

import React from 'react';
import { Calendar, ShoppingBag, Sparkles, } from 'lucide-react';
import { ExperienceTheme } from '@/types/sirius';

interface HeaderProps {
  currentTheme: ExperienceTheme;
  onSelectTheme: (theme: ExperienceTheme) => void;
  selectedItemsCount: number;
  onOpenQuoteModal: () => void;
  onOpenDateModal: () => void;
  eventDatesLabel: string;
}

const THEMES: { id: ExperienceTheme; label: string }[] = [
  { id: 'minimalista', label: 'Minimalista' },
  { id: 'casamento', label: 'Casamento' },
  { id: 'contemporaneo', label: 'Contemporâneo' },
  { id: 'natal', label: 'Natal' },
  { id: 'restaurante', label: 'Restaurante' }
];

export function Header({
  currentTheme,
  onSelectTheme,
  selectedItemsCount,
  onOpenQuoteModal,
  onOpenDateModal,
  eventDatesLabel
}: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto glass-panel rounded-2xl px-6 py-3.5 flex items-center justify-between shadow-2xl">
        {/* LOGO SIRIUS */}
        <div className="flex items-center space-x-3 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-[#c6a56a]/20 border border-[#c6a56a]/40 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#c6a56a]" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#b7b7b2] block">Experiência Imersiva</span>
            <h1 className="text-lg font-bold tracking-tight text-[#f7f7f4]">PROJECT SIRIUS</h1>
          </div>
        </div>

        {/* NAVEGAÇÃO DE TEMAS / EXPERIÊNCIAS */}
        <nav className="hidden md:flex items-center space-x-1.5 bg-[#0b0b0d]/60 p-1.5 rounded-xl border border-white/5">
          {THEMES.map(theme => (
            <button
              key={theme.id}
              onClick={() => onSelectTheme(theme.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${currentTheme === theme.id
                  ? 'bg-[#c6a56a] text-black shadow-md font-semibold'
                  : 'text-[#b7b7b2] hover:text-white hover:bg-white/5'
                }`}
            >
              {theme.label}
            </button>
          ))}
        </nav>

        {/* AÇÕES DIREITAS: PERÍODO DO EVENTO & SOLICITAÇÃO DE ORÇAMENTO */}
        <div className="flex items-center space-x-3">
          {/* Seletor de Data */}
          <button
            onClick={onOpenDateModal}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-[#f7f7f4] transition"
            title="Selecionar Período do Evento para Checagem de Estoque"
          >
            <Calendar className="w-3.5 h-3.5 text-[#c6a56a]" />
            <span className="hidden sm:inline">{eventDatesLabel}</span>
          </button>

          {/* Botão de Solicitação de Orçamento */}
          <button
            onClick={onOpenQuoteModal}
            className="relative flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#c6a56a] hover:bg-[#d8c6a5] text-black font-semibold text-xs transition shadow-lg gold-glow"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orçamento</span>
            {selectedItemsCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-black text-[#c6a56a] text-[10px] font-bold">
                {selectedItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
