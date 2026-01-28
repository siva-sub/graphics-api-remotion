// IRA Design Provider
// GitHub-based SVG illustrations - no auth required

import { IRADesignOptions, IRACategory, GraphicResult } from '../types';

const GITHUB_RAW = 'https://raw.githubusercontent.com/ira-design/ira-illustrations';
const SVG_BRANCH = 'SVG';

const CATEGORIES: IRACategory[] = ['characters', 'objects', 'backgrounds'];

// Known illustrations (subset - full list from GitHub repo)
const ILLUSTRATIONS: Record<IRACategory, string[]> = {
    characters: [
        'char1', 'char2', 'char3', 'char4', 'char5',
        'char6', 'char7', 'char8', 'char9', 'char10'
    ],
    objects: [
        'obj1', 'obj2', 'obj3', 'obj4', 'obj5',
        'laptop', 'phone', 'plant', 'coffee', 'book'
    ],
    backgrounds: [
        'bg1', 'bg2', 'bg3', 'bg4', 'bg5'
    ]
};

/**
 * Get SVG URL from GitHub
 */
export function getUrl(category: IRACategory, name: string): string {
    return `${GITHUB_RAW}/${SVG_BRANCH}/${category}/${name}.svg`;
}

/**
 * Fetch SVG content
 */
export async function fetchSvg(category: IRACategory, name: string): Promise<string | null> {
    const url = getUrl(category, name);

    try {
        const response = await globalThis.fetch(url);
        if (!response.ok) return null;
        return await response.text();
    } catch {
        return null;
    }
}

/**
 * Get illustration with optional color customization
 */
export async function get(options: IRADesignOptions): Promise<GraphicResult> {
    const {
        category = 'characters',
        name = ILLUSTRATIONS[category][0]
    } = options;

    const url = getUrl(category, name);
    let svg: string | undefined;

    // Optionally fetch SVG for color manipulation
    if (options.colors) {
        const svgContent = await fetchSvg(category, name);
        if (svgContent) {
            svg = applyColors(svgContent, options.colors);
        }
    }

    return {
        url,
        svg,
        source: 'ira-design',
        metadata: { category, name }
    };
}

/**
 * Apply custom colors to SVG gradient stops
 */
function applyColors(svg: string, colors: { primary?: string; secondary?: string; accent?: string }): string {
    let result = svg;

    // IRA Design uses linearGradient with stop1/stop2 classes
    if (colors.primary) {
        result = result.replace(/class="stop1"[^>]*stop-color="[^"]+"/g,
            `class="stop1" stop-color="${colors.primary}"`);
    }
    if (colors.secondary) {
        result = result.replace(/class="stop2"[^>]*stop-color="[^"]+"/g,
            `class="stop2" stop-color="${colors.secondary}"`);
    }

    return result;
}

/**
 * Get random illustration from category
 */
export function getRandom(category: IRACategory = 'characters'): GraphicResult {
    const names = ILLUSTRATIONS[category];
    const name = names[Math.floor(Math.random() * names.length)];

    return {
        url: getUrl(category, name),
        source: 'ira-design',
        metadata: { category, name }
    };
}

/**
 * List available illustrations
 */
export function list(category?: IRACategory): string[] {
    if (category) return ILLUSTRATIONS[category];
    return Object.values(ILLUSTRATIONS).flat();
}

/**
 * Search IRA Design illustrations
 */
export async function search(terms: string[]): Promise<GraphicResult[]> {
    const categoryMap: Record<string, IRACategory> = {
        'person': 'characters',
        'people': 'characters',
        'human': 'characters',
        'character': 'characters',
        'object': 'objects',
        'item': 'objects',
        'thing': 'objects',
        'background': 'backgrounds',
        'scene': 'backgrounds'
    };

    let matchedCategory: IRACategory = 'characters';
    for (const term of terms) {
        if (categoryMap[term]) {
            matchedCategory = categoryMap[term];
            break;
        }
    }

    // Return a few random from matched category
    return [getRandom(matchedCategory), getRandom(matchedCategory)];
}

export const iraDesign = {
    getUrl,
    fetchSvg,
    get,
    getRandom,
    list,
    search,
    categories: CATEGORIES
};
