// Iconoodle Provider
// Hand-drawn SVG doodles, illustrations, and icon packs from GitHub
// https://github.com/NK2552003/Iconoodle

import { IconoodleOptions, GraphicResult } from '../types';

const BASE_URL = 'https://raw.githubusercontent.com/NK2552003/Iconoodle/main/lib';

// Available packs (JSON files in /lib)
export const PACKS = [
    'doodles',                          // Main doodles (2004 items)
    '3d-like-shape-doodles',
    'brutalist-doodles',
    'candy-icons',
    'cars-icons',
    'christmas-illustration',
    'doodles-3',
    'doodles-ai-icon-doodles',
    'doodles-animal-doodles',
    'doodles-animals-doodle',
    'doodles-crispy-doodles',
    'doodles-cute-animals',
    'doodles-educational-doodles',
    'doodles-fast-food-doodle-art',
    'doodles-fruits-vegetables-doodle',
    'doodles-hand-drawn-doodle',
    'doodles-hand-drawn-doodles-scribbles',
    'doodles-hand-drawn-lifestyle-doodle',
    'doodles-internet-network-doodles'
] as const;

export type IconoodlePack = typeof PACKS[number];

interface IconoodleItem {
    id: string;
    category: string;
    style: string;
    src: string;
    svg: string;
    viewBox: string;
}

// Cache for loaded packs
const packCache: Map<string, IconoodleItem[]> = new Map();

/**
 * Load a pack's JSON data (with caching)
 */
export async function loadPack(pack: IconoodlePack = 'doodles'): Promise<IconoodleItem[]> {
    const cached = packCache.get(pack);
    if (cached) return cached;

    try {
        const url = `${BASE_URL}/${pack}.json`;
        const response = await globalThis.fetch(url);
        if (!response.ok) return [];

        const items: IconoodleItem[] = await response.json();
        packCache.set(pack, items);
        return items;
    } catch {
        return [];
    }
}

/**
 * Get all available categories from a pack
 */
export async function getCategories(pack: IconoodlePack = 'doodles'): Promise<string[]> {
    const items = await loadPack(pack);
    const categories = new Set(items.map(item => item.category));
    return Array.from(categories);
}

/**
 * Get all available styles from a pack
 */
export async function getStyles(pack: IconoodlePack = 'doodles'): Promise<string[]> {
    const items = await loadPack(pack);
    const styles = new Set(items.map(item => item.style));
    return Array.from(styles);
}

/**
 * Search for doodles by terms
 */
export async function search(
    terms: string[],
    options: { pack?: IconoodlePack; limit?: number } = {}
): Promise<GraphicResult[]> {
    const { pack = 'doodles', limit = 10 } = options;
    const items = await loadPack(pack);

    const searchTerms = terms.map(t => t.toLowerCase());

    const matches = items.filter(item =>
        searchTerms.some(term =>
            item.id.toLowerCase().includes(term) ||
            item.category.toLowerCase().includes(term) ||
            item.style.toLowerCase().includes(term)
        )
    ).slice(0, limit);

    return matches.map(item => ({
        url: `https://iconoodle.vercel.app${item.src}`,
        svg: item.svg,
        source: 'iconoodle' as const,
        width: parseInt(item.viewBox.split(' ')[2]) || 100,
        height: parseInt(item.viewBox.split(' ')[3]) || 100,
        metadata: {
            id: item.id,
            category: item.category,
            style: item.style,
            pack
        }
    }));
}

/**
 * Get doodles by category
 */
export async function getByCategory(
    category: string,
    options: { pack?: IconoodlePack; limit?: number } = {}
): Promise<GraphicResult[]> {
    const { pack = 'doodles', limit = 20 } = options;
    const items = await loadPack(pack);

    const matches = items
        .filter(item => item.category.toLowerCase().includes(category.toLowerCase()))
        .slice(0, limit);

    return matches.map(item => ({
        url: `https://iconoodle.vercel.app${item.src}`,
        svg: item.svg,
        source: 'iconoodle' as const,
        width: parseInt(item.viewBox.split(' ')[2]) || 100,
        height: parseInt(item.viewBox.split(' ')[3]) || 100,
        metadata: {
            id: item.id,
            category: item.category,
            style: item.style,
            pack
        }
    }));
}

/**
 * Get a specific doodle by ID
 */
export async function get(options: IconoodleOptions): Promise<GraphicResult | null> {
    const { name, pack = 'doodles', color } = options;
    const items = await loadPack(pack as IconoodlePack);

    const item = items.find(i =>
        i.id.toLowerCase() === name.toLowerCase() ||
        i.id.toLowerCase().includes(name.toLowerCase())
    );

    if (!item) return null;

    let svg = item.svg;

    // Apply color if specified
    if (color) {
        svg = svg.replace(/#000000/g, color);
        svg = svg.replace(/fill:\s*#000000/g, `fill: ${color}`);
    }

    return {
        url: `https://iconoodle.vercel.app${item.src}`,
        svg,
        source: 'iconoodle',
        width: parseInt(item.viewBox.split(' ')[2]) || 100,
        height: parseInt(item.viewBox.split(' ')[3]) || 100,
        metadata: {
            id: item.id,
            category: item.category,
            style: item.style,
            pack
        }
    };
}

/**
 * Get random doodles from a pack
 */
export async function getRandom(
    options: { pack?: IconoodlePack; count?: number } = {}
): Promise<GraphicResult[]> {
    const { pack = 'doodles', count = 5 } = options;
    const items = await loadPack(pack);

    // Fisher-Yates shuffle for random selection
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count);

    return selected.map(item => ({
        url: `https://iconoodle.vercel.app${item.src}`,
        svg: item.svg,
        source: 'iconoodle' as const,
        width: parseInt(item.viewBox.split(' ')[2]) || 100,
        height: parseInt(item.viewBox.split(' ')[3]) || 100,
        metadata: {
            id: item.id,
            category: item.category,
            style: item.style,
            pack
        }
    }));
}

export const iconoodle = {
    loadPack,
    getCategories,
    getStyles,
    search,
    getByCategory,
    get,
    getRandom,
    packs: PACKS,
    clearCache: () => packCache.clear()
};
