---
name: graphics-api-remotion
description: Fetch illustrations, icons, and doodles from 5 free sources for Remotion videos. No API keys required. Includes prefetch utilities for server-side rendering.
---

# Graphics API for Remotion (Agent Self-Service)

> Context-aware graphics from 5 free sources. **Zero API keys.**

## Quick Start for Agents

```typescript
import { query, prefetchGraphics, getGraphicsForContext } from 'graphics-api-remotion';

// Describe scene → get matching graphics
const graphics = await query("developer coding laptop startup");
const prefetched = await prefetchGraphics(graphics);
```

## Context-Aware Selection

The `query()` function understands natural language:

```typescript
// These all work with context matching:
await query("user making payment");      // → credit-card, wallet, bank icons
await query("team celebrating success"); // → trophy, check, star, users icons  
await query("error warning security");   // → alert-triangle, shield, x icons
await query("developer coding laptop");  // → code, terminal + tech illustrations
```

## Direct Provider Access (For Unlisted Categories)

**For categories NOT in the context mappings, access providers directly:**

```typescript
import { phosphor, lucide, iconoodle, storyset, doodleIpsum } from 'graphics-api-remotion';

// Icons - search by ANY term
const custom = await phosphor.search(['your-term', 'another-term']);
const lucideIcons = await lucide.search(['any-keyword']);

// Iconoodle - 19 packs with 2000+ doodles
const animals = await iconoodle.search(['cat'], { pack: 'doodles-cute-animals' });
const food = await iconoodle.search(['pizza'], { pack: 'doodles-fast-food-doodle-art' });
const tech = await iconoodle.search(['network'], { pack: 'doodles-internet-network-doodles' });
const ai = await iconoodle.search(['robot'], { pack: 'doodles-ai-icon-doodles' });

// List all available packs
console.log(iconoodle.packs); // 19 themed packs

// Get random from any pack
const random = await iconoodle.getRandom({ pack: 'christmas-illustration', count: 5 });

// Storyset - search ANY illustration topic
const illustrations = await storyset.search(['your-topic']);
```

## Available Iconoodle Packs

| Pack | Content |
|------|---------|
| `doodles` | Main (2000+ items) |
| `doodles-cute-animals` | Animals |
| `doodles-fast-food-doodle-art` | Food |
| `doodles-hand-drawn-lifestyle-doodle` | Lifestyle |
| `doodles-internet-network-doodles` | Tech/Network |
| `doodles-ai-icon-doodles` | AI/Robot |
| `christmas-illustration` | Holiday |
| `doodles-educational-doodles` | Education |
| `cars-icons` | Vehicles |
| `candy-icons` | Colorful |
| `3d-like-shape-doodles` | 3D shapes |
| `brutalist-doodles` | Bold/Minimal |

## Context Keyword Reference

### Actions
`send`, `receive`, `pay`, `buy`, `login`, `logout`, `signup`, `share`, `like`, `save`, `delete`, `edit`, `upload`, `download`, `search`, `code`, `build`, `deploy`, `launch`, `test`, `approve`, `reject`, `celebrate`

### Subjects  
`user`, `team`, `payment`, `message`, `notification`, `file`, `database`, `api`, `success`, `error`, `warning`, `chart`, `security`, `code`, `developer`

### Themes (Storyset)
`business`, `technology`, `finance`, `education`, `health`, `startup`, `ecommerce`, `security`, `analytics`, `social`

## Remotion Integration

```typescript
import { Composition } from 'remotion';
import { query, prefetchGraphics } from 'graphics-api-remotion';

<Composition
  calculateMetadata={async ({ props }) => {
    const graphics = await query(props.storyline);
    const prefetched = await prefetchGraphics(graphics);
    return { props: { ...props, graphics: prefetched } };
  }}
/>
```

## Links

- npm: https://www.npmjs.com/package/graphics-api-remotion
- GitHub: https://github.com/siva-sub/graphics-api-remotion
