// Storyset Provider
// Uses Freepik's internal API - no auth required
// API returns: src (SVG), preview (PNG), url (page), illustration.name

import { StorysetOptions, StorysetCategory, StorysetStyle, GraphicResult } from '../types.js';

const API_URL = 'https://stories.freepiklabs.com/api/vectors';

const CATEGORIES: StorysetCategory[] = [
    'business', 'coding', 'education', 'health', 'people', 'technology'
];

const STYLES: StorysetStyle[] = ['rafiki', 'bro', 'amico', 'pana', 'cuate'];

interface StorysetAPIItem {
    id: number;
    src: string;           // SVG URL - this is the main asset
    preview: string;       // PNG preview
    preview_no_bg: string; // PNG without background
    url: string;           // Storyset page URL
    slug: string;          // e.g. "image-folder/rafiki"
    style: string;
    illustration: {
        slug: string;
        name: string;
    };
    tags?: Array<{ name: string; slug: string }>;
}

interface StorysetAPIResponse {
    data: StorysetAPIItem[];
    meta?: {
        total: number;
        current_page: number;
        per_page: number;
    };
}

/**
 * Fetch illustrations from Storyset
 */
export async function fetch(options: StorysetOptions = {}): Promise<GraphicResult[]> {
    const {
        category,
        style = 'rafiki',
        search: searchTerm
    } = options;

    const params = new URLSearchParams({
        style,
        page: '1',
        per_page: '30'
    });

    if (category) {
        params.set('category', category);
    }

    if (searchTerm) {
        params.set('search', searchTerm);
    }

    try {
        const response = await globalThis.fetch(`${API_URL}?${params}`);

        if (!response.ok) {
            console.error('Storyset API error:', response.status);
            return [];
        }

        const result: StorysetAPIResponse = await response.json();

        if (!result.data || !Array.isArray(result.data)) {
            console.error('Storyset API returned invalid data');
            return [];
        }

        return result.data.map(item => ({
            // Use src (SVG) as primary, fallback to preview (PNG)
            url: item.src || item.preview || item.preview_no_bg || '',
            source: 'storyset' as const,
            metadata: {
                id: String(item.id),
                title: item.illustration?.name || '',
                slug: item.slug,
                style: item.style,
                pageUrl: item.url,
                svgUrl: item.src,
                previewUrl: item.preview,
                tags: item.tags?.map(t => t.name) || []
            }
        })).filter(item => item.url); // Only return items with valid URLs
    } catch (err) {
        console.error('Storyset fetch error:', err);
        return [];
    }
}

/**
 * Get illustration URL pattern for embedding
 */
export function getEmbedUrl(slug: string, style: StorysetStyle = 'rafiki', color: string = '6366f1'): string {
    return `https://storyset.com/illustration/${slug}/${style}?color=${color}`;
}

/**
 * Get direct SVG URL by illustration slug
 */
export function getSvgUrl(illustrationSlug: string, style: StorysetStyle = 'rafiki'): string {
    // This returns the page URL - actual SVG requires API call
    return `https://storyset.com/illustration/${illustrationSlug}/${style}`;
}

/**
 * Search Storyset illustrations
 */
export async function search(terms: string[]): Promise<GraphicResult[]> {
    // Map common terms to Storyset categories
    const categoryMap: Record<string, StorysetCategory> = {
        'code': 'coding',
        'coding': 'coding',
        'programming': 'coding',
        'developer': 'coding',
        'software': 'coding',
        'tech': 'technology',
        'computer': 'technology',
        'server': 'technology',
        'api': 'technology',
        'office': 'business',
        'work': 'business',
        'team': 'business',
        'meeting': 'business',
        'finance': 'business',
        'payment': 'business',
        'money': 'business',
        'shopping': 'business',
        'ecommerce': 'business',
        'cart': 'business',
        'learn': 'education',
        'study': 'education',
        'school': 'education',
        'doctor': 'health',
        'medical': 'health',
        'fitness': 'health',
        'person': 'people',
        'human': 'people',
        'user': 'people',
        'success': 'business',
        'celebrate': 'people',
        'achievement': 'business'
    };

    let matchedCategory: StorysetCategory | undefined;

    // Find matching category from terms
    for (const term of terms) {
        const lowerTerm = term.toLowerCase();
        if (categoryMap[lowerTerm]) {
            matchedCategory = categoryMap[lowerTerm];
            break;
        }
        if (CATEGORIES.includes(lowerTerm as StorysetCategory)) {
            matchedCategory = lowerTerm as StorysetCategory;
            break;
        }
    }

    // Fetch with search terms
    const results = await fetch({
        category: matchedCategory,
        search: terms.join(' ')
    });

    return results;
}

/**
 * Get a specific illustration by searching
 */
export async function get(searchTerms: string | string[]): Promise<GraphicResult | null> {
    const terms = Array.isArray(searchTerms) ? searchTerms : [searchTerms];
    const results = await search(terms);
    return results.length > 0 ? results[0] : null;
}

export const storyset = {
    fetch,
    search,
    get,
    getEmbedUrl,
    getSvgUrl,
    categories: CATEGORIES,
    styles: STYLES
};
