---
name: graphics-api-remotion
description: Fetch illustrations, icons, and doodles from 5 free sources for Remotion videos. No API keys required. Includes prefetch utilities for server-side rendering.
---

# Graphics API for Remotion (Agent Self-Service)

> Context-aware graphics from 5 free sources. **Zero API keys.**

## Quick Start

```typescript
import { query, prefetchGraphics } from 'graphics-api-remotion';

// In Remotion calculateMetadata
const graphics = await query(props.storyline);
const prefetched = await prefetchGraphics(graphics);
return { props: { ...props, graphics: prefetched } };
```

## Context-Aware Examples

```typescript
await query("user making payment");      // → credit-card, wallet icons
await query("team celebrating success"); // → trophy, star, users icons  
await query("developer coding laptop");  // → code, terminal + tech illustrations
await query("error warning security");   // → alert-triangle, shield icons
```

## Providers (5 sources, no auth)

| Provider | Content |
|----------|---------|
| **Phosphor** | 1,200+ icons (6 weights) |
| **Lucide** | 1,500+ icons |
| **Iconoodle** | 2,000+ icons, doodles, illustrations (19 packs) |
| **Storyset** | 2,000+ professional illustrations |
| **Doodle Ipsum** | Unlimited doodles (4 styles) |

## Direct Provider Access

**For any category, access providers directly:**

```typescript
import { phosphor, lucide, iconoodle, storyset, doodleIpsum } from 'graphics-api-remotion';

// Icons
await phosphor.search(['check', 'arrow']);
await lucide.search(['settings', 'home']);

// Illustrations (Storyset + Iconoodle)
await storyset.search(['technology', 'business']);
await iconoodle.search(['payment'], { pack: 'doodles' });

// Doodles (Iconoodle + Doodle Ipsum)
await iconoodle.search(['cat'], { pack: 'doodles-cute-animals' });
await iconoodle.search(['robot'], { pack: 'doodles-ai-icon-doodles' });
doodleIpsum.getRandom({ style: 'flat' });
```

## Iconoodle Packs (19 available)

```typescript
// List all packs
console.log(iconoodle.packs);

// Popular packs
'doodles'                          // Main (2000+ items)
'doodles-cute-animals'             // Animals
'doodles-fast-food-doodle-art'     // Food  
'doodles-ai-icon-doodles'          // AI/Robot
'doodles-internet-network-doodles' // Tech/Network
'doodles-educational-doodles'      // Education
'christmas-illustration'           // Holiday
'brutalist-doodles'                // Bold/Minimal
```

## Context Keywords

**Actions:** send, receive, pay, buy, login, logout, signup, share, save, delete, code, build, deploy, launch, celebrate

**Subjects:** user, team, payment, message, file, database, api, success, error, chart, security

**Themes:** business, technology, finance, education, health, startup, ecommerce

## Links

- npm: https://www.npmjs.com/package/graphics-api-remotion
- GitHub: https://github.com/siva-sub/graphics-api-remotion
