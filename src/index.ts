// Graphics API - Main Exports
// Unified API for fetching illustrations, icons, and doodles

// Types
export * from './types.js';
export * from './taxonomy.js';

// Context-based selection
export {
    parseContext,
    getIconsForContext,
    getThemesForContext,
    getIconoodlePackForContext,
    CONTEXT_MAPPINGS,
    type StoryContext
} from './context.js';

// Query Engine
export { queryGraphics, parseQuery, type QueryOptions, type ParsedQuery } from './query.js';

// Providers (5 sources - all working with no auth)
export { doodleIpsum } from './providers/doodle-ipsum.js';
export { storyset } from './providers/storyset.js';
export { phosphor } from './providers/phosphor.js';
export { lucide } from './providers/lucide.js';
export { iconoodle } from './providers/iconoodle.js';

// Remotion Components (only export types, components need React)
export type { GraphicSequenceProps } from './components/GraphicSequence.js';
export type { AnimatedIconProps } from './components/AnimatedIcon.js';

// Remotion Prefetch Utilities (for server-side rendering)
export {
    prefetchGraphics,
    prefetchGraphic,
    svgToDataUri,
    svgToBase64DataUri,
    getPrefetchedUrl,
    renderSvgContent,
    remotionUtils
} from './remotion/prefetch.js';

// Convenience imports
import { doodleIpsum } from './providers/doodle-ipsum.js';
import { storyset } from './providers/storyset.js';
import { phosphor } from './providers/phosphor.js';
import { lucide } from './providers/lucide.js';
import { iconoodle } from './providers/iconoodle.js';
import { queryGraphics } from './query.js';
import type { QueryOptions } from './query.js';
import { GraphicResult } from './types.js';
import { SourceName } from './taxonomy.js';
import { getIconsForContext, getThemesForContext } from './context.js';

/**
 * All providers with search capability
 */
export const providers = {
    'doodle-ipsum': doodleIpsum,
    'storyset': storyset,
    'phosphor': phosphor,
    'lucide': lucide,
    'iconoodle': iconoodle
};

/**
 * Context-aware query function
 * 
 * Uses context mappings to find relevant graphics for storyline concepts.
 * 
 * @example
 * // Scene-based query
 * const graphics = await query("user sends payment confirmation");
 * // Returns payment icons, send arrows, check marks
 * 
 * @example
 * // Emotion-based query
 * const graphics = await query("team celebrating success");
 * // Returns celebration icons, trophy, team illustrations
 */
export async function query(input: string | QueryOptions): Promise<GraphicResult[]> {
    const queryStr = typeof input === 'string' ? input : input.concept || '';

    // Get context-aware icon names
    const contextIcons = getIconsForContext(queryStr);
    const contextThemes = getThemesForContext(queryStr);

    // Build enhanced search terms
    const baseTerms = queryStr.toLowerCase().split(/\s+/).filter(t => t.length > 2);
    const enhancedTerms = [...new Set([...baseTerms, ...contextIcons.slice(0, 3)])];

    const providerMap: Record<SourceName, { search: (terms: string[]) => Promise<GraphicResult[]> }> = {
        'doodle-ipsum': { search: doodleIpsum.search },
        'storyset': { search: storyset.search },
        'phosphor': { search: phosphor.search },
        'lucide': { search: lucide.search },
        'iconoodle': { search: iconoodle.search }
    };

    // Query with enhanced terms
    const results = await queryGraphics(
        typeof input === 'string' ? { concept: queryStr, subjects: enhancedTerms } : input,
        providerMap
    );

    // Also directly fetch icons if we have context mappings
    if (contextIcons.length > 0 && results.length < 5) {
        const iconPromises = contextIcons.slice(0, 3).map(async (iconName) => {
            const phosphorResult = await phosphor.get({ name: iconName, weight: 'regular' }).catch(() => null);
            const lucideResult = await lucide.get({ name: iconName }).catch(() => null);
            return [phosphorResult, lucideResult].filter(Boolean) as GraphicResult[];
        });

        const iconResults = (await Promise.all(iconPromises)).flat();
        return [...results, ...iconResults].slice(0, 10);
    }

    return results;
}

/**
 * Get graphics for a specific context (more targeted than query)
 */
export async function getGraphicsForContext(context: string): Promise<{
    icons: GraphicResult[];
    illustrations: GraphicResult[];
    doodles: GraphicResult[];
}> {
    const iconNames = getIconsForContext(context);
    const themes = getThemesForContext(context);

    // Fetch icons
    const iconPromises = iconNames.slice(0, 5).map(async (name) => {
        const result = await phosphor.get({ name, weight: 'regular' }).catch(() => null);
        return result;
    });

    // Fetch illustrations
    const illustrationPromise = storyset.search(themes);

    // Fetch doodles
    const doodlePromise = iconoodle.search(iconNames.slice(0, 3));

    const [iconResults, illustrations, doodles] = await Promise.all([
        Promise.all(iconPromises),
        illustrationPromise,
        doodlePromise
    ]);

    return {
        icons: iconResults.filter(Boolean) as GraphicResult[],
        illustrations,
        doodles
    };
}

/**
 * Main API object
 */
export const graphicsAPI = {
    query,
    getGraphicsForContext,
    getIconsForContext,
    getThemesForContext,
    providers,
    doodleIpsum,
    storyset,
    phosphor,
    lucide,
    iconoodle
};

export default graphicsAPI;
