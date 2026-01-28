# graphics-api-remotion

> 🎨 Context-aware graphics API for Remotion videos. Fetch illustrations, icons, and doodles from 5 free sources with **zero API keys**.

[![npm version](https://img.shields.io/npm/v/graphics-api-remotion)](https://www.npmjs.com/package/graphics-api-remotion)
[![npm downloads](https://img.shields.io/npm/dm/graphics-api-remotion)](https://www.npmjs.com/package/graphics-api-remotion)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Remotion](https://img.shields.io/badge/Remotion-4.0+-purple.svg)](https://remotion.dev/)

## ✨ Features

- 🎨 **5 Graphics Sources** - Illustrations, icons, and hand-drawn doodles
- 🔑 **No API Keys** - All sources work without authentication  
- 🧠 **Context-Aware** - AI-friendly semantic query matches graphics to storyline
- 🎬 **Remotion Ready** - Pre-fetch utilities for server-side rendering
- 🤖 **Agent-Friendly** - Claude Code skill included
- 📦 **TypeScript** - Full type safety

## 📦 Install

```bash
npm install graphics-api-remotion
```

## 🚀 Quick Start

### Context-Based Selection

```typescript
import { query, getGraphicsForContext, prefetchGraphics } from 'graphics-api-remotion';

// Describe your scene - get matching graphics
const graphics = await query("user sends payment confirmation");
// Returns: credit-card, wallet, bank, send icons

// Prefetch for Remotion (converts to data URIs)
const prefetched = await prefetchGraphics(graphics);
```

---

## 🎬 Remotion Integration

**Important**: Remotion can't use external URLs during server-side render. Use `prefetchGraphics()` to convert to data URIs.

### calculateMetadata Pattern

```tsx
import { Composition } from 'remotion';
import { query, prefetchGraphics } from 'graphics-api-remotion';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="StoryScene"
      component={StoryScene}
      durationInFrames={150}
      fps={30}
      defaultProps={{ storyline: 'team celebrates product launch' }}
      calculateMetadata={async ({ props }) => {
        // 1. Query graphics based on storyline
        const graphics = await query(props.storyline);
        
        // 2. Prefetch to convert URLs to data URIs
        const prefetched = await prefetchGraphics(graphics);
        
        return { props: { ...props, graphics: prefetched } };
      }}
    />
  );
};
```

### Using Prefetched Graphics

```tsx
import { Img } from 'remotion';
import { GraphicResult, getPrefetchedUrl } from 'graphics-api-remotion';

const StoryScene: React.FC<{ graphics: GraphicResult[] }> = ({ graphics }) => {
  return (
    <div>
      {graphics.map((g, i) => (
        g.svg ? (
          // Render SVG directly
          <div key={i} dangerouslySetInnerHTML={{ __html: g.svg }} />
        ) : (
          // Use prefetched data URI
          <Img key={i} src={getPrefetchedUrl(g)} />
        )
      ))}
    </div>
  );
};
```

### Prefetch Functions

| Function | Description |
|----------|-------------|
| `prefetchGraphics(graphics)` | Convert array of graphics to data URIs |
| `prefetchGraphic(graphic)` | Convert single graphic to data URI |
| `svgToDataUri(svg)` | Convert SVG string to data URI |
| `getPrefetchedUrl(graphic)` | Get prefetched URL from graphic |

---

## 📖 Usage

### Semantic Query

```typescript
import { query, getIconsForContext } from 'graphics-api-remotion';

// Natural language query
const results = await query("developer working on laptop");

// Just get icon names
const iconNames = getIconsForContext("payment success");
// Returns: ['credit-card', 'wallet', 'check', 'trophy', 'star']
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

// Phosphor icon with weight
const icon = await phosphor.get({ name: 'check', weight: 'bold' });

// Lucide icon
const lucideIcon = await lucide.get({ name: 'settings' });

// Iconoodle doodle (19+ packs available)
const doodles = await iconoodle.search(['arrow'], { pack: 'brutalist-doodles' });

// Storyset illustration
const illustrations = await storyset.search(['technology']);
```

---

## 📚 Providers

| Provider | Content | Count |
|----------|---------|-------|
| [Doodle Ipsum](https://doodleipsum.com) | Doodles | Unlimited |
| [Storyset](https://storyset.com) | Illustrations | Many |
| [Phosphor](https://phosphoricons.com) | Icons | 1,200+ (6 weights) |
| [Lucide](https://lucide.dev) | Icons | 1,500+ |
| [Iconoodle](https://github.com/NK2552003/Iconoodle) | Doodles/Icons | 2,000+ (19 packs) |

## 🤖 Claude Code Skill

```bash
git clone https://github.com/siva-sub/graphics-api-remotion.git
cp -r graphics-api-remotion/skill/graphics-api-remotion ~/.gemini/antigravity/skills/
```

## 🏷️ Keywords

`remotion` `graphics` `illustrations` `icons` `doodles` `phosphor-icons` `lucide` `storyset` `ai-agent` `context-aware` `video` `animation` `svg` `no-auth` `free-api` `claude-code` `semantic-search` `prefetch`

## 📄 License

MIT © [siva-sub](https://github.com/siva-sub)
