// Doodle Ipsum Provider
// URL-based doodle API - no auth required

import { DoodleIpsumOptions, DoodleStyle, GraphicResult } from '../types';

const BASE_URL = 'https://doodleipsum.com';

const STYLES: DoodleStyle[] = ['flat', 'hand-drawn', 'outlined', 'abstract'];

/**
 * Generate a Doodle Ipsum URL
 */
export function getUrl(options: DoodleIpsumOptions = {}): string {
    const {
        width = 400,
        height = 300,
        style = 'flat',
        id,
        seed,
        background
    } = options;

    let url = `${BASE_URL}/${width}x${height}/${style}`;

    const params = new URLSearchParams();
    if (id !== undefined) params.set('i', String(id));
    if (seed !== undefined) params.set('n', String(seed));
    if (background) params.set('bg', background);

    const queryString = params.toString();
    return queryString ? `${url}?${queryString}` : url;
}

/**
 * Get a random doodle
 */
export function getRandom(options: Omit<DoodleIpsumOptions, 'id'> = {}): GraphicResult {
    const seed = Math.floor(Math.random() * 10000);
    const url = getUrl({ ...options, seed });

    return {
        url,
        source: 'doodle-ipsum',
        width: options.width || 400,
        height: options.height || 300,
        metadata: {
            style: options.style || 'flat',
            seed
        }
    };
}

/**
 * Get doodle by specific ID
 */
export function getById(id: number, options: Omit<DoodleIpsumOptions, 'id'> = {}): GraphicResult {
    const url = getUrl({ ...options, id });

    return {
        url,
        source: 'doodle-ipsum',
        width: options.width || 400,
        height: options.height || 300,
        metadata: {
            style: options.style || 'flat',
            id
        }
    };
}

/**
 * Get multiple random doodles
 */
export function getMany(count: number, options: Omit<DoodleIpsumOptions, 'id' | 'seed'> = {}): GraphicResult[] {
    return Array.from({ length: count }, () => getRandom(options));
}

/**
 * Search doodles (returns random matches since Doodle Ipsum doesn't have search)
 */
export async function search(terms: string[]): Promise<GraphicResult[]> {
    // Map terms to styles if possible
    const styleMap: Record<string, DoodleStyle> = {
        'sketch': 'hand-drawn',
        'doodle': 'hand-drawn',
        'simple': 'flat',
        'clean': 'flat',
        'line': 'outlined',
        'geometric': 'abstract'
    };

    let matchedStyle: DoodleStyle = 'flat';
    for (const term of terms) {
        if (styleMap[term]) {
            matchedStyle = styleMap[term];
            break;
        }
        if (STYLES.includes(term as DoodleStyle)) {
            matchedStyle = term as DoodleStyle;
            break;
        }
    }

    // Return 3 random doodles in matched style
    return getMany(3, { style: matchedStyle });
}

export const doodleIpsum = {
    getUrl,
    getRandom,
    getById,
    getMany,
    search,
    styles: STYLES
};
