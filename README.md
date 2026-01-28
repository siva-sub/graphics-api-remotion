# graphics-api-remotion

> **Context-aware graphics API for Remotion** - Fetch illustrations, icons, and doodles from 5 free sources. Zero API keys required.

[![npm version](https://img.shields.io/npm/v/graphics-api-remotion.svg)](https://www.npmjs.com/package/graphics-api-remotion)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎯 **Context-aware** - Describe your scene, get matching graphics
- 🔑 **No API keys** - All 5 providers work out of the box  
- 🎬 **Remotion-ready** - Prefetch utilities for SSR
- 📦 **ESM native** - Full TypeScript support
- 🎨 **SVG focus** - Crisp graphics at any resolution

## 📦 Installation

```bash
npm install graphics-api-remotion
```

## 🚀 Quick Start

### Context-Aware Query

```typescript
import { query, getGraphicsForContext } from 'graphics-api-remotion';

// Describe your scene → get matching graphics
const graphics = await query("developer coding startup success");
// Returns icons, illustrations, and doodles matching your context

// Get categorized results
const scene = await getGraphicsForContext("team celebrating launch");
// → { icons: [...], illustrations: [...], doodles: [...] }
```

### Remotion Integration

**Important**: Remotion can't use external URLs during render. Use `prefetchGraphics()`:

```typescript
import { Composition } from 'remotion';
import { query, prefetchGraphics } from 'graphics-api-remotion';

export const MyVideo = () => (
  <Composition
    id="Scene"
    component={SceneComponent}
    calculateMetadata={async ({ props }) => {
      // 1. Query graphics by context
      const graphics = await query(props.storyline);
      // 2. Prefetch to data URIs (required for Remotion render)
      const prefetched = await prefetchGraphics(graphics);
      return { props: { ...props, graphics: prefetched } };
    }}
  />
);
```

## 🎨 Providers (5 Sources, No Auth)

| Provider | Content | Count | Features |
|----------|---------|-------|----------|
| **Phosphor** | Icons | 1,200+ | 6 weights (thin→fill) |
| **Lucide** | Icons | 1,500+ | Consistent stroke style |
| **Iconoodle** | Icons, Doodles, Illustrations | 2,000+ | 19 themed packs |
| **Storyset** | Illustrations | 2,000+ | Professional SVGs |
| **Doodle Ipsum** | Doodles | Unlimited | 4 styles |

## 📚 Direct Provider Access

For specific needs, access providers directly:

```typescript
import { phosphor, lucide, iconoodle, storyset, doodleIpsum } from 'graphics-api-remotion';

// Phosphor icons (6 weights)
const icon = await phosphor.get({ name: 'check', weight: 'bold' });
const icons = await phosphor.search(['arrow', 'user', 'star']);

// Lucide icons
const settings = await lucide.get({ name: 'settings' });

// Iconoodle (19 packs - icons, doodles, AND illustrations)
await iconoodle.search(['payment'], { pack: 'doodles' });
await iconoodle.search(['cat'], { pack: 'doodles-cute-animals' });
await iconoodle.search(['robot'], { pack: 'doodles-ai-icon-doodles' });
await iconoodle.search(['pizza'], { pack: 'doodles-fast-food-doodle-art' });
console.log(iconoodle.packs); // List all 19 packs

// Storyset (professional illustrations)
const illustrations = await storyset.search(['technology', 'developer']);

// Doodle Ipsum (4 styles: flat, hand-drawn, outlined, abstract)
const doodle = doodleIpsum.getRandom({ style: 'flat', width: 200, height: 200 });
```

## 📍 Context Keyword Reference

| Context | Returns |
|---------|---------|
| `"send payment"` | credit-card, wallet, arrow-right |
| `"user login"` | log-in, user, key, lock |
| `"success celebrate"` | trophy, check, star |
| `"developer coding"` | code, terminal + tech illustrations |
| `"team meeting"` | users + business illustrations |
| `"error warning"` | alert-triangle, x-circle |

## 🔧 Prefetch Functions

| Function | Purpose |
|----------|---------|
| `prefetchGraphics(graphics[])` | Batch convert to data URIs |
| `prefetchGraphic(graphic)` | Single convert to data URI |
| `svgToDataUri(svg)` | Convert SVG string to data URI |
| `getPrefetchedUrl(graphic)` | Get URL (uses embedded SVG if available) |

## 🎭 Iconoodle Packs

| Pack | Content |
|------|---------|
| `doodles` | Main (2,000+ items) |
| `doodles-cute-animals` | Animals |
| `doodles-fast-food-doodle-art` | Food |
| `doodles-hand-drawn-lifestyle-doodle` | Lifestyle |
| `doodles-internet-network-doodles` | Tech/Network |
| `doodles-ai-icon-doodles` | AI/Robot |
| `doodles-educational-doodles` | Education |
| `christmas-illustration` | Holiday |
| `brutalist-doodles` | Bold/Minimal |
| `3d-like-shape-doodles` | 3D shapes |
| `candy-icons` | Colorful |
| `cars-icons` | Vehicles |

## 🧪 Testing

```bash
npm run test:endpoints    # Provider connectivity
npm run test:remotion     # Remotion integration
npm run test:prefetch     # Prefetch verification
```

## 📄 License

MIT © [siva-sub](https://github.com/siva-sub)

---

**Links:** [npm](https://www.npmjs.com/package/graphics-api-remotion) • [GitHub](https://github.com/siva-sub/graphics-api-remotion)
