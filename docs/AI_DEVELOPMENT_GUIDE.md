# AI DEVELOPMENT GUIDE

Projeto: Sirius

Versão: 2.0

---

# Objetivo

Este documento define como agentes de IA devem trabalhar no Sirius.

Aplica-se ao ChatGPT, Antigravity, Cursor e qualquer outro agente utilizado durante o desenvolvimento.

---

# Princípio Fundamental

Nunca implemente funcionalidades além do escopo solicitado.

Antes de criar novas funcionalidades, respeite:

1. documentação oficial;

2. arquitetura oficial;

3. regras de negócio.

---

# Prioridade

Sempre seguir esta ordem:

PROJECT_VISION

↓

BUSINESS_RULES

↓

TECHNICAL_ARCHITECTURE

↓

DATABASE_ARCHITECTURE

↓

EXPERIENCE_SCRIPT

↓

EXPERIENCE_PRINCIPLES

↓

IMPLEMENTATION_ROADMAP

---

# Nunca assumir

Nunca criar:

* fluxos novos;
* componentes novos;
* regras novas;
* telas novas;

sem que estejam documentados.

---

# Componentes

Criar componentes pequenos.

Responsabilidade única.

Reutilizáveis.

Tipados.

Sem lógica de negócio.

---

# Regras

Toda regra de negócio deve ficar em:

lib/

Nunca em componentes visuais.

---

# Three.js

O código 3D deve ser modular.

Separar:

* câmera
* iluminação
* ambiente
* objetos
* animações

---

# Recommendation Engine

Não utilizar IA.

Baseado apenas em regras.

---

# Commits

Todo desenvolvimento segue:

Implementação

↓

Revisão

↓

Commit

↓

Push

Nunca realizar push sem revisão.

---

# Objetivo Final

Todo código produzido deve contribuir para o mesmo propósito:

Entregar a experiência mais elegante, imersiva e memorável do mercado de locação para eventos.
