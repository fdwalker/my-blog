# My Blog - Dynamic Post Loading

This blog uses a dynamic system to load blog posts from a JSON file, making it easy to add, remove, and manage content without editing HTML.

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
  "url": "posts/post7.html"
}
```

### 3. Update the ID
Make sure the `id` is unique and sequential.

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

- **Dynamic Loading**: Posts are loaded from JSON, no HTML editing required
- **Error Handling**: Graceful error messages if JSON fails to load
- **Security**: HTML escaping prevents XSS attacks
- **Responsive**: Works on all device sizes
- **Easy Maintenance**: Add posts by editing JSON only

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