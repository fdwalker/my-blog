# My Blog - Dynamic Post Loading

This blog uses a dynamic system to load blog posts from a JSON file, making it easy to add, remove, and manage content without editing HTML.

## 🌐 Live Blog
**View the live blog at:** https://fdwalker.github.io/my-blog/index.html

## How It Works

1. **posts.json** - Contains all blog post metadata (title, date, preview, URL)
2. **script.js** - Loads the JSON data and dynamically creates blog post cards
3. **index.html** - Contains a container where posts are loaded
4. **posts/** - Directory containing individual blog post HTML files

## Adding a New Blog Post

To add a new blog post, follow these steps:

### 1. Create the Full Post Page
Create a new HTML file in the `posts/` directory (e.g., `post7.html`) with the complete blog post content.

### 2. Add Post Data to JSON
Add a new entry to `posts.json`:

```json
{
  "id": 7,
  "title": "Your New Blog Post Title",
  "date": "January 1, 2025",
  "preview": "A brief preview of your blog post content...",
  "url": "posts/post7.html",
  "categories": ["Category1", "Category2"]
}
```

### 3. Update the ID
Make sure the `id` is unique and sequential.

## Categories and Filtering

The blog includes a dynamic category system:

- **Category Tags**: Each post displays its categories as colored tags
- **Filter Buttons**: Automatically generated filter buttons for each category
- **Filter by Category**: Click any category button to show only posts in that category
- **Show All Posts**: "All Posts" button shows everything

### Available Categories
- **Beginner**: Introductory content for new developers
- **Fundamentals**: Core concepts and basics
- **Best Practices**: Coding standards and professional practices
- **Development**: General development topics
- **CSS**: Cascading Style Sheets and styling
- **Responsive**: Mobile-first and responsive design
- **Layout**: CSS Grid, Flexbox, and layout techniques
- **JavaScript**: JavaScript language features and usage
- **ES6**: Modern JavaScript (ES6+) features
- **Accessibility**: Web accessibility and inclusive design

## File Structure

```
my-blog/
├── index.html          # Main blog page
├── script.js           # Dynamic loading logic
├── style.css           # Blog styling
├── posts.json          # Blog post metadata
└── posts/              # Individual post pages
    ├── post1.html
    ├── post2.html
    └── ...
```

## Features

- **🔄 Dynamic Loading**: Posts load automatically from JSON when the page loads
- **🏷️ Category System**: Posts are tagged with categories for better organization
- **🔍 Filter System**: Filter posts by category with one-click buttons
- **🛡️ Error Handling**: Graceful error messages if JSON fails to load
- **🔒 Security**: HTML escaping prevents XSS attacks
- **📱 Responsive**: Works on all device sizes
- **🔧 Easy Maintenance**: Add posts by editing JSON only

## Testing

To test the blog locally:

1. Open `index.html` in a web browser
2. The posts should load automatically from `posts.json`
3. Click "Read More" to view individual posts
4. Check browser console for any errors

## Browser Compatibility

- Modern browsers with ES6+ support
- Requires `fetch` API (IE 11+)
- Graceful degradation for older browsers

## Customization

You can modify the `BlogLoader` class in `script.js` to:
- Change the JSON file location
- Modify the HTML structure of posts
- Add loading indicators
- Implement pagination
- Add search/filter functionality