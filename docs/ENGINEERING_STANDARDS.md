# ENGINEERING STANDARDS

**Projeto:** Sirius
**Versão:** 1.0
**Status:** Oficial

---

# Objetivo

Este documento define os padrões de engenharia do Project Sirius.

Toda implementação deve seguir estas regras para garantir consistência, legibilidade, escalabilidade e manutenção futura.

---

# Princípios Gerais

1. Clareza antes de abstração.
2. Simplicidade antes de complexidade.
3. Reutilização sem excesso de generalização.
4. Tipagem obrigatória.
5. Separação entre interface, domínio e infraestrutura.
6. Componentes pequenos.
7. Funções com responsabilidade única.
8. Nenhuma regra de negócio dentro da camada visual.
9. Código legível antes de código “inteligente”.
10. Toda alteração deve preservar a experiência definida nos documentos oficiais.

---

# Fonte Oficial de Verdade

Toda implementação deve respeitar, nesta ordem:

1. `PROJECT_VISION.md`
2. `BUSINESS_RULES.md`
3. `TECHNICAL_ARCHITECTURE.md`
4. `DATABASE_ARCHITECTURE.md`
5. `EXPERIENCE_SCRIPT.md`
6. `EXPERIENCE_PRINCIPLES.md`
7. `DESIGN_SYSTEM.md`
8. `IMPLEMENTATION_ROADMAP.md`
9. `AI_DEVELOPMENT_GUIDE.md`
10. `ENGINEERING_STANDARDS.md`

Em caso de conflito entre código existente e documentação oficial, a documentação deve ser revisada antes de qualquer decisão.

---

# Stack Oficial

Frontend:

* Next.js
* React
* TypeScript
* Tailwind CSS
* Motion
* React Three Fiber
* Three.js

Backend:

* Supabase
* PostgreSQL

Estado:

* React state para estado local
* Zustand apenas quando houver necessidade real de compartilhamento entre áreas da aplicação

Outras bibliotecas:

* Lucide React
* clsx
* tailwind-merge

---

# Organização de Pastas

Estrutura base:

```text
src/
  app/

  components/
    3d/
    catalog/
    composition/
    quote/
    ui/

  lib/
    availability/
    recommendations/
    supabase/
    whatsapp/

  stores/

  types/

  data/

  hooks/
```

---

# Regra de Responsabilidade

Cada diretório deve possuir uma função clara.

## `components/`

Responsável pela apresentação.

Não deve conter regras críticas de negócio.

---

## `lib/`

Responsável pela lógica de domínio, regras, cálculos e integrações.

Exemplos:

* disponibilidade;
* recommendation engine;
* formatação de mensagem WhatsApp;
* acesso ao Supabase.

---

## `stores/`

Responsável por estados globais realmente compartilhados.

Não deve ser utilizado como substituto para props ou estado local.

---

## `types/`

Responsável por tipos e interfaces compartilhadas.

---

## `data/`

Responsável por dados estáticos, presets e mocks temporários.

---

## `hooks/`

Responsável por lógica React reutilizável.

Não criar hooks para lógica que não depende do ciclo de vida do React.

---

# Convenção de Nomes

## Componentes React

PascalCase.

Exemplos:

```text
ExperienceCanvas.tsx
CompositionSummary.tsx
AvailabilityBadge.tsx
```

---

## Funções

camelCase.

Exemplos:

```text
calculateAvailability
buildWhatsAppMessage
getRecommendations
```

---

## Variáveis

camelCase.

Exemplos:

```text
availableQuantity
selectedProducts
eventDate
```

---

## Constantes

UPPER_SNAKE_CASE quando forem globais e imutáveis.

Exemplo:

```text
MAX_GUEST_COUNT
DEFAULT_BUFFER_HOURS
```

---

## Tipos

PascalCase.

Exemplos:

```text
Product
Reservation
Composition
AvailabilityResult
```

