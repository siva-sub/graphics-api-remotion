// Test script for Graphics API providers
// Run: npx ts-node test/test-providers.ts

import { doodleIpsum } from '../src/providers/doodle-ipsum';
import { storyset } from '../src/providers/storyset';
import { iraDesign } from '../src/providers/ira-design';
import { phosphor } from '../src/providers/phosphor';
import { lucide } from '../src/providers/lucide';
import { iconoodle } from '../src/providers/iconoodle';

async function testProvider(name: string, testFn: () => Promise<void>) {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`Testing: ${name}`);
    console.log('='.repeat(50));

    try {
        await testFn();
        console.log(`✅ ${name} PASSED`);
    } catch (error) {
        console.log(`❌ ${name} FAILED:`, error);
    }
}

async function runTests() {
    console.log('Graphics API Provider Tests');
    console.log('============================\n');

    // Test 1: Doodle Ipsum
    await testProvider('Doodle Ipsum', async () => {
        const url = doodleIpsum.getUrl({ width: 400, height: 300, style: 'flat' });
        console.log('  URL:', url);

        const random = doodleIpsum.getRandom({ style: 'hand-drawn' });
        console.log('  Random doodle:', random.url);

        const search = await doodleIpsum.search(['sketch', 'doodle']);
        console.log('  Search results:', search.length, 'items');

        if (!url.includes('doodleipsum.com')) throw new Error('Invalid URL');
    });

    // Test 2: Storyset
    await testProvider('Storyset', async () => {
        const results = await storyset.fetch({ category: 'technology', style: 'rafiki' });
        console.log('  Fetch results:', results.length, 'items');
        if (results.length > 0) {
            console.log('  First result:', results[0].metadata);
        }

        const search = await storyset.search(['coding', 'developer']);
        console.log('  Search results:', search.length, 'items');
    });

    // Test 3: IRA Design
    await testProvider('IRA Design', async () => {
        const url = iraDesign.getUrl('characters', 'char1');
        console.log('  URL:', url);

        const random = iraDesign.getRandom('characters');
        console.log('  Random:', random.url);

        const categories = iraDesign.categories;
        console.log('  Categories:', categories);

        if (!url.includes('ira-design')) throw new Error('Invalid URL');
    });

    // Test 4: Phosphor Icons
    await testProvider('Phosphor Icons', async () => {
        const url = phosphor.getUrl('arrow-right', 'bold');
        console.log('  URL:', url);

        // Actually fetch the SVG
        const svg = await phosphor.fetchSvg('check', 'regular');
        console.log('  SVG fetched:', svg ? `${svg.length} chars` : 'FAILED');

        const icon = await phosphor.get({ name: 'heart', weight: 'fill', size: 32 });
        console.log('  Icon result:', icon.url);
        console.log('  SVG available:', !!icon.svg);

        const search = await phosphor.search(['arrow', 'check']);
        console.log('  Search results:', search.length, 'items');

        if (!svg) throw new Error('Failed to fetch SVG');
    });

    // Test 5: Lucide Icons
    await testProvider('Lucide Icons', async () => {
        const url = lucide.getUrl('settings');
        console.log('  URL:', url);

        // Actually fetch the SVG
        const svg = await lucide.fetchSvg('home');
        console.log('  SVG fetched:', svg ? `${svg.length} chars` : 'FAILED');

        const icon = await lucide.get({ name: 'star', size: 24 });
        console.log('  Icon result:', icon.url);
        console.log('  SVG available:', !!icon.svg);

        const search = await lucide.search(['arrow', 'mail']);
        console.log('  Search results:', search.length, 'items');

        if (!svg) throw new Error('Failed to fetch SVG');
    });

    // Test 6: Iconoodle
    await testProvider('Iconoodle', async () => {
        // This fetches from GitHub
        const count = await iconoodle.count();
        console.log('  Total doodles:', count);

        const categories = await iconoodle.getCategories();
        console.log('  Categories:', categories.slice(0, 5), '...');

        const styles = await iconoodle.getStyles();
        console.log('  Styles:', styles);

        const random = await iconoodle.getRandom();
        console.log('  Random doodle:', random?.metadata);
        console.log('  SVG available:', !!random?.svg);

        const search = await iconoodle.search(['arrow']);
        console.log('  Search results:', search.length, 'items');

        if (count === 0) throw new Error('No doodles fetched');
    });

    // Test semantic query
    await testProvider('Semantic Query', async () => {
        const { query } = await import('../src/index');

        const results = await query('coding developer illustration');
        console.log('  Query "coding developer illustration":', results.length, 'results');
        if (results.length > 0) {
            console.log('  Sources:', [...new Set(results.map(r => r.source))]);
        }

        const iconResults = await query('arrow icon');
        console.log('  Query "arrow icon":', iconResults.length, 'results');
    });

    console.log('\n' + '='.repeat(50));
    console.log('All tests completed');
    console.log('='.repeat(50));
}

runTests().catch(console.error);
