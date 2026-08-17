'use client';

import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
}

export function QuantitySelector({
    value,
    onChange,
    min = 1,
    max = 999,
}: QuantitySelectorProps) {
    const update = (nextValue: number) => {
        onChange(
            Math.min(
                max,
                Math.max(min, nextValue)
            )
        );
    };

    return (
        <div className="inline-flex items-center overflow-hidden rounded-full border border-white/15 bg-white/[0.05]">
            <button
                type="button"
                onClick={() => update(value - 1)}
                disabled={value <= min}
                className="flex h-11 w-11 items-center justify-center text-white/70 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Diminuir quantidade"
            >
                <Minus className="h-4 w-4" />
            </button>

            <input
                type="number"
                min={min}
                max={max}
                value={value}
                onChange={(event) =>
                    update(Number(event.target.value))
                }
                className="h-11 w-16 border-x border-white/10 bg-transparent text-center text-sm font-medium text-white outline-none"
                aria-label="Quantidade"
            />

            <button
                type="button"
                onClick={() => update(value + 1)}
                disabled={value >= max}
                className="flex h-11 w-11 items-center justify-center text-white/70 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Aumentar quantidade"
            >
                <Plus className="h-4 w-4" />
            </button>
        </div>
    );
}