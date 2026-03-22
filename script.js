// Blog post loader - dynamically loads posts from JSON
class BlogLoader {
    constructor() {
        this.postsContainer = document.getElementById('posts-container');
        this.posts = [];
    }

    // Load posts from JSON file
    async loadPosts() {
        try {
            const response = await fetch('posts.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.posts = await response.json();
            this.renderPosts();
        } catch (error) {
            console.error('Error loading blog posts:', error);
            this.showError('Failed to load blog posts. Please try again later.');
        }
    }

    // Render all posts to the page
    renderPosts() {
        if (!this.postsContainer) {
            console.error('Posts container not found!');
            return;
        }

        // Clear existing content
        this.postsContainer.innerHTML = '';

        // Create and append each post
        this.posts.forEach(post => {
            const postElement = this.createPostElement(post);
            this.postsContainer.appendChild(postElement);
        });
    }

    // Create HTML element for a single post
    createPostElement(post) {
        const article = document.createElement('article');
        article.className = 'blog-post';

        article.innerHTML = `
            <h2>${this.escapeHtml(post.title)}</h2>
            <div class="blog-date">Published on ${this.escapeHtml(post.date)}</div>
            <p class="blog-preview">${this.escapeHtml(post.preview)}</p>
            <a href="${this.escapeHtml(post.url)}" class="read-more">Read More →</a>
        `;

        return article;
    }

    // Simple HTML escaping to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Show error message
    showError(message) {
        if (!this.postsContainer) return;

        this.postsContainer.innerHTML = `
            <div class="error-message" style="
                background: #fee;
                color: #c33;
                padding: 2rem;
                border-radius: 8px;
                border: 1px solid #fcc;
                text-align: center;
                margin: 2rem 0;
            ">
                <h3>Oops!</h3>
                <p>${this.escapeHtml(message)}</p>
            </div>
        `;
    }
}

// Initialize blog loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const blogLoader = new BlogLoader();
    blogLoader.loadPosts();
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BlogLoader;
}
