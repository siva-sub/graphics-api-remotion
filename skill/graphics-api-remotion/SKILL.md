---
name: graphics-api-remotion
description: Fetch illustrations, icons, and doodles from 5 free sources for Remotion videos. No API keys required. Includes prefetch utilities for server-side rendering.
---

# Graphics API for Remotion

> Context-aware graphics selection from 5 free sources. **Zero API keys.**

## When to Use

- Adding graphics to Remotion video scenes
- Finding icons/illustrations based on scene context
- Prefetching SVG assets for server-side rendering

## Quick Start

```typescript
import { query, prefetchGraphics } from 'graphics-api-remotion';

// In calculateMetadata (Remotion pattern)
const graphics = await query(props.storyline);
const prefetched = await prefetchGraphics(graphics);
return { props: { ...props, graphics: prefetched } };
```

## Context-Based Selection

```typescript
import { query, getGraphicsForContext } from 'graphics-api-remotion';

// Describe scene → get matching graphics
const graphics = await query("user sends payment");
// → credit-card, wallet, check icons

// Get categorized
const scene = await getGraphicsForContext("team coding startup");
// → { icons: 3, illustrations: 30, doodles: 10 }
```

## Context Mappings

| Context | Returns |
|---------|---------|
| `"send payment"` | credit-card, wallet, arrow-right |
| `"user login"` | log-in, user, key, lock |
| `"success"` | trophy, check, star |
| `"developer coding"` | code, terminal + tech illustrations |

## Prefetch (Required for Remotion)

```typescript
import { prefetchGraphics, prefetchGraphic, getPrefetchedUrl } from 'graphics-api-remotion';

// Batch prefetch
const prefetched = await prefetchGraphics(graphics);

// Single prefetch
const icon = await prefetchGraphic(graphic);

// Get data URI from graphic with embedded SVG
const url = getPrefetchedUrl(graphic);
```

## Direct Provider Access

```typescript
import { phosphor, lucide, iconoodle, storyset, doodleIpsum } from 'graphics-api-remotion';

// Phosphor (6 weights)
const icon = await phosphor.get({ name: 'check', weight: 'bold' });
const icons = await phosphor.search(['arrow', 'user']);

// Iconoodle (19 packs)
const doodles = await iconoodle.search(['arrow'], { pack: 'brutalist-doodles' });

// Storyset illustrations
const illustrations = await storyset.search(['technology']);

// Doodle Ipsum (4 styles)
const doodle = doodleIpsum.getRandom({ style: 'flat' });
```

## Providers (5 sources, no auth)

| Provider | Content | Count |
|----------|---------|-------|
| Phosphor | Icons (6 weights) | 1,200+ |
| Lucide | Icons | 1,500+ |
| Iconoodle | Doodles (19 packs) | 2,000+ |
| Storyset | Illustrations | Many |
| Doodle Ipsum | Doodles (4 styles) | Unlimited |

## Links

- npm: https://www.npmjs.com/package/graphics-api-remotion
- GitHub: https://github.com/siva-sub/graphics-api-remotion
