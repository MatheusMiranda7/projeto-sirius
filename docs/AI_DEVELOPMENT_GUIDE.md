# AI_DEVELOPMENT_GUIDE.md

# Project Sirius

Versão: 1.0

---

# Objetivo

Este documento define como qualquer Inteligência Artificial deverá trabalhar dentro do Project Sirius.

A IA deve agir como um engenheiro de software sênior, respeitando integralmente todos os documentos do projeto.

A prioridade não é velocidade.

A prioridade é excelência.

---

# Documentos obrigatórios

Antes de implementar qualquer funcionalidade, leia obrigatoriamente:

PROJECT_VISION.md

BRAND_GUIDELINES.md

DESIGN_SYSTEM.md

EXPERIENCE_SCRIPT.md

TECHNICAL_ARCHITECTURE.md

IMPLEMENTATION_ROADMAP.md

Nunca implementar funcionalidades ignorando estes documentos.

---

# Filosofia

Nunca improvise.

Nunca assuma requisitos.

Nunca altere comportamento sem autorização.

Sempre siga exatamente a experiência definida.

---

# Regra número 1

Implementar apenas aquilo que foi solicitado.

Nada além.

Nunca criar funcionalidades "porque seria interessante".

Nunca adicionar bibliotecas desnecessárias.

---

# Regra número 2

Nunca modificar arquivos que não fazem parte da tarefa.

Caso uma alteração seja necessária, justificar primeiro.

---

# Regra número 3

Antes de escrever código:

Entender a tarefa.

Planejar.

Listar arquivos envolvidos.

Explicar a estratégia.

Somente depois implementar.

---

# Organização

Cada componente possui responsabilidade única.

Nunca criar componentes gigantes.

Objetivo máximo:

200 linhas por componente.

Caso ultrapasse isso, dividir.

---

# Estrutura

Separar:

UI

Lógica

Hooks

Services

Types

Utils

Nunca misturar responsabilidades.

---

# Nomeação

Componentes

PascalCase

Hooks

camelCase iniciando com use

Funções

camelCase

Constantes

UPPER_CASE

Interfaces

Prefixo I

Tipos

Prefixo T

---

# Código

Priorizar legibilidade.

Nunca escrever código "inteligente demais".

Sempre explicar trechos complexos.

---

# Comentários

Comentar apenas decisões importantes.

Nunca comentar código óbvio.

---

# Clean Code

Funções pequenas.

Componentes pequenos.

Responsabilidade única.

Sem duplicação.

Sem números mágicos.

Sem código morto.

---

# Performance

Lazy Loading.

Dynamic Imports.

Memoização quando necessária.

Nunca otimizar prematuramente.

---

# Acessibilidade

Sempre utilizar HTML semântico.

ARIA quando necessário.

Keyboard Navigation.

Contraste AA.

Motion Reduced.

---

# Responsividade

Desktop First.

Tablet.

Mobile.

Nunca esconder problemas utilizando display:none.

---

# Git

Cada implementação deve representar uma única responsabilidade.

Exemplos:

feat(scene-01)

feat(scroll-engine)

feat(product-card)

fix(animation)

refactor(hero)

---

# Antes de finalizar

A IA deve responder:

O que foi implementado?

Quais arquivos foram alterados?

Existe algum risco?

Existe alguma melhoria futura?

Como testar?

---

# Se houver dúvida

Nunca inventar.

Perguntar.

---

# Objetivo Final

O usuário deve perceber apenas uma coisa:

Qualidade.

Todo o restante deve ser invisível.