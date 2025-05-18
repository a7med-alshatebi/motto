const backendUrl = 'http://localhost:3000/instagram'; // or http://localhost:3000/instagram for local

async function fetchInstagramPosts() {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = 'Loading...';
    try {
        const response = await fetch(backendUrl);
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data = await response.json();
        if (!data.data || data.data.length === 0) {
            postsContainer.innerHTML = 'No posts found.';
            return;
        }
        postsContainer.innerHTML = data.data.map(post => `
            <a href="${post.permalink}" target="_blank">
                <img src="${post.media_url}" alt="Instagram Post" style="width:200px;height:200px;object-fit:cover;margin:10px;">
            </a>
        `).join('');
    } catch (error) {
        postsContainer.innerHTML = `Error: ${error.message}`;
    }
}

document.addEventListener('DOMContentLoaded', fetchInstagramPosts);
