    // Получение и отображение постов
    function fetchPosts() {
        fetch('https://dummyjson.com/posts')
            .then(response => response.json())
            .then(data => {
                const postsContainer = document.getElementById('posts-container');
                data.posts.forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.classList.add('post');
                    postElement.innerHTML = `
                        <h3>${post.title}</h3>
                        <p>${post.body}</p>
                    `;
                    postElement.addEventListener('click', () => fetchComments(post.id, postElement));
                    postsContainer.appendChild(postElement);
                });
            })
            .catch(error => console.error('Error fetching posts:', error));
    }

    // Получение и отображение комментариев к конкретному посту
    function fetchComments(postId, postElement) {
        fetch(`https://dummyjson.com/posts/${postId}/comments`)
            .then(response => response.json())
            .then(data => {
                const commentsContainer = document.createElement('div');
                commentsContainer.classList.add('comments');
                commentsContainer.innerHTML = '<h4>Comments:</h4>';
                data.comments.forEach(comment => {
                    const commentElement = document.createElement('div');
                    commentElement.classList.add('comment');
                    commentElement.innerText = comment.body;
                    commentsContainer.appendChild(commentElement);
                });
                // Если комментарии уже отображены, убираем их
                if (postElement.querySelector('.comments')) {
                    postElement.querySelector('.comments').remove();
                }
                postElement.appendChild(commentsContainer);
            })
            .catch(error => console.error('Error fetching comments:', error));
    }

    // Запуск получения постов при загрузке страницы
    document.addEventListener('DOMContentLoaded', fetchPosts);