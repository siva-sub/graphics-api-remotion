// Phosphor Icons Provider
// GitHub raw access - no auth required

import { PhosphorOptions, PhosphorWeight, GraphicResult } from '../types.js';

// Use GitHub raw which works reliably
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
    'chat', 'phone', 'camera', 'image',
    'credit-card', 'wallet', 'bank', 'currency-dollar',
    'lock', 'key', 'shield', 'warning',
    'check-circle', 'x-circle', 'info', 'question',
    'trophy', 'medal', 'crown', 'flag',
    'briefcase', 'calendar', 'clock', 'hourglass',
    'file', 'folder', 'archive', 'clipboard',
    'link', 'at', 'hash', 'percent',
    'chart-line', 'chart-bar', 'chart-pie', 'trend-up',
    'rocket', 'lightning', 'fire', 'sparkle',
    'shopping-cart', 'bag', 'package', 'gift',
    'log-in', 'log-out', 'sign-in', 'sign-out'
];

/**
 * Get icon filename - Phosphor uses name-weight.svg format for non-regular weights
 */
function getFilename(name: string, weight: PhosphorWeight): string {
    if (weight === 'regular') {
        return `${name}.svg`;
    }
    return `${name}-${weight}.svg`;
}

/**
 * Get icon URL from GitHub raw
 */
export function getUrl(name: string, weight: PhosphorWeight = 'regular'): string {
    const filename = getFilename(name, weight);
    return `${GITHUB_RAW}/${weight}/${filename}`;
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
    return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

/**
 * Search Phosphor icons
 */
export async function search(terms: string[]): Promise<GraphicResult[]> {
    // Find icons that match search terms
    const matches = COMMON_ICONS.filter(icon =>
        terms.some(term => icon.includes(term) || term.includes(icon.replace(/-/g, '')))
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
    fetchSvg,
    get,
    getDataUri,
    search,
    weights: WEIGHTS,
    commonIcons: COMMON_ICONS
};
