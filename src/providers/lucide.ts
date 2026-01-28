// Lucide Icons Provider
// unpkg CDN access - no auth required

import { LucideOptions, GraphicResult } from '../types.js';

const UNPKG_URL = 'https://unpkg.com/lucide-static@latest/icons';

// Common Lucide icon names (subset of 1500+)
const COMMON_ICONS = [
    'arrow-right', 'arrow-left', 'arrow-up', 'arrow-down',
    'check', 'x', 'plus', 'minus',
    'user', 'users', 'settings', 'home',
    'search', 'bell', 'mail', 'heart',
    'star', 'bookmark', 'download', 'upload',
    'trash-2', 'edit', 'copy', 'share-2',
    'play', 'pause', 'square', 'skip-forward',
    'sun', 'moon', 'cloud', 'zap',
    'code', 'terminal', 'database', 'globe',
    'message-circle', 'phone', 'camera', 'image',
    'folder', 'file', 'file-text', 'archive',
    'calendar', 'clock', 'map-pin', 'navigation',
    'wifi', 'bluetooth', 'battery', 'power',
    'lock', 'unlock', 'key', 'shield'
];

/**
 * Get icon URL from unpkg CDN
 */
export function getUrl(name: string): string {
    return `${UNPKG_URL}/${name}.svg`;
}

/**
 * Fetch icon SVG content
 */
export async function fetchSvg(name: string): Promise<string | null> {
    const url = getUrl(name);

    try {
        const response = await globalThis.fetch(url);
        if (!response.ok) return null;
        return await response.text();
    } catch {
        return null;
    }
}

/**
 * Get icon with options
 */
export async function get(options: LucideOptions): Promise<GraphicResult> {
    const { name, size = 24, color, strokeWidth = 2 } = options;

    const url = getUrl(name);
    let svg: string | undefined;

    const svgContent = await fetchSvg(name);
    if (svgContent) {
        svg = svgContent;

        // Apply size
        if (size !== 24) {
            svg = svg.replace(/width="24"/, `width="${size}"`);
            svg = svg.replace(/height="24"/, `height="${size}"`);
        }

        // Apply color
        if (color) {
            svg = svg.replace(/currentColor/g, color);
        }

        // Apply stroke width
        if (strokeWidth !== 2) {
            svg = svg.replace(/stroke-width="2"/g, `stroke-width="${strokeWidth}"`);
        }
    }

    return {
        url,
        svg,
        source: 'lucide',
        width: size,
        height: size,
        metadata: { name, strokeWidth }
    };
}

/**
 * Get SVG as data URI
 */
export async function getDataUri(name: string): Promise<string | null> {
    const svg = await fetchSvg(name);
    if (!svg) return null;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Search Lucide icons
 */
export async function search(terms: string[]): Promise<GraphicResult[]> {
    // Find icons that match search terms
    const matches = COMMON_ICONS.filter(icon =>
        terms.some(term => icon.includes(term) || term.includes(icon.replace('-', '')))
    );

    const iconsToReturn = matches.length > 0 ? matches.slice(0, 5) : COMMON_ICONS.slice(0, 5);

    return iconsToReturn.map(name => ({
        url: getUrl(name),
        source: 'lucide' as const,
        width: 24,
        height: 24,
        metadata: { name }
    }));
}

export const lucide = {
    getUrl,
    fetchSvg,
    get,
    getDataUri,
    search,
    commonIcons: COMMON_ICONS
};
