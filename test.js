// Simple test to verify JSON structure and loading
const fs = require('fs');

try {
    // Read and parse the JSON file
    const jsonData = fs.readFileSync('posts.json', 'utf8');
    const posts = JSON.parse(jsonData);

    console.log('✅ JSON file is valid!');
    console.log(`📝 Found ${posts.length} blog posts:`);

    // Validate each post has required fields
    posts.forEach((post, index) => {
        const requiredFields = ['id', 'title', 'date', 'preview', 'url'];
        const missingFields = requiredFields.filter(field => !post[field]);

        if (missingFields.length > 0) {
            console.log(`❌ Post ${index + 1}: Missing fields: ${missingFields.join(', ')}`);
        } else {
            console.log(`✅ Post ${index + 1}: "${post.title}" - ${post.url}`);
        }
    });

    console.log('\n🎉 Blog system is ready! Open index.html in your browser to see it in action.');

} catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
}