'use client';

import React, { useState } from 'react';
import { TableComposition, DateRange } from '@/types/sirius';
import {
  calculateCompositionUnitPrice,
  calculateEventDays,
  generateWhatsAppQuoteUrl
} from '@/lib/reservationEngine';
import { X, Send, Calendar, Users, MapPin, Phone, User, MessageCircle, ShieldAlert } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  composition: TableComposition;
  dateRange: DateRange;
  onUpdateDateRange: (range: DateRange) => void;
}

export function QuoteModal({
  isOpen,
  onClose,
  composition,
  dateRange,
  onUpdateDateRange
}: QuoteModalProps) {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [eventLocation, setEventLocation] = useState('São Paulo - SP');
  const [guestCount, setGuestCount] = useState(100);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const compositionItems = Object.values(composition).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const unitPricePerDay = calculateCompositionUnitPrice(composition);
  const eventDays = calculateEventDays(dateRange.startDate, dateRange.endDate);
  const totalEstimated = unitPricePerDay * guestCount * eventDays;

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) {
      alert('Por favor, informe seu nome e número de WhatsApp.');
      return;
    }

    const whatsappUrl = generateWhatsAppQuoteUrl({
      clientName,
      clientPhone,
      eventDateStart: dateRange.startDate,
      eventDateEnd: dateRange.endDate,
      guestCount,
      eventLocation,
      notes,
      composition
    });

    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl glass-panel-gold rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
        {/* BOTÃO FECHAR */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#b7b7b2] hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* CABEÇALHO */}
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-[#c6a56a] font-semibold">Project Sirius V1</span>
          <h2 className="text-2xl font-bold text-[#f7f7f4]">Solicitação de Orçamento</h2>
          <p className="text-xs text-[#b7b7b2] mt-1">
            Monte a reserva perfeita para seu evento. Resposta rápida via WhatsApp exclusivo.
          </p>
        </div>

        {/* AVISO IMPORTANTE SOBRE ESTOQUE */}
        <div className="p-3.5 rounded-xl bg-[#c6a56a]/10 border border-[#c6a56a]/30 flex items-start space-x-3 text-xs text-[#d8c6a5]">
          <ShieldAlert className="w-5 h-5 text-[#c6a56a] shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold text-white">Regra de Disponibilidade:</strong> Esta solicitação de orçamento <u>não bloqueia o estoque</u>. Somente reservas confirmadas pela nossa equipe comprometem formalmente a disponibilidade.
          </div>
        </div>

        {/* RESUMO DA COMPOSIÇÃO SELECIONADA */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#f7f7f4]">Composição da Mesa ({compositionItems.length} itens)</span>
            <span className="text-xs text-[#c6a56a] font-bold">R$ {unitPricePerDay.toFixed(2)} / lugar / dia</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-[#b7b7b2]">
            {compositionItems.map(item => (
              <div key={item.id} className="p-2 rounded-lg bg-white/5 truncate border border-white/5">
                <span className="text-white font-medium block truncate">{item.name}</span>
                <span className="text-[10px] text-[#c6a56a]">R$ {item.pricePerDay.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FORMULÁRIO DE ORÇAMENTO */}
        <form onSubmit={handleSendWhatsApp} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nome */}
            <div>
              <label className="text-xs text-[#b7b7b2] mb-1.5 flex items-center space-x-1.5">
                <User className="w-3.5 h-3.5 text-[#c6a56a]" />
                <span>Seu Nome Completo</span>
              </label>
              <input
                type="text"
                required
                value={clientName}
                onChange={e => setClientName(e.target.value)}
                placeholder="Ex: Maria Clara Silva"
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-[#c6a56a]"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label className="text-xs text-[#b7b7b2] mb-1.5 flex items-center space-x-1.5">
                <Phone className="w-3.5 h-3.5 text-[#c6a56a]" />
                <span>WhatsApp com DDD</span>
              </label>
              <input
                type="tel"
                required
                value={clientPhone}
                onChange={e => setClientPhone(e.target.value)}
                placeholder="Ex: 11999887766"
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-[#c6a56a]"
              />
            </div>

            {/* Data Início */}
            <div>
              <label className="text-xs text-[#b7b7b2] mb-1.5 flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#c6a56a]" />
                <span>Data de Início do Evento</span>
              </label>
              <input
                type="date"
                required
                value={dateRange.startDate}
                onChange={e => onUpdateDateRange({ ...dateRange, startDate: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-[#c6a56a]"
              />
            </div>

            {/* Data Término */}
            <div>
              <label className="text-xs text-[#b7b7b2] mb-1.5 flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#c6a56a]" />
                <span>Data de Devolução</span>
              </label>
              <input
                type="date"
                required
                value={dateRange.endDate}
                onChange={e => onUpdateDateRange({ ...dateRange, endDate: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-[#c6a56a]"
              />
            </div>

            {/* Número de Convidados */}
            <div>
              <label className="text-xs text-[#b7b7b2] mb-1.5 flex items-center space-x-1.5">
                <Users className="w-3.5 h-3.5 text-[#c6a56a]" />
                <span>Número de Convidados (Lugares)</span>
              </label>
              <input
                type="number"
                min={10}
                max={2000}
                required
                value={guestCount}
                onChange={e => setGuestCount(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-[#c6a56a]"
              />
            </div>

            {/* Cidade / Local */}
            <div>
              <label className="text-xs text-[#b7b7b2] mb-1.5 flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#c6a56a]" />
                <span>Cidade do Evento</span>
              </label>
              <input
                type="text"
                value={eventLocation}
                onChange={e => setEventLocation(e.target.value)}
                placeholder="Ex: São Paulo - SP"
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-[#c6a56a]"
              />
            </div>
          </div>

          {/* CÁLCULO DE INVESTIMENTO ESTIMADO */}
          <div className="p-4 rounded-2xl bg-[#c6a56a]/10 border border-[#c6a56a]/20 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-[#b7b7b2] block">Estimativa Total ({guestCount} lugares × {eventDays} {eventDays > 1 ? 'dias' : 'dia'}):</span>
              <span className="text-xl font-bold text-[#c6a56a]">R$ {totalEstimated.toFixed(2)}</span>
            </div>

            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs transition shadow-lg gold-glow"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enviar via WhatsApp</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
