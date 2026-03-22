// Blog post loader - dynamically loads posts from JSON
class BlogLoader {
    constructor() {
        this.postsContainer = document.getElementById('posts-container');
        this.filterContainer = document.querySelector('.filter-buttons');
        this.posts = [];
        this.allCategories = new Set();
        this.currentFilter = 'all';
    }

    // Load posts from JSON file
    async loadPosts() {
        try {
            const response = await fetch('posts.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.posts = await response.json();
            this.extractCategories();
            this.createFilterButtons();
            this.renderPosts();
        } catch (error) {
            console.error('Error loading blog posts:', error);
            this.showError('Failed to load blog posts. Please try again later.');
        }
    }

    // Extract all unique categories from posts
    extractCategories() {
        this.posts.forEach(post => {
            if (post.categories && Array.isArray(post.categories)) {
                post.categories.forEach(category => this.allCategories.add(category));
            }
        });
    }

    // Create filter buttons for each category
    createFilterButtons() {
        if (!this.filterContainer) return;

        // Clear existing buttons except "All Posts"
        const allPostsBtn = this.filterContainer.querySelector('.all-posts');
        this.filterContainer.innerHTML = '';
        this.filterContainer.appendChild(allPostsBtn);

        // Add click event listener to "All Posts" button
        allPostsBtn.addEventListener('click', () => this.filterPosts('all'));

        // Sort categories alphabetically
        const sortedCategories = Array.from(this.allCategories).sort();

        // Create button for each category
        sortedCategories.forEach(category => {
            const button = document.createElement('button');
            button.className = 'filter-btn';
            button.textContent = category;
            button.setAttribute('data-filter', category.toLowerCase().replace(/\s+/g, '-'));
            button.addEventListener('click', () => this.filterPosts(category));
            this.filterContainer.appendChild(button);
        });
    }

    // Filter posts by category
    filterPosts(category) {
        this.currentFilter = category;

        // Update active button state
        const buttons = this.filterContainer.querySelectorAll('.filter-btn');
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if ((category === 'all' && btn.classList.contains('all-posts')) ||
                btn.getAttribute('data-filter') === category.toLowerCase().replace(/\s+/g, '-')) {
                btn.classList.add('active');
            }
        });

        this.renderPosts();
    }

    // Render all posts to the page
    renderPosts() {
        if (!this.postsContainer) {
            console.error('Posts container not found!');
            return;
        }

        // Clear existing content
        this.postsContainer.innerHTML = '';

        // Filter posts based on current filter
        const filteredPosts = this.currentFilter === 'all'
            ? this.posts
            : this.posts.filter(post =>
                post.categories &&
                post.categories.some(cat =>
                    cat.toLowerCase().replace(/\s+/g, '-') === this.currentFilter.toLowerCase().replace(/\s+/g, '-')
                )
            );

        // Create and append each post
        if (filteredPosts.length === 0) {
            this.showNoPostsMessage();
        } else {
            filteredPosts.forEach(post => {
                const postElement = this.createPostElement(post);
                this.postsContainer.appendChild(postElement);
            });
        }
    }

    // Create HTML element for a single post
    createPostElement(post) {
        const article = document.createElement('article');
        article.className = 'blog-post';

        // Create category tags HTML
        const categoryTags = post.categories && post.categories.length > 0
            ? `<div class="post-categories">
                ${post.categories.map(cat =>
                    `<span class="category-tag">${this.escapeHtml(cat)}</span>`
                ).join('')}
               </div>`
            : '';

        article.innerHTML = `
            ${categoryTags}
            <h2>${this.escapeHtml(post.title)}</h2>
            <div class="blog-date">Published on ${this.escapeHtml(post.date)}</div>
            <p class="blog-preview">${this.escapeHtml(post.preview)}</p>
            <a href="${this.escapeHtml(post.url)}" class="read-more">Read More →</a>
        `;

        return article;
    }

    // Show message when no posts match filter
    showNoPostsMessage() {
        this.postsContainer.innerHTML = `
            <div class="no-posts-message">
                <p>No posts found in this category. Try selecting a different filter.</p>
            </div>
        `;
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
