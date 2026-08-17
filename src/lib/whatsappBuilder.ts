import {
    CuratedItem,
    DateRange,
} from '@/types/sirius';

export interface AvailabilityRequestData {
    clientName: string;
    clientPhone: string;
    eventLocation: string;
    notes?: string;
}

function formatDate(date: string): string {
    return date
        .split('-')
        .reverse()
        .join('/');
}

export function calculateEventDays(
    dateRange: DateRange
): number {
    const start = new Date(
        `${dateRange.startDate}T12:00:00`
    );

    const end = new Date(
        `${dateRange.endDate}T12:00:00`
    );

    const difference =
        end.getTime() - start.getTime();

    const days = Math.ceil(
        difference / 86_400_000
    );

    return Math.max(1, days);
}

export function calculateCurationDailyEstimate(
    items: CuratedItem[]
): number {
    return items.reduce(
        (total, item) =>
            total +
            item.product.pricePerDay *
            item.quantity,
        0
    );
}

export function buildWhatsAppMessage(
    items: CuratedItem[],
    dateRange: DateRange,
    request: AvailabilityRequestData
): string {
    const eventDays =
        calculateEventDays(dateRange);

    const dailyEstimate =
        calculateCurationDailyEstimate(items);

    const estimatedTotal =
        dailyEstimate * eventDays;

    const productLines = items
        .map(
            ({ product, quantity }, index) =>
                `${index + 1}. ${product.name}
Quantidade: ${quantity}
Coleção: ${product.collection}
Material: ${product.material}
Valor unitário/dia: R$ ${product.pricePerDay.toFixed(2)}
Subtotal diário: R$ ${(product.pricePerDay * quantity).toFixed(2)}`
        )
        .join('\n\n');

    const notes = request.notes?.trim()
        ? `\n\nObservações:\n${request.notes.trim()}`
        : '';

    return `Olá! Gostaria de consultar a disponibilidade da minha Curadoria Sirius.

DADOS DO CLIENTE

Nome: ${request.clientName}
WhatsApp: ${request.clientPhone}
Local do evento: ${request.eventLocation}

PERÍODO

${formatDate(dateRange.startDate)} até ${formatDate(dateRange.endDate)}
Período considerado: ${eventDays} ${eventDays === 1 ? 'dia' : 'dias'}

CURADORIA SIRIUS

${productLines}

ESTIMATIVA

Estimativa diária: R$ ${dailyEstimate.toFixed(2)}
Estimativa para o período: R$ ${estimatedTotal.toFixed(2)}

Esta mensagem é uma solicitação de disponibilidade e não representa confirmação de reserva.${notes}

Gostaria de confirmar a disponibilidade desses itens para o período informado.`;
}

export function buildWhatsAppUrl(
    items: CuratedItem[],
    dateRange: DateRange,
    request: AvailabilityRequestData,
    phoneNumber: string
): string {
    const cleanPhone =
        phoneNumber.replace(/\D/g, '');

    const message =
        buildWhatsAppMessage(
            items,
            dateRange,
            request
        );

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
        message
    )}`;
}