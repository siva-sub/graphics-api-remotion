// Comprehensive endpoint test - verify all URLs return valid content
// Run: npx tsx test/test-endpoints.ts

async function testUrl(name: string, url: string): Promise<boolean> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.log(`  ❌ ${name}: ${response.status} ${response.statusText}`);
            console.log(`     URL: ${url}`);
            return false;
        }
        const contentType = response.headers.get('content-type') || '';
        const size = (await response.text()).length;
        console.log(`  ✅ ${name}: ${size} bytes (${contentType.split(';')[0]})`);
        return true;
    } catch (error) {
        console.log(`  ❌ ${name}: ${error}`);
        console.log(`     URL: ${url}`);
        return false;
    }
}

async function main() {
    console.log('=== Graphics API Endpoint Tests ===\n');
    let passed = 0;
    let failed = 0;

    // Test 1: Doodle Ipsum
    console.log('📦 Doodle Ipsum');
    if (await testUrl('Flat style', 'https://doodleipsum.com/400x300/flat')) passed++; else failed++;
    if (await testUrl('Hand-drawn', 'https://doodleipsum.com/400x300/hand-drawn')) passed++; else failed++;
    if (await testUrl('Outline', 'https://doodleipsum.com/400x300/outline')) passed++; else failed++;

    // Test 2: Phosphor Icons (GitHub raw - with correct filename pattern)
    console.log('\n📦 Phosphor Icons');
    if (await testUrl('Regular weight', 'https://raw.githubusercontent.com/phosphor-icons/core/main/assets/regular/check.svg')) passed++; else failed++;
    if (await testUrl('Bold weight', 'https://raw.githubusercontent.com/phosphor-icons/core/main/assets/bold/arrow-right-bold.svg')) passed++; else failed++;
    if (await testUrl('Fill weight', 'https://raw.githubusercontent.com/phosphor-icons/core/main/assets/fill/heart-fill.svg')) passed++; else failed++;

    // Test 3: Lucide Icons (unpkg CDN)
    console.log('\n📦 Lucide Icons');
    if (await testUrl('Settings icon', 'https://unpkg.com/lucide-static@latest/icons/settings.svg')) passed++; else failed++;
    if (await testUrl('Home icon', 'https://unpkg.com/lucide-static@latest/icons/home.svg')) passed++; else failed++;
    if (await testUrl('Star icon', 'https://unpkg.com/lucide-static@latest/icons/star.svg')) passed++; else failed++;

    // Test 4: Iconoodle (GitHub JSON - all packs)
    console.log('\n📦 Iconoodle');

    // Main doodles pack
    try {
        const doodlesUrl = 'https://raw.githubusercontent.com/NK2552003/Iconoodle/main/lib/doodles.json';
        const response = await fetch(doodlesUrl);
        const json = await response.json();
        console.log(`  ✅ doodles.json: ${json.length} items loaded`);
        if (json.length > 0 && json[0].svg) {
            console.log(`  ✅ First item has SVG content`);
            passed += 2;
        } else {
            console.log(`  ❌ No SVG content in doodles`);
            failed++;
        }
    } catch (error) {
        console.log(`  ❌ Failed to fetch doodles.json: ${error}`);
        failed++;
    }

    // Brutalist doodles pack
    try {
        const brutalUrl = 'https://raw.githubusercontent.com/NK2552003/Iconoodle/main/lib/brutalist-doodles.json';
        const response = await fetch(brutalUrl);
        const json = await response.json();
        console.log(`  ✅ brutalist-doodles.json: ${json.length} items loaded`);
        passed++;
    } catch (error) {
        console.log(`  ❌ Failed to fetch brutalist-doodles.json: ${error}`);
        failed++;
    }

    // Test 5: Storyset (Freepik API)
    console.log('\n📦 Storyset (Freepik API)');
    const storysetUrl = 'https://stories.freepiklabs.com/api/vectors?page=1&per_page=5&order=-downloads';
    try {
        const response = await fetch(storysetUrl);
        if (response.ok) {
            const json = await response.json();
            console.log(`  ✅ API response: ${json.data?.length || 0} illustrations`);
            if (json.data && json.data.length > 0) {
                const first = json.data[0];
                console.log(`  ✅ First item: ${first.slug || first.id}`);
                passed += 2;
            } else {
                console.log(`  ⚠️ No data in response`);
                passed++;
            }
        } else {
            console.log(`  ❌ API returned ${response.status}`);
            failed++;
        }
    } catch (error) {
        console.log(`  ❌ Storyset API failed: ${error}`);
        failed++;
    }

    // Summary
    console.log('\n' + '='.repeat(40));
    console.log(`Results: ${passed} passed, ${failed} failed`);
    console.log('='.repeat(40));

    if (failed > 0) {
        process.exit(1);
    }
}

main().catch(console.error);
