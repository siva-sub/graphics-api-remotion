// Remotion Integration Test
// Tests that graphics work with Remotion's prefetch and rendering patterns
// Run: npx tsx test/test-remotion-integration.ts

import { query, prefetchGraphics, svgToDataUri, getPrefetchedUrl, getGraphicsForContext } from '../src/index';

async function testRemotionIntegration() {
    console.log('=== Remotion Integration Tests ===\n');
    let passed = 0;
    let failed = 0;

    // Test 1: Query returns graphics with SVG content
    console.log('📦 Test 1: Query returns graphics with SVG');
    try {
        const graphics = await query("user sends payment");
        if (graphics.length > 0) {
            // Graphics have url OR svg content
            const hasContent = graphics.every(g => g.url !== undefined);
            if (hasContent) {
                console.log(`  ✅ Got ${graphics.length} graphics with URLs`);
                passed++;
            } else {
                console.log(`  ❌ Some graphics missing URLs`);
                failed++;
            }
        } else {
            console.log(`  ❌ No graphics returned`);
            failed++;
        }
    } catch (error) {
        console.log(`  ❌ Query failed: ${error}`);
        failed++;
    }

    // Test 2: Prefetch converts URLs to data URIs
    console.log('\n📦 Test 2: Prefetch converts to data URIs');
    try {
        const graphics = await query("check success");
        const prefetched = await prefetchGraphics(graphics.slice(0, 2));

        const allPrefetched = prefetched.every(g =>
            g.url.startsWith('data:') || g.prefetched === true
        );

        if (allPrefetched) {
            console.log(`  ✅ All ${prefetched.length} graphics prefetched to data URIs`);
            passed++;
        } else {
            const nonPrefetched = prefetched.filter(g => !g.url.startsWith('data:'));
            console.log(`  ❌ ${nonPrefetched.length} graphics not prefetched`);
            failed++;
        }
    } catch (error) {
        console.log(`  ❌ Prefetch failed: ${error}`);
        failed++;
    }

    // Test 3: SVG to data URI conversion
    console.log('\n📦 Test 3: SVG to data URI conversion');
    try {
        const testSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>';
        const dataUri = svgToDataUri(testSvg);

        if (dataUri.startsWith('data:image/svg+xml,')) {
            console.log(`  ✅ SVG converted to data URI (${dataUri.length} chars)`);
            passed++;
        } else {
            console.log(`  ❌ Invalid data URI format`);
            failed++;
        }
    } catch (error) {
        console.log(`  ❌ SVG conversion failed: ${error}`);
        failed++;
    }

    // Test 4: getGraphicsForContext returns categorized results
    console.log('\n📦 Test 4: getGraphicsForContext categorization');
    try {
        const result = await getGraphicsForContext("team coding startup");

        const hasCategories = 'icons' in result && 'illustrations' in result && 'doodles' in result;
        if (hasCategories) {
            console.log(`  ✅ Got ${result.icons.length} icons, ${result.illustrations.length} illustrations, ${result.doodles.length} doodles`);
            passed++;
        } else {
            console.log(`  ❌ Missing categories in result`);
            failed++;
        }
    } catch (error) {
        console.log(`  ❌ getGraphicsForContext failed: ${error}`);
        failed++;
    }

    // Test 5: Prefetched graphics work in Remotion pattern
    console.log('\n📦 Test 5: Remotion calculateMetadata pattern');
    try {
        // Simulate Remotion's calculateMetadata pattern
        const calculateMetadata = async (props: { storyline: string }) => {
            const graphics = await query(props.storyline);
            const prefetched = await prefetchGraphics(graphics.slice(0, 3));
            return { props: { ...props, graphics: prefetched } };
        };

        const result = await calculateMetadata({ storyline: "developer coding laptop" });

        if (result.props.graphics && result.props.graphics.length > 0) {
            const allValid = result.props.graphics.every(g =>
                g.url && (g.url.startsWith('data:') || g.svg)
            );
            if (allValid) {
                console.log(`  ✅ calculateMetadata pattern works (${result.props.graphics.length} prefetched graphics)`);
                passed++;
            } else {
                console.log(`  ❌ Some graphics not properly prefetched`);
                failed++;
            }
        } else {
            console.log(`  ❌ No graphics returned from calculateMetadata`);
            failed++;
        }
    } catch (error) {
        console.log(`  ❌ calculateMetadata pattern failed: ${error}`);
        failed++;
    }

    // Test 6: getPrefetchedUrl works correctly
    console.log('\n📦 Test 6: getPrefetchedUrl utility');
    try {
        const graphic = {
            url: 'https://example.com/icon.svg',
            svg: '<svg viewBox="0 0 24 24"><path d="M1 1h22v22H1z"/></svg>',
            source: 'phosphor' as const,
            width: 24,
            height: 24
        };

        const prefetchedUrl = getPrefetchedUrl(graphic);

        if (prefetchedUrl.startsWith('data:image/svg+xml,')) {
            console.log(`  ✅ getPrefetchedUrl returns data URI`);
            passed++;
        } else {
            console.log(`  ❌ getPrefetchedUrl returned external URL: ${prefetchedUrl}`);
            failed++;
        }
    } catch (error) {
        console.log(`  ❌ getPrefetchedUrl failed: ${error}`);
        failed++;
    }

    // Summary
    console.log('\n' + '='.repeat(45));
    console.log(`Remotion Integration: ${passed} passed, ${failed} failed`);
    console.log('='.repeat(45));

    if (failed > 0) {
        process.exit(1);
    }
}

testRemotionIntegration().catch(console.error);
