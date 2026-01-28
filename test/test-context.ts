// Test context-based graphics selection
// Run: npx tsx test/test-context.ts

import { query, getGraphicsForContext, getIconsForContext, getThemesForContext } from '../src/index';

async function testContextQuery() {
    console.log('Context-Based Query Tests\n');
    console.log('='.repeat(60));

    // Test 1: getIconsForContext
    console.log('\n📌 Test: getIconsForContext');
    const paymentIcons = getIconsForContext('user sends payment confirmation');
    console.log('  "user sends payment confirmation":', paymentIcons);

    const successIcons = getIconsForContext('task completed successfully');
    console.log('  "task completed successfully":', successIcons);

    const loginIcons = getIconsForContext('user login authentication');
    console.log('  "user login authentication":', loginIcons);

    // Test 2: getThemesForContext
    console.log('\n📌 Test: getThemesForContext');
    const codingThemes = getThemesForContext('developer coding on laptop');
    console.log('  "developer coding on laptop":', codingThemes);

    const businessThemes = getThemesForContext('team meeting presentation');
    console.log('  "team meeting presentation":', businessThemes);

    // Test 3: Context-aware query
    console.log('\n📌 Test: Context-aware query()');

    console.log('\n  Query: "user sends payment"');
    const paymentResults = await query('user sends payment');
    console.log('  Results:', paymentResults.length, 'items');
    console.log('  Sources:', [...new Set(paymentResults.map(r => r.source))]);
    if (paymentResults[0]) {
        console.log('  First:', paymentResults[0].metadata);
    }

    console.log('\n  Query: "success celebration"');
    const successResults = await query('success celebration');
    console.log('  Results:', successResults.length, 'items');
    console.log('  Sources:', [...new Set(successResults.map(r => r.source))]);

    console.log('\n  Query: "error warning alert"');
    const errorResults = await query('error warning alert');
    console.log('  Results:', errorResults.length, 'items');
    console.log('  Sources:', [...new Set(errorResults.map(r => r.source))]);

    // Test 4: getGraphicsForContext
    console.log('\n📌 Test: getGraphicsForContext');
    const context = await getGraphicsForContext('team coding startup');
    console.log('  "team coding startup":');
    console.log('    Icons:', context.icons.length);
    console.log('    Illustrations:', context.illustrations.length);
    console.log('    Doodles:', context.doodles.length);

    console.log('\n' + '='.repeat(60));
    console.log('All context tests completed');
}

testContextQuery().catch(console.error);
