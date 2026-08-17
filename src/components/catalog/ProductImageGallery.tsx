'use client';

import Image from 'next/image';
import {
    ChevronLeft,
    ChevronRight,
    Maximize2,
    X,
} from 'lucide-react';
import {
    useEffect,
    useRef,
    useState,
} from 'react';

interface ProductImageGalleryProps {
    images?: string[];
    productName: string;
    productColor?: string;
}

export function ProductImageGallery({
    images = [],
    productName,
    productColor = '#242424',
}: ProductImageGalleryProps) {
    const [activeIndex, setActiveIndex] =
        useState(0);

    const [isLightboxOpen, setIsLightboxOpen] =
        useState(false);

    const carouselRef =
        useRef<HTMLDivElement>(null);

    const lightboxRef =
        useRef<HTMLDivElement>(null);

    const hasImages = images.length > 0;

    const goTo = (
        index: number,
        ref: React.RefObject<HTMLDivElement | null>
    ) => {
        if (!ref.current || images.length === 0) {
            return;
        }

        const normalized =
            (index + images.length) % images.length;

        ref.current.scrollTo({
            left:
                normalized *
                ref.current.clientWidth,
            behavior: 'smooth',
        });

        setActiveIndex(normalized);
    };

    const handleScroll = (
        element: HTMLDivElement
    ) => {
        if (!element.clientWidth) return;

        const index = Math.round(
            element.scrollLeft / element.clientWidth
        );

        setActiveIndex(index);
    };

    useEffect(() => {
        if (!isLightboxOpen) return;

        const previous =
            document.body.style.overflow;

        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = previous;
        };
    }, [isLightboxOpen]);

    if (!hasImages) {
        return (
            <div
                className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden bg-[#151515]"
                style={{
                    background: `radial-gradient(circle at center, ${productColor}55, #090909 70%)`,
                }}
            >
                <div className="px-8 text-center">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/35">
                        Project Sirius
                    </p>

                    <p className="mt-4 text-lg font-light text-white/70">
                        Imagens de {productName} em preparação.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="relative overflow-hidden bg-[#080808]">
                <div
                    ref={carouselRef}
                    onScroll={(event) =>
                        handleScroll(event.currentTarget)
                    }
                    className="flex aspect-[4/5] snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:aspect-square"
                >
                    {images.map((image, index) => (
                        <button
                            key={`${image}-${index}`}
                            type="button"
                            onClick={() => {
                                setActiveIndex(index);
                                setIsLightboxOpen(true);
                            }}
                            className="relative min-w-full snap-center"
                            aria-label={`Ampliar imagem ${index + 1} de ${productName}`}
                        >
                            <Image
                                src={image}
                                alt={`${productName} — imagem ${index + 1}`}
                                fill
                                sizes="(max-width: 768px) 100vw, 55vw"
                                className="object-cover"
                            />

                            <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-xl">
                                <Maximize2 className="h-4 w-4" />
                            </div>
                        </button>
                    ))}
                </div>

                {images.length > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={() =>
                                goTo(
                                    activeIndex - 1,
                                    carouselRef
                                )
                            }
                            className="absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-xl transition hover:bg-white hover:text-black sm:flex"
                            aria-label="Imagem anterior"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                goTo(
                                    activeIndex + 1,
                                    carouselRef
                                )
                            }
                            className="absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-xl transition hover:bg-white hover:text-black sm:flex"
                            aria-label="Próxima imagem"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>

                        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() =>
                                        goTo(index, carouselRef)
                                    }
                                    className={`h-1.5 rounded-full transition-all ${activeIndex === index
                                            ? 'w-6 bg-white'
                                            : 'w-1.5 bg-white/40'
                                        }`}
                                    aria-label={`Ir para imagem ${index + 1}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* LIGHTBOX FULLSCREEN */}
            {isLightboxOpen && (
                <div className="fixed inset-0 z-[200] bg-black">
                    <button
                        type="button"
                        onClick={() =>
                            setIsLightboxOpen(false)
                        }
                        className="absolute right-5 top-5 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-xl sm:right-8 sm:top-8"
                        aria-label="Fechar galeria"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    <div
                        ref={lightboxRef}
                        onScroll={(event) =>
                            handleScroll(
                                event.currentTarget
                            )
                        }
                        className="flex h-full snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                        {images.map((image, index) => (
                            <div
                                key={`${image}-fullscreen-${index}`}
                                className="relative min-w-full snap-center"
                            >
                                <Image
                                    src={image}
                                    alt={`${productName} ampliado — imagem ${index + 1}`}
                                    fill
                                    sizes="100vw"
                                    className="object-contain p-4 sm:p-12"
                                />
                            </div>
                        ))}
                    </div>

                    {images.length > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={() =>
                                    goTo(
                                        activeIndex - 1,
                                        lightboxRef
                                    )
                                }
                                className="absolute left-5 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-xl sm:flex"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    goTo(
                                        activeIndex + 1,
                                        lightboxRef
                                    )
                                }
                                className="absolute right-5 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-xl sm:flex"
                            >
                                <ChevronRight className="h-6 w-6" />
                            </button>

                            <div className="absolute bottom-7 left-1/2 -translate-x-1/2 text-xs tracking-[0.25em] text-white/50">
                                {activeIndex + 1} / {images.length}
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
}