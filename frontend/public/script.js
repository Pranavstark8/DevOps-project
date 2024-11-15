async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginStatus = document.getElementById('loginStatus');
    try {
        const response = await fetch('http://localhost:5001/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (data.success) {
            console.log("ok")
            loginStatus.innerText = 'Login successful!';
            loginStatus.style.color = 'green';
            document.getElementById('login').style.display = 'none';
            document.getElementById('content').style.display = 'block';
            loadServices();
        } else {
            loginStatus.innerText = 'Login failed. Please try again.';
            loginStatus.style.color = 'red';
        }
    } catch (error) {
        console.error('Error logging in:', error);
        loginStatus.innerText = 'An error occurred. Please try again later.';
    }
}

async function loadServices() {
    const servicesDiv = document.getElementById('services');
    servicesDiv.innerHTML = '';

    try {
        const response = await fetch('http://localhost:5002/api/services');
        const data = await response.json();
        data.services.forEach(service => {
            servicesDiv.innerHTML += `<p>${service.name} - <a href="${service.url}">${service.url}</a></p>`;
        });
    } catch (error) {
        console.error('Error fetching services:', error);
        servicesDiv.innerHTML = '<p>An error occurred while fetching services.</p>';
    }
}
