---
name: graphics-api-remotion
description: Fetch illustrations, icons, and doodles from 6 free sources for Remotion videos. No API keys required. Use when building video content, adding graphics to storylines, or finding icons/illustrations.
---

# Graphics API for Remotion

> Context-aware graphics selection from 6 free sources. **Zero API keys required.**

## When to Use

- Adding graphics to Remotion video storylines
- Finding icons/illustrations based on scene context
- Fetching hand-drawn doodles for visual variety

## Installation

```bash
# Clone to your project
git clone https://github.com/sickn33/antigravity-awesome-skills.git .agent/skills

# Or npm install (if published)
npm install graphics-api
```

## Context-Based Selection

The API understands storyline concepts and returns matching graphics:

```typescript
import { query, getIconsForContext, getGraphicsForContext } from 'graphics-api';

// Describe your scene → get relevant graphics
const graphics = await query("user sends payment confirmation");
// Returns: credit-card, wallet, bank, send icons

const loginGraphics = await query("user login authentication");
// Returns: log-in, user, key, lock icons

// Get categorized graphics for a scene
const sceneGraphics = await getGraphicsForContext("team coding startup");
// Returns: { icons: 3, illustrations: 30, doodles: 5 }
```

## Context Mappings

| Context | Returns |
|---------|---------|
| "send payment" | credit-card, wallet, arrow-right |
| "user login" | log-in, user, key, lock |
| "success" | trophy, check, star |
| "error warning" | alert-triangle, x-circle |
| "team meeting" | users, briefcase + business illustrations |
| "developer coding" | code, terminal + technology illustrations |

## Direct Provider Access

```typescript
import { phosphor, lucide, iconoodle, storyset } from 'graphics-api';

// Specific icon with weight
const icon = await phosphor.get({ name: 'check', weight: 'bold' });

// Hand-drawn doodle
const doodles = await iconoodle.search(['arrow']);

// Illustration by theme
const illustrations = await storyset.fetch({ category: 'technology' });
```

## Providers (6 sources, no auth)

| Provider | Content | Count | Source |
|----------|---------|-------|--------|
| Doodle Ipsum | Doodles | Unlimited | doodleipsum.com |
| Storyset | Illustrations | Many | freepiklabs.com |
| IRA Design | Illustrations | 3 categories | GitHub |
| Phosphor | Icons (6 weights) | 1,200+ | unpkg CDN |
| Lucide | Icons | 1,500+ | unpkg CDN |
| Iconoodle | Doodles | 2,004 | GitHub JSON |

## Key Functions

| Function | Purpose |
|----------|---------|
| `query(storyline)` | Context-aware graphics from all sources |
| `getIconsForContext(text)` | Icon names matching concept |
| `getThemesForContext(text)` | Illustration themes |
| `getGraphicsForContext(text)` | Icons + illustrations + doodles |

## Remotion Integration

```tsx
import { Composition } from 'remotion';
import { query } from 'graphics-api';

<Composition
  id="StoryScene"
  calculateMetadata={async ({ props }) => {
    const graphics = await query(props.storyline);
    return { props: { ...props, graphics } };
  }}
/>
```

## Source Code

GitHub: https://github.com/YOUR_USERNAME/graphics-api
