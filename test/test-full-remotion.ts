// Full Remotion Integration Test
// Tests the API following Remotion best practices from Skills
// Run: node --import tsx test/test-full-remotion.ts

import {
    query,
    prefetchGraphics,
    svgToDataUri,
    getPrefetchedUrl,
    getGraphicsForContext,
    phosphor,
    lucide,
    iconoodle,
    storyset,
    doodleIpsum
} from '../src/index.js';

interface TestResult {
    name: string;
    passed: boolean;
    message: string;
    duration: number;
}

const results: TestResult[] = [];

async function test(name: string, fn: () => Promise<void>) {
    const start = Date.now();
    try {
        await fn();
        results.push({ name, passed: true, message: '✅ passed', duration: Date.now() - start });
    } catch (error) {
        results.push({ name, passed: false, message: `❌ ${error}`, duration: Date.now() - start });
    }
}

// === REMOTION CALCULATEMETADATA PATTERN ===
// From: remotion skill rules/calculate-metadata.md
// The pattern: fetch and transform props before rendering

async function testCalculateMetadataPattern() {
    console.log('\n=== Remotion calculateMetadata Pattern ===\n');

    await test('calculateMetadata: fetch graphics and transform props', async () => {
        // Simulate Remotion's calculateMetadata function
        type Props = { storyline: string; graphics?: any[] };

        const calculateMetadata = async ({ props }: { props: Props }) => {
            const graphics = await query(props.storyline);
            const prefetched = await prefetchGraphics(graphics.slice(0, 3));

            return {
                props: {
                    ...props,
                    graphics: prefetched,
                },
            };
        };

        const result = await calculateMetadata({ props: { storyline: 'developer coding laptop startup' } });

        if (!result.props.graphics || result.props.graphics.length === 0) {
            throw new Error('No graphics returned from calculateMetadata');
        }

        // Verify prefetched URLs are data URIs (not external URLs)
        const allPrefetched = result.props.graphics.every(
            (g: any) => g.url.startsWith('data:') || g.svg
        );

        if (!allPrefetched) {
            throw new Error('Some graphics not prefetched to data URIs');
        }

        console.log(`  → Got ${result.props.graphics.length} prefetched graphics`);
    });

    await test('calculateMetadata: categorized graphics (icons, illustrations, doodles)', async () => {
        const result = await getGraphicsForContext('team meeting business');

        if (!result.icons || !result.illustrations || !result.doodles) {
            throw new Error('Missing categories in result');
        }

        console.log(`  → Icons: ${result.icons.length}, Illustrations: ${result.illustrations.length}, Doodles: ${result.doodles.length}`);
    });
}

// === DATA URI CONVERSION ===
// Remotion cannot use external URLs during SSR render
// Must convert to data: URIs

async function testDataUriConversion() {
    console.log('\n=== Data URI Conversion ===\n');

    await test('svgToDataUri: converts SVG string to data URI', async () => {
        const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>';
        const dataUri = svgToDataUri(svg);

        if (!dataUri.startsWith('data:image/svg+xml,')) {
            throw new Error(`Invalid data URI format: ${dataUri.substring(0, 50)}`);
        }
    });

    await test('prefetchGraphics: converts batch to data URIs', async () => {
        const graphics = await phosphor.search(['check', 'arrow']);
        const prefetched = await prefetchGraphics(graphics.slice(0, 2));

        const allDataUris = prefetched.every(g => g.url.startsWith('data:') || g.prefetched);
        if (!allDataUris) {
            throw new Error('Not all graphics converted to data URIs');
        }

        console.log(`  → Prefetched ${prefetched.length} graphics`);
    });

    await test('getPrefetchedUrl: returns data URI from graphic with SVG', async () => {
        const graphic = {
            url: 'https://example.com/icon.svg',
            svg: '<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20"/></svg>',
            source: 'phosphor' as const,
            width: 24,
            height: 24
        };

        const url = getPrefetchedUrl(graphic);
        if (!url.startsWith('data:')) {
            throw new Error('getPrefetchedUrl did not return data URI');
        }
    });
}

