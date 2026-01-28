// Iconoodle Provider
// Fetches from lib/doodles.json with embedded SVGs - no auth required

import { IconoodleOptions, GraphicResult } from '../types';

const DOODLES_JSON_URL = 'https://raw.githubusercontent.com/NK2552003/Iconoodle/main/lib/doodles.json';

// Doodle entry structure from doodles.json
interface DoodleEntry {
    id: string;
    category: string;
    style: 'LINED' | 'FILLED' | string;
    src: string;
    svg: string;
    viewBox: string;
}

// Cache for doodles data
let doodlesCache: DoodleEntry[] | null = null;

/**
 * Fetch and cache the doodles.json
 */
export async function fetchDoodles(): Promise<DoodleEntry[]> {
    if (doodlesCache) return doodlesCache;

    try {
        const response = await globalThis.fetch(DOODLES_JSON_URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch doodles: ${response.status}`);
        }
        doodlesCache = await response.json();
        return doodlesCache!;
    } catch (error) {
        console.error('Error fetching Iconoodle doodles:', error);
        return [];
    }
}

/**
 * Get all unique categories
 */
export async function getCategories(): Promise<string[]> {
    const doodles = await fetchDoodles();
    const categories = new Set(doodles.map(d => d.category));
    return Array.from(categories);
}

/**
 * Get all unique styles
 */
export async function getStyles(): Promise<string[]> {
    const doodles = await fetchDoodles();
    const styles = new Set(doodles.map(d => d.style));
    return Array.from(styles);
}

/**
 * Get doodle by ID
 */
export async function getById(id: string): Promise<GraphicResult | null> {
    const doodles = await fetchDoodles();
    const doodle = doodles.find(d => d.id === id);

    if (!doodle) return null;

    return {
        url: `https://nk2552003.github.io/Iconoodle${doodle.src}`,
        svg: doodle.svg,
        source: 'iconoodle',
        metadata: {
            id: doodle.id,
            category: doodle.category,
            style: doodle.style,
            viewBox: doodle.viewBox
        }
    };
}

/**
 * Get doodles by category
 */
export async function getByCategory(category: string): Promise<GraphicResult[]> {
    const doodles = await fetchDoodles();
    return doodles
        .filter(d => d.category === category)
        .map(d => ({
            url: `https://nk2552003.github.io/Iconoodle${d.src}`,
            svg: d.svg,
            source: 'iconoodle' as const,
            metadata: {
                id: d.id,
                category: d.category,
                style: d.style,
                viewBox: d.viewBox
            }
        }));
}

/**
 * Get doodles by style
 */
export async function getByStyle(style: string): Promise<GraphicResult[]> {
    const doodles = await fetchDoodles();
    return doodles
        .filter(d => d.style === style)
        .map(d => ({
            url: `https://nk2552003.github.io/Iconoodle${d.src}`,
            svg: d.svg,
            source: 'iconoodle' as const,
            metadata: {
                id: d.id,
                category: d.category,
                style: d.style,
                viewBox: d.viewBox
            }
        }));
}

/**
 * Get a random doodle
 */
export async function getRandom(): Promise<GraphicResult | null> {
    const doodles = await fetchDoodles();
    if (doodles.length === 0) return null;

    const doodle = doodles[Math.floor(Math.random() * doodles.length)];
    return {
        url: `https://nk2552003.github.io/Iconoodle${doodle.src}`,
        svg: doodle.svg,
        source: 'iconoodle',
        metadata: {
            id: doodle.id,
            category: doodle.category,
            style: doodle.style,
            viewBox: doodle.viewBox
        }
    };
}

/**
 * Get doodle with color modification
 */
export async function get(options: IconoodleOptions): Promise<GraphicResult | null> {
    const { name, color } = options;

    const doodles = await fetchDoodles();
    const doodle = doodles.find(d =>
        d.id.toLowerCase().includes(name.toLowerCase()) ||
        d.category.toLowerCase().includes(name.toLowerCase())
    );

    if (!doodle) return null;

    let svg = doodle.svg;

    // Apply color if specified
    if (color) {
        // Replace fill colors (common patterns in Iconoodle SVGs)
        svg = svg.replace(/fill:\s*#[0-9a-fA-F]{6}/g, `fill: ${color}`);
        svg = svg.replace(/fill="#[0-9a-fA-F]{6}"/g, `fill="${color}"`);
        svg = svg.replace(/stroke:\s*#[0-9a-fA-F]{6}/g, `stroke: ${color}`);
        svg = svg.replace(/stroke="#[0-9a-fA-F]{6}"/g, `stroke="${color}"`);
    }

    return {
        url: `https://nk2552003.github.io/Iconoodle${doodle.src}`,
        svg,
        source: 'iconoodle',
        metadata: {
            id: doodle.id,
            category: doodle.category,
            style: doodle.style,
            viewBox: doodle.viewBox
        }
    };
}

/**
 * Search Iconoodle doodles
 */
export async function search(terms: string[]): Promise<GraphicResult[]> {
    const doodles = await fetchDoodles();

    // Search by ID, category, or style
    const matches = doodles.filter(d =>
        terms.some(term =>
            d.id.toLowerCase().includes(term.toLowerCase()) ||
            d.category.toLowerCase().includes(term.toLowerCase()) ||
            d.style.toLowerCase().includes(term.toLowerCase())
        )
    );

    // If no matches, return random doodles
    const results = matches.length > 0
        ? matches.slice(0, 5)
        : doodles.slice(0, 5);

    return results.map(d => ({
        url: `https://nk2552003.github.io/Iconoodle${d.src}`,
        svg: d.svg,
        source: 'iconoodle' as const,
        metadata: {
            id: d.id,
            category: d.category,
            style: d.style,
            viewBox: d.viewBox
        }
    }));
}

/**
 * Get total count of doodles
 */
export async function count(): Promise<number> {
    const doodles = await fetchDoodles();
    return doodles.length;
}

/**
 * Clear the cache (useful for testing or refreshing)
 */
export function clearCache(): void {
    doodlesCache = null;
}

export const iconoodle = {
    fetchDoodles,
    getCategories,
    getStyles,
    getById,
    getByCategory,
    getByStyle,
    getRandom,
    get,
    search,
    count,
    clearCache
};
