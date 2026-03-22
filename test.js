// Simple test to verify JSON structure and loading
const fs = require('fs');

try {
    // Read and parse the JSON file
    const jsonData = fs.readFileSync('posts.json', 'utf8');
    const posts = JSON.parse(jsonData);

    console.log('✅ JSON file is valid!');
    console.log(`📝 Found ${posts.length} blog posts:`);

    // Validate each post has required fields and categories
    const allCategories = new Set();
    posts.forEach((post, index) => {
        const requiredFields = ['id', 'title', 'date', 'preview', 'url', 'categories'];
        const missingFields = requiredFields.filter(field => !post[field]);

        if (missingFields.length > 0) {
            console.log(`❌ Post ${index + 1}: Missing fields: ${missingFields.join(', ')}`);
        } else {
            console.log(`✅ Post ${index + 1}: "${post.title}" - ${post.url}`);
            console.log(`   🏷️  Categories: ${post.categories.join(', ')}`);

            // Collect all categories
            post.categories.forEach(cat => allCategories.add(cat));
        }
    });

    console.log(`\n🏷️  Total unique categories: ${allCategories.size}`);
    console.log(`   Categories: ${Array.from(allCategories).sort().join(', ')}`);

    console.log('\n🎉 Blog system with categories is ready! Open index.html in your browser to see it in action.');
    console.log('🔍 Try clicking the category filter buttons to see the filtering in action!');

} catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
}