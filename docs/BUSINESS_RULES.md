# BUSINESS RULES

**Projeto:** Sirius

**Versão:** 1.0

---

# Objetivo

Este documento define todas as regras de negócio oficiais do Sirius.

Toda implementação deve seguir estas regras.

---

# Catálogo

Todos os produtos pertencem a uma categoria.

Cada produto possui:

* nome;
* descrição;
* imagens;
* modelo 3D;
* estoque físico;
* status.

---

# Estoque

O estoque representa a quantidade física disponível da empresa.

O estoque nunca pode assumir valores negativos.

---

# Disponibilidade

Disponibilidade é calculada considerando:

* estoque físico;
* itens indisponíveis;
* reservas confirmadas;
* período solicitado.

---

# Reserva

Uma reserva possui:

* cliente;
* data inicial;
* data final;
* itens;
* quantidades;
* status.

---

# Status da Reserva

Solicitada

Confirmada

Cancelada

Finalizada

Apenas reservas confirmadas comprometem o estoque.

---

# Solicitação de Orçamento

Uma solicitação de orçamento NÃO bloqueia estoque.

Ela apenas registra interesse do cliente.

---

# Recommendation Engine

As recomendações NÃO utilizam IA na V1.

Elas são calculadas através de regras.

Cada produto pode recomendar outros produtos compatíveis.

Cada combinação possui uma pontuação.

---

# Produtos Indisponíveis

Quando um produto não estiver disponível para o período solicitado:

O Sirius nunca deve apresentar apenas um erro.

O sistema deve procurar automaticamente alternativas compatíveis.

---

# Minha Composição

A composição representa todas as escolhas do usuário.

Ela contém:

* produtos;
* quantidades;
* convidados;
* período;
* estilo;
* recomendações.

---

# WhatsApp

Ao finalizar a composição:

O Sirius gera automaticamente uma mensagem.

Essa mensagem contém:

* nome do cliente;
* período do evento;
* quantidade de convidados;
* itens;
* quantidades.

O usuário apenas confirma o envio.

---

# Painel Administrativo

Não faz parte da V1.

Será desenvolvido posteriormente.

---

# Indicadores futuros

* produtos mais selecionados;
* produtos mais alugados;
* taxa de conversão;
* ticket médio;
* ocupação do estoque;
* sazonalidade;
* recomendações mais aceitas.
