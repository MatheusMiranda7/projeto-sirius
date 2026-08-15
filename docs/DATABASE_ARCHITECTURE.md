# DATABASE ARCHITECTURE

Projeto: Sirius

Versão: 1.0

Status: Oficial

---

# Objetivo

Este documento define toda a arquitetura de dados do Sirius.

Toda implementação do banco de dados deverá seguir esta especificação.

---

# Filosofia

O banco deve representar o negócio.

Nenhuma regra crítica deverá existir exclusivamente no frontend.

Toda informação deve possuir uma única fonte de verdade.

---

# Banco de Dados

Banco:

PostgreSQL

Plataforma:

Supabase

---

# Entidades Principais

## Categories

Representa os grupos de produtos.

Campos:

* id
* name
* slug
* description
* active
* created_at
* updated_at

---

## Products

Representa os produtos alugados.

Campos:

* id
* category_id
* sku
* name
* slug
* description
* image_url
* model_3d_url
* active
* created_at
* updated_at

---

## Inventory

Representa o estoque físico.

Campos:

* id
* product_id
* total_quantity
* maintenance_quantity
* unavailable_quantity
* created_at
* updated_at

Disponível =

total_quantity

*

maintenance_quantity

*

unavailable_quantity

---

## Customers

Campos:

* id
* name
* phone
* email
* created_at

---

## Reservations

Campos:

* id
* customer_id
* reservation_code
* event_type
* event_start
* event_end
* guest_count
* status
* notes
* created_at
* updated_at

---

## Reservation Items

Campos:

* id
* reservation_id
* product_id
* quantity

---

## Recommendation Rules

Campos:

* id
* source_product_id
* recommended_product_id
* score
* event_type
* style
* active

---

# Status Oficiais

Reservation Status

REQUESTED

CONFIRMED

CANCELLED

COMPLETED

Somente CONFIRMED compromete estoque.

---

# Disponibilidade

A disponibilidade é calculada considerando:

* estoque físico;
* manutenção;
* indisponibilidade;
* reservas confirmadas;
* conflito de período.

---

# Regra de Conflito

Existe conflito quando:

novo_evento.start <= reserva.end

E

novo_evento.end >= reserva.start

---

# Solicitação

Uma solicitação:

* NÃO bloqueia estoque;
* NÃO gera reserva;
* apenas registra interesse.

---

# Confirmação

Quando aprovada pela empresa:

REQUESTED

↓

CONFIRMED

Nesse momento o estoque passa a considerar a reserva.

---

# Evolução futura

Na V2 poderão ser adicionadas:

* usuários
* permissões
* pagamentos
* contratos
* entregas
* logística
* dashboards
* analytics
* auditoria
