// Graphics API - Main Exports
// Unified API for fetching illustrations, icons, and doodles

// Types
export * from './types';
export * from './taxonomy';

// Context-based selection
export {
    parseContext,
    getIconsForContext,
    getThemesForContext,
    CONTEXT_MAPPINGS,
    type StoryContext
} from './context';

// Query Engine
export { queryGraphics, parseQuery, type QueryOptions, type ParsedQuery } from './query';

// Providers
export { doodleIpsum } from './providers/doodle-ipsum';
export { storyset } from './providers/storyset';
export { iraDesign } from './providers/ira-design';
export { phosphor } from './providers/phosphor';
export { lucide } from './providers/lucide';
export { iconoodle } from './providers/iconoodle';

// Remotion Components (only export types, components need React)
export type { GraphicSequenceProps } from './components/GraphicSequence';
export type { AnimatedIconProps } from './components/AnimatedIcon';

// Convenience imports
import { doodleIpsum } from './providers/doodle-ipsum';
import { storyset } from './providers/storyset';
import { iraDesign } from './providers/ira-design';
import { phosphor } from './providers/phosphor';
import { lucide } from './providers/lucide';
import { iconoodle } from './providers/iconoodle';
import { queryGraphics } from './query';
import type { QueryOptions } from './query';
import { GraphicResult } from './types';
import { SourceName } from './taxonomy';
import { getIconsForContext, getThemesForContext } from './context';

/**
 * All providers with search capability
 */
export const providers = {
    'doodle-ipsum': doodleIpsum,
    'storyset': storyset,
    'ira-design': iraDesign,
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
        'ira-design': { search: iraDesign.search },
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
    iraDesign,
    phosphor,
    lucide,
    iconoodle
};

export default graphicsAPI;