---

# Componentes

Um componente deve possuir uma única responsabilidade principal.

Evitar componentes extremamente grandes.

Quando um componente começar a acumular:

* regras;
* estados complexos;
* várias áreas visuais;
* múltiplas responsabilidades;

ele deve ser dividido.

---

# Props

Props devem ser tipadas explicitamente.

Evitar `any`.

Exemplo:

```ts
interface ProductCardProps {
  product: Product;
  selected: boolean;
  onSelect: (product: Product) => void;
}
```

---

# TypeScript

É proibido utilizar `any` sem justificativa explícita.

Preferir:

```ts
unknown
```

quando o tipo ainda não for conhecido.

Não duplicar tipos.

Tipos compartilhados devem ficar em `src/types`.

---

# Regras de Negócio

Nunca implementar regras importantes diretamente dentro de:

```text
page.tsx
componentes React
arquivos de estilo
```

Exemplo incorreto:

```ts
const available = stock - reservations;
```

dentro de um componente.

Exemplo correto:

```text
src/lib/availability/calculateAvailability.ts
```

---

# Recommendation Engine

Toda lógica de recomendação deverá existir dentro de:

```text
src/lib/recommendations/
```

O componente visual apenas recebe o resultado.

---

# Availability Engine

Toda lógica de disponibilidade deverá existir dentro de:

```text
src/lib/availability/
```

Deve possuir testes independentes da interface.

---

# Supabase

Toda configuração e acesso ao Supabase deverá ficar em:

```text
src/lib/supabase/
```

Nunca espalhar chamadas diretas ao Supabase em diversos componentes.

---

# Variáveis de Ambiente

Credenciais nunca devem ser salvas diretamente no código.

Utilizar:

```text
.env.local
```

Exemplo:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

`.env.local` nunca deve entrar no Git.

---

# Three.js e React Three Fiber

O código 3D deve ser modular.

Evitar um único componente contendo toda a cena.

Estrutura esperada:

```text
components/3d/

  ExperienceCanvas.tsx

  camera/
    CameraController.tsx

  lighting/
    LightRig.tsx

  environment/
    SceneEnvironment.tsx

  objects/
    Table.tsx
    Plate.tsx
    Glass.tsx
    Cutlery.tsx

  effects/
    SceneEffects.tsx
```

---

# Câmera

A câmera nunca deve ser controlada diretamente por componentes de produto.

Toda movimentação deve passar por uma camada responsável pela câmera.

---

# Iluminação

A iluminação deve permanecer desacoplada dos objetos.

Produtos não devem criar suas próprias luzes, salvo exceções devidamente justificadas.

---

# Performance 3D

Sempre considerar:

* número de polígonos;
* quantidade de draw calls;
* tamanho de texturas;
* compressão de modelos;
* lazy loading;
* descarte de recursos;
* uso moderado de sombras.

Modelos 3D devem ser otimizados antes da produção.

---

# Assets 3D

Preferir:

```text
.glb
```

Modelos devem possuir nomenclatura consistente.

Exemplo:

```text
plate_aurora.glb
glass_crystal.glb
cutlery_imperial.glb
```

---

# Animações

Utilizar Motion para interface.

Utilizar mecanismos próprios do React Three Fiber/Three.js para animações tridimensionais.

Evitar misturar responsabilidades sem necessidade.

---

# Estado

Estado local deve permanecer local sempre que possível.

Utilizar Zustand quando informações precisarem ser compartilhadas entre áreas independentes.

Exemplo adequado:

```text
Minha Composição
```

pode ser estado global.

Exemplo inadequado:

```text
isHovered
```

de um botão.

---

# CSS

Priorizar Tailwind.

Evitar estilos inline extensos.

Tokens visuais devem utilizar variáveis definidas no design system.

Não utilizar valores arbitrários repetidamente quando existir token equivalente.

---

# Responsividade

