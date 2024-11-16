// Replace 'YOUR_API_KEY' with your actual API key from NewsAPI
const API_KEY = 'YOUR_API_KEY';
const NEWS_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

const loginStatus = document.getElementById('loginStatus');
const content = document.getElementById('content');
const newsContainer = document.getElementById('news-container');
const errorContainer = document.getElementById('error');

// Simulate login process
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'password') {
        loginStatus.textContent = 'Login successful!';
        loginStatus.style.color = 'green';
        document.getElementById('login').style.display = 'none';
        content.style.display = 'block';
        fetchNews();
    } else {
        loginStatus.textContent = 'Invalid credentials. Try again.';
        loginStatus.style.color = 'red';
    }
}

// Fetch and display news
const API_URL = 'http://localhost:5002/api/news';

// Fetch and display news
async function fetchNews() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.status === 'success') {
            displayNews(data.articles);
        } else {
            throw new Error('Error fetching news from API');
        }
    } catch (error) {
        console.error("Error fetching news:", error);
        showError();
    }
}

// Display news articles
function displayNews(articles) {
    if (articles.length === 0) {
        newsContainer.innerHTML = "<p>No news articles found.</p>";
        return;
    }

    articles.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';

        newsItem.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description || "No description available."}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;

        newsContainer.appendChild(newsItem);
    });
}

// Show error message
function showError() {
    errorContainer.classList.remove('hidden');
}