// === PROVIDER TESTS ===
// Each provider returns valid GraphicResult objects

async function testProviders() {
    console.log('\n=== Provider Tests ===\n');

    await test('Phosphor: get icon with weight', async () => {
        const result = await phosphor.get({ name: 'check', weight: 'bold' });
        if (!result.url || !result.svg) {
            throw new Error('Phosphor icon missing url or svg');
        }
    });

    await test('Phosphor: search icons', async () => {
        const results = await phosphor.search(['arrow', 'check']);
        if (results.length === 0) {
            throw new Error('Phosphor search returned no results');
        }
        console.log(`  → Found ${results.length} icons`);
    });

    await test('Lucide: get icon', async () => {
        const result = await lucide.get({ name: 'settings' });
        if (!result.url) {
            throw new Error('Lucide icon missing url');
        }
    });

    await test('Iconoodle: search doodles', async () => {
        const results = await iconoodle.search(['arrow'], { limit: 5 });
        if (results.length === 0) {
            throw new Error('Iconoodle search returned no results');
        }
        console.log(`  → Found ${results.length} doodles`);
    });

    await test('Iconoodle: load different pack', async () => {
        const results = await iconoodle.search(['shape'], { pack: 'brutalist-doodles', limit: 3 });
        console.log(`  → Found ${results.length} brutalist doodles`);
    });

    await test('Storyset: search illustrations', async () => {
        const results = await storyset.search(['technology']);
        if (results.length === 0) {
            throw new Error('Storyset search returned no results');
        }
        console.log(`  → Found ${results.length} illustrations`);
    });

    await test('Doodle Ipsum: get random doodle', async () => {
        const result = doodleIpsum.getRandom({ style: 'flat', width: 100, height: 100 });
        if (!result.url) {
            throw new Error('Doodle Ipsum missing url');
        }
    });
}

// === CONTEXT-AWARE QUERY ===
// Natural language query returns matching graphics

async function testContextAwareQuery() {
    console.log('\n=== Context-Aware Query ===\n');

    await test('query: payment context returns finance icons', async () => {
        const results = await query('user sends payment confirmation');
        if (results.length === 0) {
            throw new Error('Query returned no results');
        }
        console.log(`  → Got ${results.length} graphics for payment context`);
    });

    await test('query: success context returns celebration graphics', async () => {
        const results = await query('team celebrating success');
        if (results.length === 0) {
            throw new Error('Query returned no results');
        }
        console.log(`  → Got ${results.length} graphics for success context`);
    });

    await test('query: technology context', async () => {
        const results = await query('developer coding on laptop startup');
        if (results.length === 0) {
            throw new Error('Query returned no results');
        }
        console.log(`  → Got ${results.length} graphics for tech context`);
    });
}

// === RUN ALL TESTS ===

async function main() {
    console.log('╔════════════════════════════════════════════╗');
    console.log('║  Graphics API - Full Remotion Test Suite   ║');
    console.log('╚════════════════════════════════════════════╝');

    await testCalculateMetadataPattern();
    await testDataUriConversion();
    await testProviders();
    await testContextAwareQuery();

    // Summary
    const passed = results.filter(r => r.passed).length;
    const failed = results.filter(r => !r.passed).length;
    const totalTime = results.reduce((sum, r) => sum + r.duration, 0);

    console.log('\n' + '═'.repeat(50));
    console.log(`\n📊 Results: ${passed} passed, ${failed} failed (${totalTime}ms)\n`);

    if (failed > 0) {
        console.log('Failed tests:');
        results.filter(r => !r.passed).forEach(r => {
            console.log(`  ${r.name}: ${r.message}`);
        });
        process.exit(1);
    }

    console.log('✅ All tests passed!');
}

main().catch(console.error);
