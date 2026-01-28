// Remotion Prefetch Utilities
// Pre-fetch graphics before rendering to avoid external URL issues
// See: https://www.remotion.dev/docs/prefetch

import type { GraphicResult } from '../types';

/**
 * Prefetch graphics for Remotion rendering
 * 
 * Remotion cannot use external URLs directly during server-side render.
 * This utility fetches SVG content and converts URLs to data URIs.
 * 
 * @example
 * // In calculateMetadata
 * const graphics = await query("team celebration");
 * const prefetched = await prefetchGraphics(graphics);
 * return { props: { ...props, graphics: prefetched } };
 */
export async function prefetchGraphics(graphics: GraphicResult[]): Promise<GraphicResult[]> {
    return Promise.all(graphics.map(async (graphic) => {
        // If already has SVG content, convert to data URI
        if (graphic.svg) {
            const dataUri = svgToDataUri(graphic.svg);
            return {
                ...graphic,
                url: dataUri,
                prefetched: true
            };
        }

        // Fetch SVG from URL
        try {
            const response = await fetch(graphic.url);
            if (!response.ok) return graphic;

            const contentType = response.headers.get('content-type') || '';
            const content = await response.text();

            if (contentType.includes('svg') || content.trim().startsWith('<svg')) {
                const dataUri = svgToDataUri(content);
                return {
                    ...graphic,
                    svg: content,
                    url: dataUri,
                    prefetched: true
                };
            }

            // For non-SVG (images), convert to base64 data URI
            const blob = await fetch(graphic.url).then(r => r.blob());
            const arrayBuffer = await blob.arrayBuffer();
            const base64 = Buffer.from(arrayBuffer).toString('base64');
            const dataUri = `data:${blob.type};base64,${base64}`;

            return {
                ...graphic,
                url: dataUri,
                prefetched: true
            };
        } catch {
            // Return original if prefetch fails
            return graphic;
        }
    }));
}

/**
 * Convert SVG string to data URI
 */
export function svgToDataUri(svg: string): string {
    // Encode SVG for data URI
    const encoded = encodeURIComponent(svg)
        .replace(/'/g, '%27')
        .replace(/"/g, '%22');
    return `data:image/svg+xml,${encoded}`;
}

/**
 * Convert SVG to base64 data URI
 */
export function svgToBase64DataUri(svg: string): string {
    const base64 = Buffer.from(svg).toString('base64');
    return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Prefetch a single graphic
 */
export async function prefetchGraphic(graphic: GraphicResult): Promise<GraphicResult> {
    const [prefetched] = await prefetchGraphics([graphic]);
    return prefetched;
}

/**
 * Hook-style prefetch for use in Remotion components
 * Returns the prefetched URL to use with <Img> or dangerouslySetInnerHTML
 * 
 * @example
 * const MyScene: React.FC<{ graphic: GraphicResult }> = ({ graphic }) => {
 *   const prefetchedUrl = usePrefetchedGraphic(graphic);
 *   return <Img src={prefetchedUrl} />;
 * };
 */
export function getPrefetchedUrl(graphic: GraphicResult): string {
    if (graphic.svg) {
        return svgToDataUri(graphic.svg);
    }
    return graphic.url;
}

/**
 * Render SVG as React element (for dangerouslySetInnerHTML)
 */
export function renderSvgContent(graphic: GraphicResult): string | null {
    return graphic.svg || null;
}

export const remotionUtils = {
    prefetchGraphics,
    prefetchGraphic,
    svgToDataUri,
    svgToBase64DataUri,
    getPrefetchedUrl,
    renderSvgContent
};