Toda funcionalidade deve ser desenvolvida considerando:

* desktop;
* tablet;
* mobile.

Nenhuma funcionalidade será considerada concluída se funcionar apenas em desktop.

---

# Acessibilidade

Sempre considerar:

* navegação por teclado;
* contraste;
* foco visível;
* textos alternativos;
* labels;
* `prefers-reduced-motion`.

Animações importantes devem possuir comportamento alternativo para usuários que reduzam movimento.

---

# Tratamento de Erros

Nunca exibir erros técnicos diretamente ao usuário.

Exemplo proibido:

```text
Error fetching reservation
```

Preferir:

```text
Não foi possível verificar esta disponibilidade agora.
Tente novamente em instantes.
```

O erro técnico deve ser registrado separadamente.

---

# Loading

Toda operação assíncrona deve possuir estado de carregamento.

O loading deve preservar a linguagem visual do Sirius.

Evitar spinners genéricos quando uma solução contextual for possível.

---

# Testes

Regras críticas devem possuir testes.

Prioridades:

1. disponibilidade;
2. conflito de reservas;
3. recommendation engine;
4. construção da composição;
5. geração de mensagem WhatsApp.

---

# Testes Manuais

Toda nova experiência visual deverá ser verificada em:

* desktop;
* mobile;
* diferentes tamanhos de tela;
* conexão lenta quando aplicável.

---

# Build

Antes de qualquer commit importante:

```bash
npm run lint
npm run build
```

Ambos devem funcionar.

---

# Git

Fluxo obrigatório:

```text
Implementação
↓
git status
↓
git diff
↓
Code Review
↓
lint
↓
build
↓
commit
↓
push
```

---

# Commits

Mensagens devem seguir padrão simples e objetivo.

Exemplos:

```text
feat: add availability engine
fix: correct reservation date conflict
docs: update Sirius V1 business rules
refactor: split 3d scene responsibilities
chore: install 3d dependencies
```

---

# Commits Proibidos

Evitar:

```text
update
changes
fix stuff
new things
final
teste
```

---

# Branch Principal

`main` representa apenas código revisado.

Nunca realizar:

```bash
git push --force
```

na `main`.

---

# Dependências

Antes de adicionar uma biblioteca, verificar:

1. O projeto realmente precisa dela?
2. A funcionalidade pode ser implementada com a stack existente?
3. A biblioteca é mantida?
4. Existe impacto relevante no bundle?
5. Ela adiciona complexidade desnecessária?

---

# Segurança

Nunca enviar para o Git:

* senhas;
* tokens;
* API keys;
* secrets;
* arquivos `.env`.

Nunca confiar exclusivamente em validações do frontend para regras críticas.

---

# Banco de Dados

Alterações estruturais devem ser versionadas por migrations.

Não modificar produção manualmente sem registrar a mudança correspondente.

---

# Regra de Evolução

O Sirius deve crescer de forma incremental.

Evitar construir funcionalidades futuras antes de existir necessidade real.

A V1 deve priorizar:

* experiência;
* catálogo;
* estoque;
* disponibilidade;
* reservas;
* composição;
* recomendação;
* orçamento;
* WhatsApp.

Dashboard, analytics avançado e administração completa pertencem às versões seguintes.

---

# Critério de Conclusão

Uma funcionalidade só está concluída quando:

* funciona;
* está tipada;
* respeita arquitetura;
* possui tratamento de erro;
* possui loading quando necessário;
* é responsiva;
* não quebra a experiência;
* passa no lint;
* passa no build;
* foi revisada.

---

# Regra Final

Se uma solução tecnicamente sofisticada prejudicar:

* clareza;
* manutenção;
* performance;
* experiência;

ela não é uma boa solução para o Sirius.

O objetivo não é demonstrar complexidade técnica.

O objetivo é utilizar engenharia de alto nível para tornar a complexidade invisível ao usuário.
