# TECHNICAL_ARCHITECTURE.md

# Project Sirius

Versão: 1.0

Status: Arquitetura Base

---

# Objetivo

Construir um e-commerce cinematográfico, altamente performático, escalável e preparado para futuras funcionalidades inteligentes, utilizando tecnologias modernas e priorizando a melhor experiência do usuário.

---

# Princípios Técnicos

- Performance acima de efeitos visuais.
- Experiência acima da quantidade de funcionalidades.
- Código modular.
- Componentização extrema.
- Escalabilidade desde o primeiro commit.
- Arquitetura AI-Friendly.
- Clean Code.
- Clean Architecture.
- Design System Driven.

---

# Stack Principal

Framework

Next.js

---

Linguagem

TypeScript

---

Runtime

Node.js LTS

---

UI

React

---

Estilização

Tailwind CSS

---

Componentes

shadcn/ui

---

Animações

GSAP

Framer Motion

---

3D

React Three Fiber

Three.js

Drei

---

Modelagem

Blender

Spline

---

Banco

Supabase PostgreSQL

---

Autenticação

Supabase Auth

---

Storage

Supabase Storage

---

Deploy

Vercel

---

Versionamento

Git

GitHub

---

CI/CD

GitHub Actions

---

Monitoramento

Sentry

---

Analytics

Google Analytics 4

PostHog

---

SEO

Next SEO

Metadata API

Schema.org

---

Performance

Lazy Loading

Image Optimization

Dynamic Imports

Code Splitting

Asset Compression

---

# Estrutura de Pastas

/app

/components

/components/ui

/components/3d

/components/layout

/components/sections

/components/common

/lib

/hooks

/services

/types

/styles

/assets

/public

/prisma (caso seja utilizado futuramente)

/supabase

/docs

/scripts

/tests

---

# Organização das Scenes

Scene01

Scene02

Scene03

Scene04

Scene05

...

Cada cena será um componente independente.

Nenhuma cena conhece a implementação da outra.

---

# Organização dos Objetos 3D

Cada objeto será independente.

Prato

Taça

Talher

Guardanapo

Sousplat

Mesa

Luz

Partículas

Cada um possuirá:

Model

Material

Animation

Interaction

Loader

---

# Organização das Animações

Todas as animações serão centralizadas.

Nunca criar animações espalhadas pelo projeto.

Estrutura:

animations/

timeline.ts

hero.ts

products.ts

scroll.ts

transition.ts

---

# Organização dos Dados

products

categories

collections

materials

scenes

experiences

orders

users

---

# Estrutura do Banco

Users

Addresses

Products

Collections

Materials

Images

Orders

Order Items

Experiences

Configurations

Favorites

Newsletter

---

# Assets

Modelos GLB

Texturas PBR

HDRI

Áudios

Vídeos

Ícones SVG

---

# Performance

Meta:

Lighthouse

Performance > 95

SEO > 100

Accessibility > 95

Best Practices > 100

---

FPS

Objetivo

60 FPS

Mínimo aceitável

45 FPS

---

Estratégia de Carregamento

Primeira cena

Carregamento imediato.

Demais cenas

Lazy Loading.

Objetos 3D

Streaming.

Texturas

Compressão KTX2.

---

Preparação para IA

A arquitetura deverá permitir no futuro:

Recomendação inteligente.

Busca semântica.

Chat com consultor virtual.

Montagem de ambientes.

Personalização de vitrines.

Sem necessidade de reescrever a arquitetura.

---

Princípio Final

A arquitetura existe para tornar a experiência invisível.

O usuário nunca deve perceber a tecnologia.

Ele apenas deve sentir que tudo funciona perfeitamente.