// Phosphor Icons Provider
// GitHub/unpkg CDN access - no auth required

import { PhosphorOptions, PhosphorWeight, GraphicResult } from '../types';

const UNPKG_URL = 'https://unpkg.com/@phosphor-icons/core@2/assets';
const GITHUB_RAW = 'https://raw.githubusercontent.com/phosphor-icons/core/main/assets';

const WEIGHTS: PhosphorWeight[] = ['thin', 'light', 'regular', 'bold', 'fill', 'duotone'];

// Common icon names (subset of 1200+)
const COMMON_ICONS = [
    'arrow-right', 'arrow-left', 'arrow-up', 'arrow-down',
    'check', 'x', 'plus', 'minus',
    'user', 'users', 'gear', 'house',
    'magnifying-glass', 'bell', 'envelope', 'heart',
    'star', 'bookmark', 'download', 'upload',
    'trash', 'pencil', 'copy', 'share',
    'play', 'pause', 'stop', 'skip-forward',
    'sun', 'moon', 'cloud', 'lightning',
    'code', 'terminal', 'database', 'globe',
    'chat', 'phone', 'camera', 'image'
];

/**
 * Get icon URL from unpkg CDN
 */
export function getUrl(name: string, weight: PhosphorWeight = 'regular'): string {
    return `${UNPKG_URL}/${weight}/${name}.svg`;
}

/**
 * Get icon URL from GitHub (alternative)
 */
export function getGitHubUrl(name: string, weight: PhosphorWeight = 'regular'): string {
    return `${GITHUB_RAW}/${weight}/${name}.svg`;
}

/**
 * Fetch icon SVG content
 */
export async function fetchSvg(name: string, weight: PhosphorWeight = 'regular'): Promise<string | null> {
    const url = getUrl(name, weight);

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
export async function get(options: PhosphorOptions): Promise<GraphicResult> {
    const { name, weight = 'regular', size, color } = options;

    const url = getUrl(name, weight);
    let svg: string | undefined;

    // Fetch and optionally modify SVG
    const svgContent = await fetchSvg(name, weight);
    if (svgContent) {
        svg = svgContent;

        // Apply size
        if (size) {
            svg = svg.replace(/width="[^"]*"/, `width="${size}"`);
            svg = svg.replace(/height="[^"]*"/, `height="${size}"`);
        }

        // Apply color
        if (color) {
            svg = svg.replace(/currentColor/g, color);
        }
    }

    return {
        url,
        svg,
        source: 'phosphor',
        width: size || 24,
        height: size || 24,
        metadata: { name, weight }
    };
}

/**
 * Get SVG as data URI for inline use
 */
export async function getDataUri(name: string, weight: PhosphorWeight = 'regular'): Promise<string | null> {
    const svg = await fetchSvg(name, weight);
    if (!svg) return null;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Search Phosphor icons
 */
export async function search(terms: string[]): Promise<GraphicResult[]> {
    // Find icons that match search terms
    const matches = COMMON_ICONS.filter(icon =>
        terms.some(term => icon.includes(term) || term.includes(icon.replace('-', '')))
    );

    // If no matches, return some common icons
    const iconsToReturn = matches.length > 0 ? matches.slice(0, 5) : COMMON_ICONS.slice(0, 5);

    return iconsToReturn.map(name => ({
        url: getUrl(name, 'regular'),
        source: 'phosphor' as const,
        width: 24,
        height: 24,
        metadata: { name, weight: 'regular' }
    }));
}

export const phosphor = {
    getUrl,
    getGitHubUrl,
    fetchSvg,
    get,
    getDataUri,
    search,
    weights: WEIGHTS,
    commonIcons: COMMON_ICONS
};
