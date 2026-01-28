# graphics-api-remotion

> Context-aware graphics API for Remotion videos. Fetch illustrations, icons, and doodles from 6 free sources with zero API keys.

[![npm](https://img.shields.io/npm/v/graphics-api-remotion)](https://www.npmjs.com/package/graphics-api-remotion)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)

## Features

- 🎨 **6 Graphics Sources** - Illustrations, icons, and hand-drawn doodles
- 🔑 **No API Keys** - All sources work without authentication
- 🧠 **Context-Aware** - Semantic query matches graphics to storyline concepts
- 🎬 **Remotion Ready** - Built for programmatic video creation
- 📦 **TypeScript** - Full type safety

## Install

```bash
npm install graphics-api-remotion
```

## Quick Start

### Context-Based Selection

Describe your scene and get matching graphics:

```typescript
import { query, getGraphicsForContext } from 'graphics-api-remotion';

// Natural language query
const graphics = await query("user sends payment confirmation");
// Returns: credit-card, wallet, bank, send icons

// Get categorized graphics
const scene = await getGraphicsForContext("team coding startup");
// Returns: { icons: 3, illustrations: 30, doodles: 5 }
```

### Context Mappings

| Context | Returns |
|---------|---------|
| `"send payment"` | credit-card, wallet, arrow-right |
| `"user login"` | log-in, user, key, lock |
| `"success"` | trophy, check, star |
| `"error warning"` | alert-triangle, x-circle |
| `"team meeting"` | users + business illustrations |

### Direct Provider Access

```typescript
import { phosphor, lucide, iconoodle, storyset } from 'graphics-api-remotion';

// Icon with weight
const icon = await phosphor.get({ name: 'check', weight: 'bold' });

// Hand-drawn doodle
const doodles = await iconoodle.search(['arrow']);

// Illustration
const illustrations = await storyset.fetch({ category: 'technology' });
```

## Providers

| Provider | Content | Count |
|----------|---------|-------|
| [Doodle Ipsum](https://doodleipsum.com) | Doodles | Unlimited |
| [Storyset](https://storyset.com) | Illustrations | Many categories |
| [IRA Design](https://iradesign.io) | Illustrations | 3 categories |
| [Phosphor](https://phosphoricons.com) | Icons | 1,200+ (6 weights) |
| [Lucide](https://lucide.dev) | Icons | 1,500+ |
| [Iconoodle](https://github.com/NK2552003/Iconoodle) | Doodles | 2,004 |

## Remotion Integration

```tsx
import { Composition } from 'remotion';
import { query } from 'graphics-api-remotion';

<Composition
  id="StoryScene"
  calculateMetadata={async ({ props }) => {
    const graphics = await query(props.storyline);
    return { props: { ...props, graphics } };
  }}
/>
```

## API Reference

### `query(storyline: string)`
Context-aware query returning graphics from all sources.

### `getGraphicsForContext(context: string)`
Returns `{ icons, illustrations, doodles }` for a scene.

### `getIconsForContext(text: string)`
Returns icon names matching a concept.

### Provider Methods
- `provider.get(options)` - Get specific graphic
- `provider.search(terms)` - Search by keywords
- `provider.getUrl(...)` - Get direct URL

## Claude Code Skill

This API is available as a Claude Code skill:

```bash
# Clone to your skills directory
git clone https://github.com/siva-sub/graphics-api-remotion.git
cp -r graphics-api-remotion/skill/graphics-api-remotion ~/.gemini/antigravity/skills/
```

## License

MIT
