'use client';

import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  Calendar,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  User,
  X,
} from 'lucide-react';

import {
  CuratedItem,
  DateRange,
} from '@/types/sirius';

import {
  buildWhatsAppUrl,
  calculateCurationDailyEstimate,
  calculateEventDays,
} from '@/lib/whatsappBuilder';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;

  items: CuratedItem[];

  dateRange: DateRange;

  onUpdateDateRange: (
    range: DateRange
  ) => void;
}

export function QuoteModal({
  isOpen,
  onClose,
  items,
  dateRange,
  onUpdateDateRange,
}: QuoteModalProps) {
  const [clientName, setClientName] =
    useState('');

  const [clientPhone, setClientPhone] =
    useState('');

  const [
    eventLocation,
    setEventLocation,
  ] = useState('São Paulo - SP');

  const [notes, setNotes] =
    useState('');

  useEffect(() => {
    if (!isOpen) return;

    const previous =
      document.body.style.overflow;

    document.body.style.overflow =
      'hidden';

    return () => {
      document.body.style.overflow =
        previous;
    };
  }, [isOpen]);

  const eventDays = useMemo(
    () =>
      calculateEventDays(dateRange),
    [dateRange]
  );

  const dailyEstimate = useMemo(
    () =>
      calculateCurationDailyEstimate(
        items
      ),
    [items]
  );

  const estimatedTotal =
    dailyEstimate * eventDays;

  const totalUnits = items.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  if (!isOpen) return null;

  const handleSendWhatsApp = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if (items.length === 0) {
      window.alert(
        'Adicione pelo menos um item à sua Curadoria.'
      );

      return;
    }

    if (
      !clientName.trim() ||
      !clientPhone.trim()
    ) {
      window.alert(
        'Informe seu nome e número de WhatsApp.'
      );

      return;
    }

    if (
      !dateRange.startDate ||
      !dateRange.endDate
    ) {
      window.alert(
        'Informe o período do evento.'
      );

      return;
    }

    if (
      dateRange.endDate <
      dateRange.startDate
    ) {
      window.alert(
        'A data de devolução não pode ser anterior à data inicial.'
      );

      return;
    }

    const companyPhone =
      process.env
        .NEXT_PUBLIC_WHATSAPP_NUMBER;

    if (!companyPhone) {
      window.alert(
        'Número de atendimento do WhatsApp não configurado.'
      );

      return;
    }

    const whatsappUrl =
      buildWhatsAppUrl(
        items,
        dateRange,
        {
          clientName:
            clientName.trim(),

          clientPhone:
            clientPhone.trim(),

          eventLocation:
            eventLocation.trim(),

          notes:
            notes.trim(),
        },
        companyPhone
      );

    window.open(
      whatsappUrl,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="fixed inset-0 z-[180] overflow-y-auto bg-black/85 backdrop-blur-xl">
      <div className="flex min-h-full items-center justify-center p-0 sm:p-6">
        <div className="relative min-h-screen w-full bg-[#090909] sm:min-h-0 sm:max-w-4xl sm:overflow-hidden sm:rounded-[2rem] sm:border sm:border-white/10">
          {/* FECHAR */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/60 backdrop-blur-xl transition hover:bg-white hover:text-black"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>

          {/* CABEÇALHO */}
          <header className="border-b border-white/10 px-6 pb-8 pt-8 sm:px-10 sm:pb-10 sm:pt-10">
            <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#c6a56a] sm:text-xs">
              Project Sirius
            </span>

            <h2 className="mt-4 max-w-2xl text-3xl font-light tracking-[-0.04em] text-white sm:text-5xl">
              Consultar disponibilidade
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/45 sm:text-base">
              Revise sua Curadoria e envie
              uma solicitação para que nossa
              equipe confirme a disponibilidade
              das peças no período escolhido.
            </p>
          </header>

          <form
            onSubmit={
              handleSendWhatsApp
            }
          >
            <div className="grid lg:grid-cols-[1fr_0.9fr]">
              {/* DADOS */}
              <div className="space-y-7 border-b border-white/10 px-6 py-8 sm:px-10 lg:border-b-0 lg:border-r">
                <section>
                  <p className="mb-5 text-xs font-medium uppercase tracking-[0.25em] text-white/35">
                    Seus dados
                  </p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 flex items-center gap-2 text-xs text-white/45">
                        <User className="h-3.5 w-3.5 text-[#c6a56a]" />

                        Nome
                      </span>

                      <input
                        type="text"
                        required
                        value={
                          clientName
                        }
                        onChange={(
                          event
                        ) =>
                          setClientName(
                            event.target
                              .value
                          )
                        }
                        placeholder="Seu nome"
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#c6a56a]/60"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 flex items-center gap-2 text-xs text-white/45">
                        <Phone className="h-3.5 w-3.5 text-[#c6a56a]" />

                        WhatsApp
                      </span>

                      <input
                        type="tel"
                        required
                        value={
                          clientPhone
                        }
                        onChange={(
                          event
                        ) =>
                          setClientPhone(
                            event.target
                              .value
                          )
                        }
                        placeholder="(11) 99999-9999"
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#c6a56a]/60"
                      />
                    </label>
                  </div>
                </section>

                {/* PERÍODO */}
                <section>
                  <p className="mb-5 text-xs font-medium uppercase tracking-[0.25em] text-white/35">
                    Evento
                  </p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label>
                      <span className="mb-2 flex items-center gap-2 text-xs text-white/45">
                        <Calendar className="h-3.5 w-3.5 text-[#c6a56a]" />

                        Data inicial
                      </span>

                      <input
                        type="date"
                        required
                        value={
                          dateRange.startDate
                        }
                        onChange={(
                          event
                        ) =>
                          onUpdateDateRange(
                            {
                              ...dateRange,

                              startDate:
                                event
                                  .target
                                  .value,
                            }
                          )
                        }
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-[#c6a56a]/60"
                      />
                    </label>

                    <label>
                      <span className="mb-2 flex items-center gap-2 text-xs text-white/45">
                        <Calendar className="h-3.5 w-3.5 text-[#c6a56a]" />

                        Devolução
                      </span>

                      <input
                        type="date"
                        required
                        value={
                          dateRange.endDate
                        }
                        min={
                          dateRange.startDate
                        }
                        onChange={(
                          event
                        ) =>
                          onUpdateDateRange(
                            {
                              ...dateRange,

                              endDate:
                                event
                                  .target
                                  .value,
                            }
                          )
                        }
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-[#c6a56a]/60"
                      />
                    </label>
                  </div>

                  <label className="mt-4 block">
                    <span className="mb-2 flex items-center gap-2 text-xs text-white/45">
                      <MapPin className="h-3.5 w-3.5 text-[#c6a56a]" />

                      Cidade / Local
                    </span>

                    <input
                      type="text"
                      value={
                        eventLocation
                      }
                      onChange={(
                        event
                      ) =>
                        setEventLocation(
                          event.target
                            .value
                        )
                      }
                      placeholder="São Paulo - SP"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#c6a56a]/60"
                    />
                  </label>
                </section>

                {/* OBSERVAÇÕES */}
                <label className="block">
                  <span className="mb-2 block text-xs text-white/45">
                    Observações
                    <span className="ml-1 text-white/20">
                      (opcional)
                    </span>
                  </span>

                  <textarea
                    value={notes}
                    onChange={(
                      event
                    ) =>
                      setNotes(
                        event.target.value
                      )
                    }
                    rows={4}
                    placeholder="Conte algo importante sobre o evento..."
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/20 focus:border-[#c6a56a]/60"
                  />
                </label>
              </div>

              {/* RESUMO */}
              <aside className="bg-white/[0.015] px-6 py-8 sm:px-10">
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/35">
                  Sua Curadoria
                </p>

                {items.length === 0 ? (
                  <p className="mt-6 text-sm leading-6 text-white/40">
                    Nenhuma peça adicionada
                    à Curadoria.
                  </p>
                ) : (
                  <div className="mt-6 divide-y divide-white/10">
                    {items.map(
                      ({
                        product,
                        quantity,
                      }) => (
                        <article
                          key={
                            product.id
                          }
                          className="py-4 first:pt-0"
                        >
                          <div className="flex justify-between gap-5">
                            <div>
                              <p className="text-sm font-medium text-white">
                                {
                                  product.name
                                }
                              </p>

                              <p className="mt-1 text-xs text-white/35">
                                {
                                  product.collection
                                }
                              </p>
                            </div>

                            <span className="shrink-0 text-sm text-white/60">
                              {quantity} un.
                            </span>
                          </div>

                          <div className="mt-3 flex justify-between text-xs">
                            <span className="text-white/30">
                              Subtotal
                              diário
                            </span>

                            <span className="text-[#c6a56a]">
                              R${' '}
                              {(
                                product.pricePerDay *
                                quantity
                              ).toFixed(
                                2
                              )}
                            </span>
                          </div>
                        </article>
                      )
                    )}
                  </div>
                )}

                <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">
                      Peças
                    </span>

                    <span className="text-white">
                      {
                        totalUnits
                      }{' '}
                      un.
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">
                      Período
                    </span>

                    <span className="text-white">
                      {eventDays}{' '}
                      {eventDays ===
                        1
                        ? 'dia'
                        : 'dias'}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">
                      Estimativa
                      diária
                    </span>

                    <span className="text-white">
                      R${' '}
                      {dailyEstimate.toFixed(
                        2
                      )}
                    </span>
                  </div>

                  <div className="flex items-end justify-between border-t border-white/10 pt-5">
                    <span className="text-sm text-white/50">
                      Estimativa do
                      período
                    </span>

                    <span className="text-2xl font-light text-[#c6a56a]">
                      R${' '}
                      {estimatedTotal.toFixed(
                        2
                      )}
                    </span>
                  </div>
                </div>

                {/* AVISO */}
                <div className="mt-8 flex gap-3 rounded-2xl border border-[#c6a56a]/20 bg-[#c6a56a]/[0.07] p-4">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#c6a56a]" />

                  <p className="text-[11px] leading-5 text-white/45">
                    Esta solicitação não
                    bloqueia estoque nem
                    confirma a reserva. A
                    disponibilidade será
                    validada pela equipe.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={
                    items.length === 0
                  }
                  className="mt-6 flex min-h-13 w-full items-center justify-center gap-3 rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-[#c6a56a] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <MessageCircle className="h-4 w-4" />

                  Enviar solicitação
                </button>

                <p className="mt-3 text-center text-[10px] leading-4 text-white/25">
                  Você será direcionado
                  ao WhatsApp para enviar
                  a solicitação.
                </p>
              </aside>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}