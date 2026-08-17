'use client';

import React, { useState } from 'react';
import { Product, TableComposition } from '@/types/sirius';
import { INITIAL_PRODUCTS } from '@/lib/catalogData';
import { Plus, Check, Filter } from 'lucide-react';

interface ProductCatalogProps {
  composition: TableComposition;

  onUpdateComposition: (
    newComposition: TableComposition
  ) => void;

  onOpenProduct: (
    product: Product
  ) => void;
}

export function ProductCatalog({
  composition,
  onUpdateComposition,
  onOpenProduct,
}: ProductCatalogProps) {
  const [selectedCollection, setSelectedCollection] =
    useState<string>('Todas');

  const collections = [
    'Todas',
    'Orgânica',
    'Metalurgia Fina',
    'Raízes',
    'Noturna',
    'Textura Natural',
    'Ouro Imperial',
    'Cristaleria Real',
  ];

  const filteredProducts =
    selectedCollection === 'Todas'
      ? INITIAL_PRODUCTS
      : INITIAL_PRODUCTS.filter(
        (product) =>
          product.collection === selectedCollection
      );

  const isProductInComposition = (
    product: Product
  ): boolean => {
    return Object.values(composition).some(
      (item) => item?.id === product.id
    );
  };

  const toggleProductInComposition = (
    product: Product
  ) => {
    const keyMap: Record<
      string,
      keyof TableComposition
    > = {
      sousplat: 'sousplat',
      prato_principal: 'pratoPrincipal',
      prato_sobremesa: 'pratoSobremesa',
      guardanapo: 'guardanapo',
      talher_garfo: 'talherGarfo',
      talher_faca: 'talherFaca',
      talher_colher: 'talherColher',
      taca: 'taca',
    };

    const compKey =
      keyMap[product.category];

    if (!compKey) return;

    if (
      composition[compKey]?.id === product.id
    ) {
      onUpdateComposition({
        ...composition,
        [compKey]: undefined,
      });

      return;
    }

    onUpdateComposition({
      ...composition,
      [compKey]: product,
    });
  };

  return (
    <section className="w-full space-y-6 pt-6">
      {/* CABEÇALHO */}
      <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-4 md:flex-row md:items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c6a56a]">
            Catálogo Exclusivo
          </span>

          <h2 className="mt-1 text-2xl font-bold text-[#f7f7f4]">
            Acervo de Louças & Utensílios
          </h2>

          <p className="mt-2 max-w-lg text-xs leading-5 text-white/40">
            Selecione uma peça para conhecer seus detalhes,
            explorar imagens e adicionar à sua Curadoria Sirius.
          </p>
        </div>

        {/* FILTROS */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Filter className="mr-1 h-4 w-4 shrink-0 text-[#c6a56a]" />

          {collections.map((collection) => (
            <button
              key={collection}
              type="button"
              onClick={() =>
                setSelectedCollection(collection)
              }
              className={`whitespace-nowrap rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all ${selectedCollection === collection
                  ? 'bg-[#c6a56a] font-bold text-black'
                  : 'bg-white/5 text-[#b7b7b2] hover:bg-white/10'
                }`}
            >
              {collection}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUTOS */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {filteredProducts.map((product) => {
          const inComp =
            isProductInComposition(product);

          const firstImage =
            product.images?.[0];

          return (
            <article
              key={product.id}
              onClick={() =>
                onOpenProduct(product)
              }
              className={`group flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border transition-all duration-300 ${inComp
                  ? 'border-[#c6a56a] bg-[#1a1b1f] shadow-[0_20px_60px_rgba(198,165,106,0.10)]'
                  : 'border-white/10 bg-white/[0.03] hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.05]'
                }`}
            >
              {/* ÁREA VISUAL */}
              <div
                className="relative aspect-[4/3] overflow-hidden bg-[#111]"
                style={
                  firstImage
                    ? undefined
                    : {
                      background: `radial-gradient(circle at center, ${product.hexColor}55, #0a0a0a 72%)`,
                    }
                }
              >
                {firstImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={firstImage}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                <div className="absolute left-4 top-4">
                  <span className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[9px] uppercase tracking-wider text-[#d4bd8d] backdrop-blur-xl">
                    {product.collection}
                  </span>
                </div>

                <div
                  className="absolute right-4 top-4 h-4 w-4 rounded-full border border-white/30"
                  style={{
                    backgroundColor:
                      product.hexColor,
                  }}
                  title={product.color}
                />
              </div>

              {/* CONTEÚDO */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <h3 className="mb-1 text-base font-semibold text-[#f7f7f4] transition group-hover:text-[#c6a56a]">
                    {product.name}
                  </h3>

                  <p className="mb-4 line-clamp-3 text-xs leading-relaxed text-[#b7b7b2]">
                    {product.description}
                  </p>
                </div>

                <div>
                  <div className="mb-4 space-y-1 border-t border-white/5 pt-3 text-[11px] text-[#b7b7b2]">
                    <div className="flex justify-between gap-3">
                      <span>Material:</span>

                      <span className="text-right font-medium text-white">
                        {product.material}
                      </span>
                    </div>

                    <div className="flex justify-between gap-3">
                      <span>Dimensões:</span>

                      <span className="text-right font-medium text-white">
                        {product.dimensions}
                      </span>
                    </div>

                    <div className="flex justify-between gap-3">
                      <span>Estoque Total:</span>

                      <span className="font-medium text-white">
                        {product.totalStock} un.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="block text-xs text-[#b7b7b2]">
                        Diária
                      </span>

                      <span className="text-base font-bold text-[#c6a56a]">
                        R${' '}
                        {product.pricePerDay.toFixed(
                          2
                        )}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();

                        toggleProductInComposition(
                          product
                        );
                      }}
                      className={`flex items-center space-x-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${inComp
                          ? 'bg-[#c6a56a] text-black shadow-md'
                          : 'bg-white/10 text-white hover:bg-[#c6a56a] hover:text-black'
                        }`}
                    >
                      {inComp ? (
                        <>
                          <Check className="h-3.5 w-3.5 stroke-[3]" />
                          <span>Na Mesa</span>
                        </>
                      ) : (
                        <>
                          <Plus className="h-3.5 w-3.5" />
                          <span>Compor</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}