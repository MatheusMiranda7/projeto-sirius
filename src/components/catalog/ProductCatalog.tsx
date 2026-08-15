'use client';

import React, { useState } from 'react';
import { Product, TableComposition, DateRange } from '@/types/sirius';
import { INITIAL_PRODUCTS } from '@/lib/catalogData';
import { checkProductAvailability } from '@/lib/reservationEngine';
import { Plus, Check, Filter, Sparkles, Package } from 'lucide-react';

interface ProductCatalogProps {
  composition: TableComposition;
  onUpdateComposition: (newComposition: TableComposition) => void;
  dateRange: DateRange;
}

export function ProductCatalog({
  composition,
  onUpdateComposition,
  dateRange
}: ProductCatalogProps) {
  const [selectedCollection, setSelectedCollection] = useState<string>('Todas');

  const collections = ['Todas', 'Orgânica', 'Metalurgia Fina', 'Raízes', 'Noturna', 'Textura Natural', 'Ouro Imperial', 'Cristaleria Real'];

  const filteredProducts = selectedCollection === 'Todas'
    ? INITIAL_PRODUCTS
    : INITIAL_PRODUCTS.filter(p => p.collection === selectedCollection);

  const isProductInComposition = (product: Product): boolean => {
    return Object.values(composition).some(p => p?.id === product.id);
  };

  const toggleProductInComposition = (product: Product) => {
    const keyMap: Record<string, keyof TableComposition> = {
      sousplat: 'sousplat',
      prato_principal: 'pratoPrincipal',
      prato_sobremesa: 'pratoSobremesa',
      guardanapo: 'guardanapo',
      talher_garfo: 'talherGarfo',
      talher_faca: 'talherFaca',
      talher_colher: 'talherColher',
      taca: 'taca'
    };

    const compKey = keyMap[product.category];
    if (!compKey) return;

    if (composition[compKey]?.id === product.id) {
      // Remove
      onUpdateComposition({ ...composition, [compKey]: undefined });
    } else {
      // Adiciona / Substitui
      onUpdateComposition({ ...composition, [compKey]: product });
    }
  };

  return (
    <section className="w-full space-y-6 pt-6">
      {/* CABEÇALHO DO CATÁLOGO */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#c6a56a] font-semibold">Catálogo Exclusivo V1</span>
          <h2 className="text-2xl font-bold text-[#f7f7f4]">Acervo de Louças & Utensílios</h2>
        </div>

        {/* FILTRO DE COLEÇÕES */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="w-4 h-4 text-[#c6a56a] shrink-0 mr-1" />
          {collections.map(col => (
            <button
              key={col}
              onClick={() => setSelectedCollection(col)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCollection === col
                  ? 'bg-[#c6a56a] text-black font-bold'
                  : 'bg-white/5 text-[#b7b7b2] hover:bg-white/10'
              }`}
            >
              {col}
            </button>
          ))}
        </div>
      </div>

      {/* GRID DE CARDS DO CATÁLOGO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredProducts.map(product => {
          const inComp = isProductInComposition(product);
          const availability = checkProductAvailability(
            product,
            dateRange.startDate,
            dateRange.endDate,
            1
          );

          return (
            <div
              key={product.id}
              className={`group glass-panel rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between ${
                inComp
                  ? 'border-[#c6a56a] gold-glow bg-[#1a1b1f]'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div>
                {/* BADGE E COR */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 text-[#c6a56a] border border-[#c6a56a]/20">
                    {product.collection}
                  </span>
                  <div
                    className="w-4 h-4 rounded-full border border-white/30"
                    style={{ backgroundColor: product.hexColor }}
                    title={product.color}
                  />
                </div>

                {/* NOME E DESCRIÇÃO */}
                <h3 className="text-base font-semibold text-[#f7f7f4] mb-1 group-hover:text-[#c6a56a] transition">
                  {product.name}
                </h3>
                <p className="text-xs text-[#b7b7b2] line-clamp-3 mb-4 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div>
                {/* INFORMAÇÕES DE DIMENSÃO E MATERIAL */}
                <div className="text-[11px] text-[#b7b7b2] space-y-1 mb-4 pt-3 border-t border-white/5">
                  <div className="flex justify-between">
                    <span>Material:</span>
                    <span className="text-white font-medium">{product.material}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dimensões:</span>
                    <span className="text-white font-medium">{product.dimensions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estoque Total:</span>
                    <span className="text-white font-medium">{product.totalStock} un.</span>
                  </div>
                </div>

                {/* PREÇO E BOTÃO ADICIONAR */}
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-xs text-[#b7b7b2] block">Diária</span>
                    <span className="text-base font-bold text-[#c6a56a]">
                      R$ {product.pricePerDay.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleProductInComposition(product)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                      inComp
                        ? 'bg-[#c6a56a] text-black shadow-md'
                        : 'bg-white/10 text-white hover:bg-[#c6a56a] hover:text-black'
                    }`}
                  >
                    {inComp ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Na Mesa</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Adicionar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
