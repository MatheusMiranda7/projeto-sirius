'use client';

import {
    useEffect,
    useMemo,
    useState,
} from 'react';
import {
    ArrowRight,
    X,
} from 'lucide-react';

import {
    Product,
    TableComposition,
} from '@/types/sirius';

import { INITIAL_PRODUCTS } from '@/lib/catalogData';

import {
    getProductRecommendations,
} from '@/lib/recommendationEngine';

import { ProductImageGallery } from './ProductImageGallery';

import { QuantitySelector } from '@/components/curation/QuantitySelector';

interface ProductDetailModalProps {
    product: Product | null;
    composition: TableComposition;
    onClose: () => void;
    onAddToCuration: (
        product: Product,
        quantity: number
    ) => void;
    onSelectProduct: (
        product: Product
    ) => void;
}

export function ProductDetailModal({
    product,
    composition,
    onClose,
    onAddToCuration,
    onSelectProduct,
}: ProductDetailModalProps) {
    const [quantity, setQuantity] =
        useState(1);

    useEffect(() => {
        if (!product) return;

        const previous =
            document.body.style.overflow;

        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow =
                previous;
        };
    }, [product]);

    const recommendations = useMemo(() => {
        if (!product) return [];

        return getProductRecommendations(
            product,
            INITIAL_PRODUCTS,
            composition,
            4
        );
    }, [product, composition]);

    if (!product) return null;

    const handleAdd = () => {
        onAddToCuration(product, quantity);
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-[150] overflow-y-auto bg-black/80 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label={product.name}
        >
            <div className="min-h-full bg-[#090909] lg:mx-auto lg:my-6 lg:min-h-0 lg:max-w-[1500px] lg:overflow-hidden lg:rounded-[2rem] lg:border lg:border-white/10">
                <button
                    type="button"
                    onClick={onClose}
                    className="fixed right-5 top-5 z-[170] flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-xl lg:absolute"
                    aria-label="Fechar produto"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
                    {/* GALERIA */}
                    <ProductImageGallery
                        images={product.images}
                        productName={product.name}
                        productColor={product.hexColor}
                    />

                    {/* INFORMAÇÕES */}
                    <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-14 lg:py-16">
                        <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#c6a56a] sm:text-xs">
                            {product.collection}
                        </span>

                        <h2 className="mt-4 text-4xl font-light tracking-[-0.04em] text-white sm:text-5xl">
                            {product.name}
                        </h2>

                        <p className="mt-5 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
                            {product.description}
                        </p>

                        <div className="mt-8 border-y border-white/10 py-6">
                            <dl className="grid grid-cols-2 gap-x-5 gap-y-5 text-sm">
                                <div>
                                    <dt className="text-white/35">
                                        Material
                                    </dt>
                                    <dd className="mt-1 text-white">
                                        {product.material}
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-white/35">
                                        Dimensões
                                    </dt>
                                    <dd className="mt-1 text-white">
                                        {product.dimensions}
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-white/35">
                                        Estoque total
                                    </dt>
                                    <dd className="mt-1 text-white">
                                        {product.totalStock} un.
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-white/35">
                                        Diária
                                    </dt>
                                    <dd className="mt-1 text-lg font-medium text-[#c6a56a]">
                                        R${' '}
                                        {product.pricePerDay.toFixed(
                                            2
                                        )}
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        {/* QUANTIDADE */}
                        <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white/35">
                                    Quantidade
                                </p>

                                <QuantitySelector
                                    value={quantity}
                                    onChange={setQuantity}
                                    max={Math.max(
                                        1,
                                        product.totalStock
                                    )}
                                />
                            </div>

                            <button
                                type="button"
                                onClick={handleAdd}
                                className="flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#c6a56a] px-7 text-sm font-semibold text-black transition hover:bg-[#dbc28f]"
                            >
                                Adicionar à Curadoria
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* RECOMENDAÇÕES */}
                {recommendations.length > 0 && (
                    <section className="border-t border-white/10 px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
                        <span className="text-[10px] uppercase tracking-[0.35em] text-[#c6a56a] sm:text-xs">
                            Curadoria inteligente
                        </span>

                        <h3 className="mt-3 text-2xl font-light tracking-[-0.03em] text-white sm:text-3xl">
                            Combinações harmoniosas
                        </h3>

                        <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
                            Peças selecionadas pelo Sirius
                            considerando coleção, materiais,
                            cores e sua composição atual.
                        </p>

                        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {recommendations.map(
                                (recommendation) => (
                                    <button
                                        key={recommendation.id}
                                        type="button"
                                        onClick={() =>
                                            onSelectProduct(
                                                recommendation
                                            )
                                        }
                                        className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-[#c6a56a]/50 hover:bg-white/[0.06]"
                                    >
                                        <div
                                            className="mb-5 aspect-square rounded-xl border border-white/5"
                                            style={{
                                                background: `radial-gradient(circle, ${recommendation.hexColor}80, #101010 70%)`,
                                            }}
                                        />

                                        <p className="text-sm font-medium text-white">
                                            {recommendation.name}
                                        </p>

                                        <p className="mt-1 text-[11px] text-white/40">
                                            {
                                                recommendation.collection
                                            }
                                        </p>

                                        <p className="mt-3 text-xs font-medium text-[#c6a56a]">
                                            R${' '}
                                            {recommendation.pricePerDay.toFixed(
                                                2
                                            )}
                                        </p>
                                    </button>
                                )
                            )}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}