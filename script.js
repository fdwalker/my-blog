// Blog post loader - dynamically loads posts from JSON
class BlogLoader {
    constructor() {
        this.postsContainer = document.getElementById('posts-container');
        this.filterContainer = document.querySelector('.filter-buttons');
        this.posts = [];
        this.allCategories = new Set();
        this.currentFilter = 'all';
    }

    // Load posts from inline data (for better compatibility with static hosting)
    async loadPosts() {
        try {
            // Inline posts data to avoid CORS issues on live servers
            this.posts = [
                {
                    "id": 1,
                    "title": "Getting Started with Web Development",
                    "date": "December 15, 2024",
                    "preview": "Learn the basics of HTML, CSS, and JavaScript to start your web development journey. This post covers essential concepts every beginner should know.",
                    "url": "posts/post1.html",
                    "categories": ["Beginner", "Fundamentals"]
                },
                {
                    "id": 2,
                    "title": "Best Practices for Clean Code",
                    "date": "December 10, 2024",
                    "preview": "Explore techniques and principles for writing maintainable and readable code. Discover how clean code practices improve collaboration and productivity.",
                    "url": "posts/post2.html",
                    "categories": ["Best Practices", "Development"]
                },
                {
                    "id": 3,
                    "title": "Understanding Responsive Design",
                    "date": "December 5, 2024",
                    "preview": "Master the art of creating websites that look great on all devices. Learn about media queries, flexible layouts, and mobile-first design principles.",
                    "url": "posts/post3.html",
                    "categories": ["CSS", "Responsive"]
                },
                {
                    "id": 4,
                    "title": "The Power of CSS Grid and Flexbox",
                    "date": "November 28, 2024",
                    "preview": "Dive deep into modern CSS layout techniques. Compare CSS Grid and Flexbox, understand when to use each, and see practical examples for creating complex layouts.",
                    "url": "posts/post4.html",
                    "categories": ["CSS", "Layout"]
                },
                {
                    "id": 5,
                    "title": "JavaScript ES6+ Features You Should Know",
                    "date": "November 20, 2024",
                    "preview": "Explore the most important ES6+ features that every modern JavaScript developer should master. From arrow functions to async/await, learn how these features improve code quality.",
                    "url": "posts/post5.html",
                    "categories": ["JavaScript", "ES6"]
                },
                {
                    "id": 6,
                    "title": "Building Accessible Web Applications",
                    "date": "November 15, 2024",
                    "preview": "Learn the fundamentals of web accessibility and how to create inclusive web experiences. Discover ARIA attributes, semantic HTML, and testing tools for accessibility compliance.",
                    "url": "posts/post6.html",
                    "categories": ["Accessibility", "Best Practices"]
                }
            ];

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
