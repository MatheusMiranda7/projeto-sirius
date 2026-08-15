'use client';

import React, { useState } from 'react';
import { TableComposition, ProductCategory, Product, DateRange } from '@/types/sirius';
import { INITIAL_PRODUCTS } from '@/lib/catalogData';
import { checkProductAvailability } from '@/lib/reservationEngine';
import { Check, Sparkles, AlertCircle, Plus, RefreshCw } from 'lucide-react';

interface CompositionBuilderProps {
  composition: TableComposition;
  onUpdateComposition: (newComposition: TableComposition) => void;
  dateRange: DateRange;
}

const CATEGORY_TABS: { id: ProductCategory; label: string }[] = [
  { id: 'sousplat', label: 'Sousplat' },
  { id: 'prato_principal', label: 'Prato Principal' },
  { id: 'prato_sobremesa', label: 'Prato Sobremesa' },
  { id: 'guardanapo', label: 'Guardanapo' },
  { id: 'talher_garfo', label: 'Garfo' },
  { id: 'talher_faca', label: 'Faca' },
  { id: 'talher_colher', label: 'Colher' },
  { id: 'taca', label: 'Taça' }
];

export function CompositionBuilder({
  composition,
  onUpdateComposition,
  dateRange
}: CompositionBuilderProps) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('sousplat');

  // Filtra produtos da categoria ativa
  const categoryProducts = INITIAL_PRODUCTS.filter(p => p.category === activeCategory);

  // Mapeia a propriedade da composição baseada na categoria
  const getCompositionKey = (cat: ProductCategory): keyof TableComposition => {
    switch (cat) {
      case 'sousplat': return 'sousplat';
      case 'prato_principal': return 'pratoPrincipal';
      case 'prato_sobremesa': return 'pratoSobremesa';
      case 'guardanapo': return 'guardanapo';
      case 'talher_garfo': return 'talherGarfo';
      case 'talher_faca': return 'talherFaca';
      case 'talher_colher': return 'talherColher';
      case 'taca': return 'taca';
    }
  };

  const currentSelectedProduct = composition[getCompositionKey(activeCategory)];

  const handleSelectProduct = (product: Product) => {
    const key = getCompositionKey(activeCategory);
    onUpdateComposition({
      ...composition,
      [key]: currentSelectedProduct?.id === product.id ? undefined : product
    });
  };

  const handleClearComposition = () => {
    onUpdateComposition({});
  };

  return (
    <div className="w-full glass-panel rounded-3xl p-6 border border-white/10 space-y-6">
      {/* TÍTULO E AÇÃO DE LIMPAR */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#c6a56a] font-semibold">Configurador Personalizado</span>
          <h2 className="text-xl font-bold text-[#f7f7f4]">Montagem da Mesa Posta</h2>
        </div>
        <button
          onClick={handleClearComposition}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-[#b7b7b2] transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reiniciar</span>
        </button>
      </div>

      {/* TABS DE CATEGORIAS */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORY_TABS.map(tab => {
          const key = getCompositionKey(tab.id);
          const isSelected = Boolean(composition[key]);
          const isActive = activeCategory === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-medium flex items-center space-x-2 transition-all ${
                isActive
                  ? 'bg-[#c6a56a] text-black font-semibold shadow-md'
                  : isSelected
                  ? 'bg-white/15 text-white border border-[#c6a56a]/40'
                  : 'bg-white/5 text-[#b7b7b2] hover:bg-white/10'
              }`}
            >
              <span>{tab.label}</span>
              {isSelected && !isActive && <Check className="w-3 h-3 text-[#c6a56a]" />}
            </button>
          );
        })}
      </div>

      {/* GRID DE PRODUTOS DA CATEGORIA SELECIONADA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categoryProducts.map(product => {
          const isSelected = currentSelectedProduct?.id === product.id;
          const availability = checkProductAvailability(
            product,
            dateRange.startDate,
            dateRange.endDate,
            1
          );

          return (
            <div
              key={product.id}
              onClick={() => availability.isAvailable && handleSelectProduct(product)}
              className={`relative rounded-2xl p-4 transition-all duration-300 cursor-pointer border ${
                isSelected
                  ? 'bg-[#1a1b1f] border-[#c6a56a] gold-glow'
                  : 'bg-[#111214]/80 border-white/5 hover:border-white/20'
              } ${!availability.isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {/* COR DE DESTAQUE / INDICADOR */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-4 h-4 rounded-full border border-white/20"
                    style={{ backgroundColor: product.hexColor }}
                  />
                  <span className="text-[11px] text-[#b7b7b2]">{product.material}</span>
                </div>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-[#c6a56a] text-black flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </div>

              {/* DETALHES DO PRODUTO */}
              <h3 className="text-sm font-semibold text-[#f7f7f4] mb-1">{product.name}</h3>
              <p className="text-xs text-[#b7b7b2] line-clamp-2 mb-3">{product.description}</p>

              {/* PREÇO E DISPONIBILIDADE */}
              <div className="flex items-center justify-between text-xs pt-2 border-t border-white/5">
                <span className="font-semibold text-[#c6a56a]">
                  R$ {product.pricePerDay.toFixed(2)} <span className="text-[10px] text-[#b7b7b2] font-normal">/ dia</span>
                </span>

                {availability.isAvailable ? (
                  <span className="text-[10px] text-[#607d5b] bg-[#607d5b]/10 px-2 py-0.5 rounded-full border border-[#607d5b]/20">
                    {availability.availableQuantity} disps.
                  </span>
                ) : (
                  <span className="text-[10px] text-[#a94442] bg-[#a94442]/10 px-2 py-0.5 rounded-full border border-[#a94442]/20 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3 inline" />
                    <span>Indisponível</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
