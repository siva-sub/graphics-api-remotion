# graphics-api-remotion

> **Context-aware graphics API for Remotion** - Fetch illustrations, icons, and doodles from 5 free sources. Zero API keys required.

[![npm version](https://img.shields.io/npm/v/graphics-api-remotion.svg)](https://www.npmjs.com/package/graphics-api-remotion)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎯 **Context-aware** - Describe your scene, get matching graphics
- 🔑 **No API keys** - All 5 providers work out of the box
- 🎬 **Remotion-ready** - Prefetch utilities for SSR
- 📦 **ESM native** - Full TypeScript support

## 📦 Installation

```bash
npm install graphics-api-remotion
```

## 🚀 Quick Start

### Context-Aware Query

```typescript
import { query, getGraphicsForContext } from 'graphics-api-remotion';

// Describe your scene → get matching graphics
const graphics = await query("user sends payment confirmation");
// Returns: credit-card, wallet, check icons + relevant illustrations

// Get categorized by type
const scene = await getGraphicsForContext("developer coding startup");
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
      // 2. Prefetch to data URIs
      const prefetched = await prefetchGraphics(graphics);
      return { props: { ...props, graphics: prefetched } };
    }}
  />
);
```

### Direct Provider Access

```typescript
import { phosphor, lucide, iconoodle, storyset, doodleIpsum } from 'graphics-api-remotion';

// Phosphor icon with weight
const icon = await phosphor.get({ name: 'check', weight: 'bold' });
const icons = await phosphor.search(['arrow', 'user', 'check']);

// Lucide icons
const settings = await lucide.get({ name: 'settings' });

// Iconoodle (19+ packs available)
const doodles = await iconoodle.search(['arrow'], { pack: 'brutalist-doodles', limit: 5 });

// Storyset illustrations
const illustrations = await storyset.search(['technology']);

// Doodle Ipsum
const doodle = doodleIpsum.getRandom({ style: 'flat', width: 200, height: 200 });
```

## 📚 Context Mappings

| Context | Returns |
|---------|---------|
| `"send payment"` | credit-card, wallet, arrow-right |
| `"user login"` | log-in, user, key, lock |
| `"success"` | trophy, check, star, celebration |
| `"developer coding"` | code, terminal + tech illustrations |
| `"team meeting"` | users, building + business illustrations |

## 🔧 Prefetch Functions

| Function | Purpose |
|----------|---------|
| `prefetchGraphics(graphics[])` | Convert array to data URIs |
| `prefetchGraphic(graphic)` | Convert single to data URI |
| `svgToDataUri(svg)` | Convert SVG string to data URI |
| `getPrefetchedUrl(graphic)` | Get prefetched URL (uses svg if available) |

## 🎨 Providers

| Provider | Type | Count | Features |
|----------|------|-------|----------|
| **Phosphor** | Icons | 1,200+ | 6 weights (thin→fill) |
| **Lucide** | Icons | 1,500+ | Consistent style |
| **Iconoodle** | Doodles | 2,000+ | 19 themed packs |
| **Storyset** | Illustrations | Many | Animated SVG |
| **Doodle Ipsum** | Doodles | Unlimited | 4 styles |

## 🧪 Testing

```bash
npm run test:endpoints    # Provider connectivity
npm run test:remotion     # Remotion integration
```

## 📄 License

MIT © [siva-sub](https://github.com/siva-sub)

---

**Links:** [npm](https://www.npmjs.com/package/graphics-api-remotion) • [GitHub](https://github.com/siva-sub/graphics-api-remotion)
