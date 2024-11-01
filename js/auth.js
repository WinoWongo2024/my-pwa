const mockDatabase = {
    users: [
        { username: "testUser", password: "password123", balance: 1000.0, transactions: [] }
    ]
};

// Signup functionality
document.getElementById("signupForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    const userExists = mockDatabase.users.some(user => user.username === username);
    if (userExists) {
        alert("User already exists!");
    } else {
        mockDatabase.users.push({ username, password, balance: 0, transactions: [] });
        alert("Signup successful! You can now log in.");
        window.location.href = "login.html";
    }
});

// Login functionality
document.getElementById("loginForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    const user = mockDatabase.users.find(user => user.username === username && user.password === password);
    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid username or password.");
    }
});
