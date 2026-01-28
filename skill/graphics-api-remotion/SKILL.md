---
name: graphics-api-remotion
description: Fetch illustrations, icons, and doodles from 5 free sources for Remotion videos. No API keys required. Includes prefetch utilities for server-side rendering.
---

# Graphics API for Remotion

> Context-aware graphics selection from 5 free sources. **Zero API keys required.**

## When to Use

- Adding graphics to Remotion video storylines
- Finding icons/illustrations based on scene context
- Prefetching assets for server-side rendering

## Installation

```bash
npm install graphics-api-remotion
```

## Remotion Integration (Prefetch Required)

**Important**: Remotion can't use external URLs during render. Use `prefetchGraphics()`:

```typescript
import { Composition } from 'remotion';
import { query, prefetchGraphics } from 'graphics-api-remotion';

<Composition
  id="StoryScene"
  calculateMetadata={async ({ props }) => {
    // 1. Query graphics
    const graphics = await query(props.storyline);
    // 2. Prefetch to data URIs
    const prefetched = await prefetchGraphics(graphics);
    return { props: { ...props, graphics: prefetched } };
  }}
/>
```

## Context-Based Selection

```typescript
import { query, getIconsForContext, getGraphicsForContext } from 'graphics-api-remotion';

// Describe your scene → get matching graphics
const graphics = await query("user sends payment");
// Returns: credit-card, wallet, bank icons

// Get categorized graphics
const scene = await getGraphicsForContext("team coding startup");
// Returns: { icons: 3, illustrations: 30, doodles: 10 }
```

## Context Mappings

| Context | Returns |
|---------|---------|
| "send payment" | credit-card, wallet, arrow-right |
| "user login" | log-in, user, key, lock |
| "success" | trophy, check, star |
| "developer coding" | code, terminal + technology illustrations |

## Prefetch Functions

| Function | Purpose |
|----------|---------|
| `prefetchGraphics(graphics)` | Convert array to data URIs |
| `prefetchGraphic(graphic)` | Convert single to data URI |
| `svgToDataUri(svg)` | Convert SVG string to data URI |
| `getPrefetchedUrl(graphic)` | Get prefetched URL from graphic |

## Direct Provider Access

```typescript
import { phosphor, lucide, iconoodle, storyset, doodleIpsum } from 'graphics-api-remotion';

// Phosphor icon with weight
const icon = await phosphor.get({ name: 'check', weight: 'bold' });

// Iconoodle (19+ packs available)
const doodles = await iconoodle.search(['arrow'], { pack: 'brutalist-doodles' });

// Storyset illustration
const illustrations = await storyset.search(['technology']);
```

## Providers (5 sources, no auth)

| Provider | Content | Count |
|----------|---------|-------|
| Doodle Ipsum | Doodles | Unlimited |
| Storyset | Illustrations | Many |
| Phosphor | Icons (6 weights) | 1,200+ |
| Lucide | Icons | 1,500+ |
| Iconoodle | Doodles/Icons | 2,000+ (19 packs) |

## Source Code

GitHub: https://github.com/siva-sub/graphics-api-remotion
npm: https://www.npmjs.com/package/graphics-api-remotion
