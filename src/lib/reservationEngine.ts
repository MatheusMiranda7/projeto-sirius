import {
  ConfirmedReservation,
  AvailabilityCheckResult,
  Product,
  TableComposition,
  QuoteRequestData
} from '@/types/sirius';

// Reservas de teste simuladas no sistema para validação de conflito de datas
export const MOCK_CONFIRMED_RESERVATIONS: ConfirmedReservation[] = [
  {
    id: 'res-101',
    clientName: 'Casamento Helena & Lucas',
    clientPhone: '5511999887766',
    startDate: '2026-09-10',
    endDate: '2026-09-12',
    status: 'confirmed',
    items: [
      { productId: 'sp-nogueira-01', quantity: 180 },
      { productId: 'pr-alabastro-01', quantity: 180 },
      { productId: 'tl-ouro-garfo-01', quantity: 180 },
      { productId: 'tc-baccarat-01', quantity: 180 }
    ]
  },
  {
    id: 'res-102',
    clientName: 'Jantar Corporativo Sirius',
    clientPhone: '5511988776655',
    startDate: '2026-09-15',
    endDate: '2026-09-16',
    status: 'confirmed',
    items: [
      { productId: 'pr-nero-02', quantity: 200 },
      { productId: 'sp-latao-02', quantity: 200 }
    ]
  }
];

/**
 * Verifica se dois intervalos de datas se sobrepõem.
 */
export function areDatesOverlapping(
  start1: string,
  end1: string,
  start2: string,
  end2: string
): boolean {
  const dStart1 = new Date(start1).getTime();
  const dEnd1 = new Date(end1).getTime();
  const dStart2 = new Date(start2).getTime();
  const dEnd2 = new Date(end2).getTime();

  return dStart1 <= dEnd2 && dEnd1 >= dStart2;
}

/**
 * Calcula a disponibilidade em estoque de um produto específico para um período de evento.
 * IMPORTANTE: Apenas reservas CONFIRMADAS comprometem o estoque.
 * Solicitações de orçamento NÃO bloqueiam o estoque.
 */
export function checkProductAvailability(
  product: Product,
  startDate: string,
  endDate: string,
  requestedQuantity: number,
  reservations: ConfirmedReservation[] = MOCK_CONFIRMED_RESERVATIONS
): AvailabilityCheckResult {
  let bookedQuantity = 0;

  for (const reservation of reservations) {
    if (reservation.status === 'confirmed') {
      if (areDatesOverlapping(startDate, endDate, reservation.startDate, reservation.endDate)) {
        const reservedItem = reservation.items.find(i => i.productId === product.id);
        if (reservedItem) {
          bookedQuantity += reservedItem.quantity;
        }
      }
    }
  }

  const availableQuantity = Math.max(0, product.totalStock - bookedQuantity);
  const isAvailable = availableQuantity >= requestedQuantity;

  return {
    productId: product.id,
    totalStock: product.totalStock,
    bookedQuantity,
    availableQuantity,
    isAvailable
  };
}

/**
 * Calcula a duração em dias entre duas datas ISO.
 */
export function calculateEventDays(startDate: string, endDate: string): number {
  if (!startDate || !endDate) return 1;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDays);
}

/**
 * Calcula o custo unitário por lugar (1 conjunto completo de mesa posta).
 */
export function calculateCompositionUnitPrice(composition: TableComposition): number {
  let total = 0;
  Object.values(composition).forEach(item => {
    if (item && item.pricePerDay) {
      total += item.pricePerDay;
    }
  });
  return total;
}

/**
 * Gera o link formatado de envio do orçamento para o WhatsApp da empresa.
 */
export function generateWhatsAppQuoteUrl(
  quote: QuoteRequestData,
  whatsappNumber: string = '5511999999999'
): string {
  const days = calculateEventDays(quote.eventDateStart, quote.eventDateEnd);
  const unitPrice = calculateCompositionUnitPrice(quote.composition);
  const totalEstimated = unitPrice * quote.guestCount * days;

  const itemsList: string[] = [];
  if (quote.composition.sousplat) itemsList.push(`• Sousplat: ${quote.composition.sousplat.name}`);
  if (quote.composition.pratoPrincipal) itemsList.push(`• Prato Princ.: ${quote.composition.pratoPrincipal.name}`);
  if (quote.composition.pratoSobremesa) itemsList.push(`• Prato Sobremesa: ${quote.composition.pratoSobremesa.name}`);
  if (quote.composition.guardanapo) itemsList.push(`• Guardanapo: ${quote.composition.guardanapo.name}`);
  if (quote.composition.talherGarfo) itemsList.push(`• Garfo: ${quote.composition.talherGarfo.name}`);
  if (quote.composition.talherFaca) itemsList.push(`• Faca: ${quote.composition.talherFaca.name}`);
  if (quote.composition.talherColher) itemsList.push(`• Colher: ${quote.composition.talherColher.name}`);
  if (quote.composition.taca) itemsList.push(`• Taça: ${quote.composition.taca.name}`);

  const textMessage = `✨ *SOLICITAÇÃO DE ORÇAMENTO - PROJECT SIRIUS* ✨

👤 *Cliente:* ${quote.clientName}
📱 *Telefone:* ${quote.clientPhone}
📍 *Local do Evento:* ${quote.eventLocation}
👥 *Número de Convidados:* ${quote.guestCount} lugares
📅 *Período do Evento:* ${quote.eventDateStart} até ${quote.eventDateEnd} (${days} ${days > 1 ? 'dias' : 'dia'})

🍽️ *COMPOSIÇÃO DE MESA SELECIONADA:*
${itemsList.join('\n')}

💰 *Investimento Estimado por Lugar:* R$ ${unitPrice.toFixed(2)} / dia
💵 *Orçamento Total Estimado:* R$ ${totalEstimated.toFixed(2)}

${quote.notes ? `📝 *Observações:* ${quote.notes}\n` : ''}
_Mensagem gerada automaticamente via Project Sirius Experience_`;

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(textMessage)}`;
}
