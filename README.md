# graphics-api-remotion

> 🎨 Context-aware graphics API for Remotion videos. Fetch illustrations, icons, and doodles from 6 free sources with **zero API keys**.

[![npm version](https://img.shields.io/npm/v/graphics-api-remotion)](https://www.npmjs.com/package/graphics-api-remotion)
[![npm downloads](https://img.shields.io/npm/dm/graphics-api-remotion)](https://www.npmjs.com/package/graphics-api-remotion)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Remotion](https://img.shields.io/badge/Remotion-4.0+-purple.svg)](https://remotion.dev/)

## ✨ Features

- 🎨 **6 Graphics Sources** - Illustrations, icons, and hand-drawn doodles
- 🔑 **No API Keys** - All sources work without authentication  
- 🧠 **Context-Aware** - AI-friendly semantic query matches graphics to storyline
- 🎬 **Remotion Ready** - Built for programmatic video creation
- 🤖 **Agent-Friendly** - Claude Code skill included
- 📦 **TypeScript** - Full type safety

## 📦 Install

```bash
npm install graphics-api-remotion
```

## 🚀 Quick Start

### Context-Based Selection

```typescript
import { query, getGraphicsForContext, getIconsForContext } from 'graphics-api-remotion';

// Describe your scene - get matching graphics
const graphics = await query("user sends payment confirmation");
// Returns: credit-card, wallet, bank, send icons

// Get categorized graphics for a scene
const scene = await getGraphicsForContext("team coding startup");
// Returns: { icons: 3, illustrations: 30, doodles: 5 }

// Just get icon names for a concept
const iconNames = getIconsForContext("payment success");
// Returns: ['credit-card', 'wallet', 'check', 'trophy', 'star']
```

---

## 📖 Usage Documentation

### 1. Semantic Query

The `query()` function understands natural language and routes to appropriate providers:

```typescript
import { query } from 'graphics-api-remotion';

// Returns GraphicResult[] with url, svg, source, and metadata
const results = await query("developer working on laptop");

results.forEach(graphic => {
  console.log(graphic.url);      // Direct URL to graphic
  console.log(graphic.svg);      // SVG content (if available)
  console.log(graphic.source);   // Provider name
  console.log(graphic.metadata); // Additional info
});
```

### 2. Context Mappings

The API understands these context types:

| Category | Keywords | Returns |
|----------|----------|---------|
| **Actions** | send, receive, pay, login, share, approve, deploy | Action-related icons |
| **Subjects** | user, team, payment, message, file, database | Subject icons |
| **Emotions** | success, failure, loading, complete, pending | State icons |
| **Themes** | business, technology, education, finance, startup | Illustrations |

```typescript
import { getIconsForContext, getThemesForContext } from 'graphics-api-remotion';

// Get icons for actions/subjects
getIconsForContext("user sends payment");
// → ['arrow-right', 'send', 'credit-card', 'wallet', 'user']

// Get illustration themes
getThemesForContext("developer coding");
// → ['technology']
```

### 3. Direct Provider Access

Each provider can be used directly:

#### Phosphor Icons (1,200+ icons, 6 weights)

```typescript
import { phosphor } from 'graphics-api-remotion';

// Get icon URL
const url = phosphor.getUrl('arrow-right', 'bold');

// Get icon with SVG content
const icon = await phosphor.get({
  name: 'check-circle',
  weight: 'fill',  // thin, light, regular, bold, fill, duotone
  size: 32,
  color: '#22c55e'
});

// Search icons
const results = await phosphor.search(['arrow', 'check']);
```

#### Lucide Icons (1,500+ icons)

```typescript
import { lucide } from 'graphics-api-remotion';

const icon = await lucide.get({
  name: 'settings',
  size: 24,
  strokeWidth: 2
});

const results = await lucide.search(['mail', 'send']);
```

#### Storyset Illustrations

```typescript
import { storyset } from 'graphics-api-remotion';

const illustrations = await storyset.fetch({
  category: 'technology',  // business, education, health, etc.
  style: 'rafiki'          // rafiki, bro, amico, pana, cuate
});

const results = await storyset.search(['coding', 'developer']);
```

#### Iconoodle (2,004 hand-drawn doodles)

```typescript
import { iconoodle } from 'graphics-api-remotion';

// Get categories
const categories = await iconoodle.getCategories();
// → ['arrows-assets', 'communication-assets', ...]

// Search doodles
const doodles = await iconoodle.search(['arrow', 'star']);

// Get with color customization
const doodle = await iconoodle.get({
  name: 'arrow',
  color: '#3b82f6'
});
```

#### Doodle Ipsum (unlimited doodles)

```typescript
import { doodleIpsum } from 'graphics-api-remotion';

// Get URL with dimensions and style
const url = doodleIpsum.getUrl({
  width: 400,
  height: 300,
  style: 'flat'  // flat, hand-drawn, outline
});

// Get random doodle
const random = doodleIpsum.getRandom({ style: 'hand-drawn' });
```

#### IRA Design (character illustrations)

```typescript
import { iraDesign } from 'graphics-api-remotion';

// Categories: characters, objects, backgrounds
const url = iraDesign.getUrl('characters', 'char1');

// Get with color customization
const illustration = await iraDesign.get({
  category: 'characters',
  name: 'char1',
  primaryColor: '#6366f1',
  secondaryColor: '#a855f7'
});
```

### 4. Remotion Integration

#### Pre-fetch graphics with calculateMetadata

```tsx
import { Composition } from 'remotion';
import { query } from 'graphics-api-remotion';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="StoryScene"
      component={StoryScene}
      durationInFrames={150}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{ storyline: 'team celebrates product launch' }}
      calculateMetadata={async ({ props }) => {
        const graphics = await query(props.storyline);
        return { props: { ...props, graphics } };
      }}
    />
  );
};
```

#### Use graphics in scenes

```tsx
import { Img } from 'remotion';
import { GraphicResult } from 'graphics-api-remotion';

const StoryScene: React.FC<{ graphics: GraphicResult[] }> = ({ graphics }) => {
  return (
    <div>
      {graphics.map((g, i) => (
        g.svg ? (
          <div key={i} dangerouslySetInnerHTML={{ __html: g.svg }} />
        ) : (
          <Img key={i} src={g.url} />
        )
      ))}
    </div>
  );
};
```

---

## 📚 Providers

| Provider | Content | Count | Source |
|----------|---------|-------|--------|
| [Doodle Ipsum](https://doodleipsum.com) | Doodles | Unlimited | URL API |
| [Storyset](https://storyset.com) | Illustrations | Many | Freepik |
| [IRA Design](https://iradesign.io) | Illustrations | 3 categories | GitHub |
| [Phosphor](https://phosphoricons.com) | Icons | 1,200+ (6 weights) | CDN |
| [Lucide](https://lucide.dev) | Icons | 1,500+ | CDN |
| [Iconoodle](https://github.com/NK2552003/Iconoodle) | Hand-drawn | 2,004 | GitHub |

## 🤖 Claude Code Skill

Available as a Claude Code skill for AI agents:

```bash
git clone https://github.com/siva-sub/graphics-api-remotion.git
cp -r graphics-api-remotion/skill/graphics-api-remotion ~/.gemini/antigravity/skills/
```

## 🏷️ Keywords

`remotion` `graphics` `illustrations` `icons` `doodles` `phosphor-icons` `lucide` `storyset` `ai-agent` `context-aware` `video` `animation` `svg` `no-auth` `free-api` `claude-code` `semantic-search`

## 📄 License

MIT © [siva-sub](https://github.com/siva-sub)
