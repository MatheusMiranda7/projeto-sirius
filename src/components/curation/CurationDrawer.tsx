'use client';

import {
    MessageCircle,
    Trash2,
    X,
} from 'lucide-react';

import {
    CuratedItem,
    DateRange,
} from '@/types/sirius';

import { QuantitySelector } from './QuantitySelector';

interface CurationDrawerProps {
    isOpen: boolean;
    items: CuratedItem[];
    dateRange: DateRange;

    onRequestAvailability: () => void;
    onClose: () => void;

    onUpdateQuantity: (
        productId: string,
        quantity: number
    ) => void;

    onRemove: (
        productId: string
    ) => void;
}

export function CurationDrawer({
    isOpen,
    items,
    dateRange,
    onRequestAvailability,
    onClose,
    onUpdateQuantity,
    onRemove,
}: CurationDrawerProps) {
    if (!isOpen) return null;

    const dailyEstimate = items.reduce(
        (total, item) =>
            total +
            item.quantity *
            item.product.pricePerDay,
        0
    );

    const totalUnits = items.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );

    return (
        <div className="fixed inset-0 z-[160] bg-black/60 backdrop-blur-sm">
            {/* FUNDO CLICÁVEL */}
            <button
                type="button"
                className="absolute inset-0 cursor-default"
                onClick={onClose}
                aria-label="Fechar Curadoria"
            />

            {/* DRAWER */}
            <aside className="absolute right-0 top-0 z-10 flex h-full w-full max-w-[520px] flex-col border-l border-white/10 bg-[#0a0a0a] shadow-2xl">
                {/* HEADER */}
                <header className="flex items-start justify-between border-b border-white/10 px-6 py-6 sm:px-8">
                    <div>
                        <span className="text-[10px] uppercase tracking-[0.35em] text-[#c6a56a]">
                            Project Sirius
                        </span>

                        <h2 className="mt-2 text-2xl font-light tracking-[-0.03em] text-white">
                            Minha Curadoria
                        </h2>

                        {items.length > 0 && (
                            <p className="mt-2 text-xs text-white/35">
                                {items.length}{' '}
                                {items.length === 1
                                    ? 'item'
                                    : 'itens'}
                                {' • '}
                                {totalUnits}{' '}
                                {totalUnits === 1
                                    ? 'peça'
                                    : 'peças'}
                            </p>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:bg-white hover:text-black"
                        aria-label="Fechar"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </header>

                {/* CONTEÚDO */}
                <div className="flex-1 overflow-y-auto px-6 py-4 sm:px-8">
                    {items.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center text-center">
                            <p className="text-lg font-light text-white/70">
                                Sua Curadoria está vazia.
                            </p>

                            <p className="mt-2 max-w-xs text-sm leading-6 text-white/35">
                                Explore o catálogo e selecione
                                as peças que farão parte da sua
                                experiência.
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-white/10">
                            {items.map(
                                ({
                                    product,
                                    quantity,
                                }) => (
                                    <article
                                        key={product.id}
                                        className="py-6"
                                    >
                                        <div className="flex gap-4">
                                            {/* MINIATURA / PLACEHOLDER */}
                                            <div
                                                className="h-20 w-20 shrink-0 rounded-xl border border-white/5"
                                                style={{
                                                    background: `radial-gradient(circle, ${product.hexColor}70, #111 75%)`,
                                                }}
                                            />

                                            {/* INFO */}
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate font-medium text-white">
                                                    {product.name}
                                                </p>

                                                <p className="mt-1 text-xs text-white/35">
                                                    {product.collection}
                                                </p>

                                                <p className="mt-2 text-sm text-[#c6a56a]">
                                                    R${' '}
                                                    {product.pricePerDay.toFixed(
                                                        2
                                                    )}{' '}
                                                    / diária
                                                </p>
                                            </div>

                                            {/* REMOVER */}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    onRemove(
                                                        product.id
                                                    )
                                                }
                                                className="self-start text-white/30 transition hover:text-white"
                                                aria-label={`Remover ${product.name}`}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>

                                        {/* QUANTIDADE */}
                                        <div className="mt-4">
                                            <QuantitySelector
                                                value={quantity}
                                                max={Math.max(
                                                    1,
                                                    product.totalStock
                                                )}
                                                onChange={(next) =>
                                                    onUpdateQuantity(
                                                        product.id,
                                                        next
                                                    )
                                                }
                                            />
                                        </div>

                                        {/* SUBTOTAL */}
                                        <div className="mt-4 flex items-center justify-between text-xs">
                                            <span className="text-white/30">
                                                Subtotal diário
                                            </span>

                                            <span className="font-medium text-white/70">
                                                R${' '}
                                                {(
                                                    product.pricePerDay *
                                                    quantity
                                                ).toFixed(2)}
                                            </span>
                                        </div>
                                    </article>
                                )
                            )}
                        </div>
                    )}
                </div>

                {/* FOOTER */}
                {items.length > 0 && (
                    <footer className="border-t border-white/10 bg-[#080808] px-6 py-6 sm:px-8">
                        {/* PERÍODO */}
                        <div className="flex justify-between gap-6 text-sm">
                            <span className="text-white/40">
                                Período
                            </span>

                            <span className="text-right text-white">
                                {dateRange.startDate
                                    .split('-')
                                    .reverse()
                                    .join('/')}
                                {' — '}
                                {dateRange.endDate
                                    .split('-')
                                    .reverse()
                                    .join('/')}
                            </span>
                        </div>

                        {/* TOTAL DE PEÇAS */}
                        <div className="mt-3 flex justify-between text-sm">
                            <span className="text-white/40">
                                Total de peças
                            </span>

                            <span className="text-white">
                                {totalUnits} un.
                            </span>
                        </div>

                        {/* ESTIMATIVA */}
                        <div className="mt-3 flex justify-between">
                            <span className="text-sm text-white/40">
                                Estimativa diária
                            </span>

                            <span className="text-lg font-medium text-[#c6a56a]">
                                R${' '}
                                {dailyEstimate.toFixed(
                                    2
                                )}
                            </span>
                        </div>

                        <p className="mt-2 text-[11px] leading-5 text-white/30">
                            Valor indicativo. A disponibilidade
                            e as condições serão confirmadas
                            pela equipe.
                        </p>

                        {/* PRÓXIMA ETAPA */}
                        <button
                            type="button"
                            onClick={
                                onRequestAvailability
                            }
                            className="mt-6 flex min-h-13 w-full items-center justify-center gap-3 rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-[#c6a56a]"
                        >
                            <MessageCircle className="h-4 w-4" />

                            Consultar disponibilidade
                        </button>
                    </footer>
                )}
            </aside>
        </div>
    );
}