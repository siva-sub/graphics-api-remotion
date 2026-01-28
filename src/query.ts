// Semantic Query Engine

import { TAXONOMY, SOURCE_CAPABILITIES, Category, Style, ContentType, SourceName } from './taxonomy';
import { GraphicResult, GraphicSource } from './types';

export interface QueryOptions {
    concept?: string;
    style?: Style;
    contentType?: ContentType;
    categories?: Category[];
    subjects?: string[];
    preferSources?: GraphicSource[];
    excludeSources?: GraphicSource[];
    limit?: number;
}

export interface ParsedQuery {
    terms: string[];
    detectedCategories: Category[];
    detectedStyles: Style[];
    detectedContentType: ContentType | null;
    recommendedSources: SourceName[];
}

/**
 * Parse a natural language query into structured components
 */
export function parseQuery(queryStr: string): ParsedQuery {
    const terms = queryStr.toLowerCase().split(/\s+/).filter(t => t.length > 2);

    const detectedCategories: Category[] = [];
    const detectedStyles: Style[] = [];
    let detectedContentType: ContentType | null = null;

    // Match against taxonomy
    for (const term of terms) {
        // Check categories
        for (const [category, keywords] of Object.entries(TAXONOMY.categories)) {
            if ((keywords as readonly string[]).includes(term) || term === category) {
                if (!detectedCategories.includes(category as Category)) {
                    detectedCategories.push(category as Category);
                }
            }
        }

        // Check styles
        for (const [style, keywords] of Object.entries(TAXONOMY.styles)) {
            if ((keywords as readonly string[]).includes(term) || term === style) {
                if (!detectedStyles.includes(style as Style)) {
                    detectedStyles.push(style as Style);
                }
            }
        }

        // Check content types
        for (const [type, keywords] of Object.entries(TAXONOMY.contentTypes)) {
            if ((keywords as readonly string[]).includes(term) || term === type) {
                detectedContentType = type as ContentType;
            }
        }
    }

    // Recommend sources based on detected attributes
    const recommendedSources = rankSources({
        categories: detectedCategories,
        styles: detectedStyles,
        contentType: detectedContentType
    });

    return {
        terms,
        detectedCategories,
        detectedStyles,
        detectedContentType,
        recommendedSources
    };
}

/**
 * Rank sources based on query attributes
 */
function rankSources(attrs: {
    categories: Category[];
    styles: Style[];
    contentType: ContentType | null;
}): SourceName[] {
    const scores: Record<SourceName, number> = {
        'doodle-ipsum': 0,
        'storyset': 0,
        'phosphor': 0,
        'lucide': 0,
        'iconoodle': 0
    };

    for (const [source, capabilities] of Object.entries(SOURCE_CAPABILITIES)) {
        const sourceName = source as SourceName;

        // Content type match (highest weight)
        if (attrs.contentType) {
            if ((capabilities.types as readonly string[]).includes(attrs.contentType)) {
                scores[sourceName] += 10;
            }
        }

        // Style match
        for (const style of attrs.styles) {
            if ((capabilities.styles as readonly string[]).includes(style)) {
                scores[sourceName] += 5;
            }
        }

        // Category match
        for (const category of attrs.categories) {
            const cats = capabilities.categories as readonly string[];
            if (cats.includes('*') || cats.includes(category)) {
                scores[sourceName] += 3;
            }
        }
    }

    // Sort by score descending
    return Object.entries(scores)
        .sort(([, a], [, b]) => b - a)
        .filter(([, score]) => score > 0)
        .map(([source]) => source as SourceName);
}

/**
 * Query interface - accepts string or structured options
 */
export async function queryGraphics(
    input: string | QueryOptions,
    providers: Record<SourceName, { search: (terms: string[]) => Promise<GraphicResult[]> }>
): Promise<GraphicResult[]> {
    const parsed = typeof input === 'string'
        ? parseQuery(input)
        : parseQuery(input.concept || '');

    const options = typeof input === 'object' ? input : {};

    // Determine which sources to query
    let sourcesToQuery = parsed.recommendedSources;

    if (options.preferSources?.length) {
        sourcesToQuery = options.preferSources as SourceName[];
    }

    if (options.excludeSources?.length) {
        sourcesToQuery = sourcesToQuery.filter(
            s => !options.excludeSources?.includes(s)
        );
    }

    // Default to top 2 sources if none specified
    if (sourcesToQuery.length === 0) {
        sourcesToQuery = ['storyset', 'phosphor'];
    }

    // Query providers in parallel
    const results = await Promise.all(
        sourcesToQuery.slice(0, 3).map(async (source) => {
            const provider = providers[source];
            if (!provider) return [];
            try {
                return await provider.search(parsed.terms);
            } catch {
                return [];
            }
        })
    );

    // Flatten and limit
    const limit = options.limit || 10;
    return results.flat().slice(0, limit);
}

export { parseQuery as parse };
