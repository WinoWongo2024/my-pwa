// Mock data simulating a database
const mockDatabase = {
    users: [
        {
            username: "testUser",
            passwordHash: "f53bcb2d7cf4e4c6d7e856b6e5652d72e212eea26fcae5c4f890f4c7b8e5e2c6", // SHA-256 hash for 'password123'
            balance: 1000.0,
            transactions: []
        }
    ]
};

// Hashing function using SHA-256
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// Input validation function
function validateInput(username, password) {
    const usernamePattern = /^[a-zA-Z0-9_]{4,20}$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (!usernamePattern.test(username)) {
        alert("Username must be 4-20 characters long and contain only letters, numbers, or underscores.");
        return false;
    }
    
    if (!passwordPattern.test(password)) {
        alert("Password must be at least 8 characters long, contain a mix of uppercase, lowercase, numbers, and special characters.");
        return false;
    }
    
    return true;
}

// Signup functionality with hashed password
document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    // Validate input
    if (!validateInput(username, password)) return;
    
    // Check if user exists
    const userExists = mockDatabase.users.some(user => user.username === username);
    if (userExists) {
        alert("Username already exists. Please choose a different username.");
        return;
    }

    // Hash the password and save the user
    const passwordHash = await hashPassword(password);
    mockDatabase.users.push({
        username,
        passwordHash,
        balance: 0,
        transactions: []
    });
    alert("Signup successful! You can now log in.");
    window.location.href = "login.html";
});

// Login functionality with hashed password check
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    // Validate input
    if (!validateInput(username, password)) return;

    // Hash the entered password and find the user
    const passwordHash = await hashPassword(password);
    const user = mockDatabase.users.find(user => user.username === username && user.passwordHash === passwordHash);
    
    if (user) {
        // Create session and store in sessionStorage
        const sessionToken = Math.random().toString(36).substr(2);
        sessionStorage.setItem("sessionToken", sessionToken);
        sessionStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid username or password.");
    }
});

// Logout functionality
function logout() {
    sessionStorage.removeItem("sessionToken");
    sessionStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

// Check for an active session on page load (used in dashboard)
function checkSession() {
    if (!sessionStorage.getItem("sessionToken") || !sessionStorage.getItem("currentUser")) {
        alert("Session expired. Please log in again.");
        window.location.href = "login.html";
    }
}
