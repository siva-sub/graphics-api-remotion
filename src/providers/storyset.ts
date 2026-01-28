// Storyset Provider
// Uses Freepik's internal API - no auth required

import { StorysetOptions, StorysetCategory, StorysetStyle, GraphicResult } from '../types';

const API_URL = 'https://stories.freepiklabs.com/api/vectors';

const CATEGORIES: StorysetCategory[] = [
    'business', 'coding', 'education', 'health', 'people', 'technology'
];

const STYLES: StorysetStyle[] = ['rafiki', 'bro', 'amico', 'pana', 'cuate'];

interface StorysetAPIResponse {
    data: Array<{
        id: string;
        title: string;
        slug: string;
        thumbnail: string;
        svg_url?: string;
        category: string;
    }>;
    meta?: {
        total: number;
        page: number;
    };
}

/**
 * Fetch illustrations from Storyset
 */
export async function fetch(options: StorysetOptions = {}): Promise<GraphicResult[]> {
    const {
        category = 'business',
        style = 'rafiki',
        search: searchTerm
    } = options;

    const params = new URLSearchParams({
        category,
        style,
        page: '1',
        per_page: '12'
    });

    if (searchTerm) {
        params.set('search', searchTerm);
    }

    try {
        const response = await globalThis.fetch(`${API_URL}?${params}`);

        if (!response.ok) {
            // Fallback to direct Storyset URLs
            return getFallback(category, style);
        }

        const data: StorysetAPIResponse = await response.json();

        return data.data.map(item => ({
            url: item.thumbnail || item.svg_url || '',
            source: 'storyset' as const,
            metadata: {
                id: item.id,
                title: item.title,
                slug: item.slug,
                category: item.category,
                style
            }
        }));
    } catch {
        return getFallback(category, style);
    }
}

/**
 * Fallback URLs when API fails
 */
function getFallback(category: StorysetCategory, style: StorysetStyle): GraphicResult[] {
    // Direct Storyset page URLs
    const baseUrl = `https://storyset.com/${category}`;

    return [{
        url: baseUrl,
        source: 'storyset',
        metadata: { category, style, fallback: true }
    }];
}

/**
 * Get illustration URL pattern for embedding
 */
export function getEmbedUrl(slug: string, style: StorysetStyle = 'rafiki', color: string = '6366f1'): string {
    return `https://storyset.com/illustration/${slug}/${style}?color=${color}`;
}

/**
 * Search Storyset illustrations
 */
export async function search(terms: string[]): Promise<GraphicResult[]> {
    // Map terms to categories
    const categoryMap: Record<string, StorysetCategory> = {
        'code': 'coding',
        'coding': 'coding',
        'programming': 'coding',
        'developer': 'coding',
        'tech': 'technology',
        'computer': 'technology',
        'office': 'business',
        'work': 'business',
        'team': 'business',
        'meeting': 'business',
        'learn': 'education',
        'study': 'education',
        'doctor': 'health',
        'medical': 'health',
        'person': 'people',
        'human': 'people'
    };

    let matchedCategory: StorysetCategory = 'business';
    for (const term of terms) {
        if (categoryMap[term]) {
            matchedCategory = categoryMap[term];
            break;
        }
        if (CATEGORIES.includes(term as StorysetCategory)) {
            matchedCategory = term as StorysetCategory;
            break;
        }
    }

    return fetch({
        category: matchedCategory,
        search: terms.join(' ')
    });
}

export const storyset = {
    fetch,
    search,
    getEmbedUrl,
    categories: CATEGORIES,
    styles: STYLES
};
