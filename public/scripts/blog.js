const blogGrid = document.getElementById('blog-grid');

async function loadBlogPosts() {
  try {
    const response = await fetch('/api/blog');
    const data = await response.json();
    renderBlogPosts(data?.posts || []);
  } catch (error) {
    console.error('Failed to load blog posts', error);
    blogGrid.innerHTML = '<p class="form-status">Unable to load blog posts. Please refresh.</p>';
  }
}

function renderBlogPosts(posts) {
  if (!posts.length) {
    blogGrid.innerHTML = '<p>No blog posts found. Check back soon.</p>';
    return;
  }

  blogGrid.innerHTML = posts
    .map(
      ({ id, title, excerpt, author, date, tags }) => `
        <a href="/blog-post?id=${id}" class="blog-card">
          <div class="blog-card__meta">
            <time>${date}</time>
            <span>${author}</span>
          </div>
          <h3>${title}</h3>
          <p class="blog-card__excerpt">${excerpt}</p>
          ${tags && tags.length ? `
            <div class="blog-card__tags">
              ${tags.map((tag) => `<span class="blog-card__tag">${tag}</span>`).join('')}
            </div>
          ` : ''}
        </a>
      `,
    )
    .join('');
}

loadBlogPosts();

