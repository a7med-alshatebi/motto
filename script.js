/*const backendUrl = 'http://localhost:3000/instagram'; // or http://localhost:3000/instagram for local

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
*/

const backendUrl = 'http://localhost:3000/instagram';

    async function fetchInstagramPosts() {
        const postsContainer = document.getElementById('posts');
        const loading = document.getElementById('loading');
        const error = document.getElementById('error');

        try {
            // Show loading state
            postsContainer.innerHTML = '';
            loading.classList.remove('hidden');
            error.classList.add('hidden');

            const response = await fetch(backendUrl);
            if (!response.ok) throw new Error('Failed to fetch posts');
            
            const data = await response.json();
            
            if (!data.data || data.data.length === 0) {
                throw new Error('No posts found');
            }

            postsContainer.innerHTML = data.data.map(post => `
                <a href="${post.permalink}" target="_blank" rel="noopener noreferrer" 
                   class="block group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    ${post.media_type === 'VIDEO' ? `
                        <div class="absolute inset-0 flex items-center justify-center z-10">
                            <svg class="w-12 h-12 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                            </svg>
                        </div>
                        <video class="w-full aspect-square object-cover">
                            <source src="${post.media_url}" type="video/mp4">
                        </video>` : 
                        `<img src="${post.media_url}" 
                             alt="${post.caption || 'Instagram post'}"
                             class="w-full aspect-square object-cover">`}
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex items-end opacity-0 group-hover:opacity-100 transition-opacity">
                        <p class="text-white text-sm line-clamp-2">${post.caption || ''}</p>
                    </div>
                </a>
            `).join('');

            loading.classList.add('hidden');

        } catch (error) {
            console.error('Error:', error);
            loading.classList.add('hidden');
            postsContainer.innerHTML = '';
            error.querySelector('p').textContent = error.message;
            error.classList.remove('hidden');
        }
    }

    document.addEventListener('DOMContentLoaded', fetchInstagramPosts);
