// Mock data for demonstration purposes
const mockUserData = {
    username: "testUser",
    balance: 0.20,
    spending: 0.00,
    budgetLeft: -3.00,
    accountNumber: "04-00-03 • 48507921",
    transactions: [
        { title: "Max plan", date: "Tomorrow", amount: 17.00, declined: false },
        { title: "Apple", note: "Declined, you didn't have £0.99", declined: true },
        { title: "Max plan", note: "You didn't have £17.", declined: true },
        { title: "Madforit", note: "Declined, you didn't have £23.75", declined: true }
    ]
};

// Load user data, either from localStorage or fallback to mock data
const loadUserData = () => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    return savedUser || mockUserData;
};

// Display user data on the dashboard
const displayUserData = (user) => {
    // Display balance, spending, and budget left
    document.querySelector('.card.balance .amount').textContent = `£${user.balance.toFixed(2)}`;
    document.querySelector('.card.spending .amount').textContent = `£${user.spending.toFixed(2)}`;
    document.querySelector('.card.budget .amount').textContent = `£${user.budgetLeft.toFixed(2)}`;
    
    // Display account details in bank card
    document.querySelector('.bank-card .bank-name').textContent = "GR Bank";
    document.querySelector('.bank-card .account-number').textContent = user.accountNumber;
    document.querySelector('.bank-card .card-balance').innerHTML = `£${user.balance.toFixed(2)} <span>Balance</span>`;

    // Display transactions
    const activityContainer = document.querySelector('.activity');
    const transactionList = activityContainer.querySelector('.activity-list') || document.createElement('div');
    transactionList.classList.add('activity-list');
    transactionList.innerHTML = ""; // Clear any previous content

    user.transactions.forEach(transaction => {
        const item = document.createElement('div');
        item.classList.add('activity-item');
        if (transaction.declined) {
            item.classList.add('declined');
        }

        // Transaction title and optional date or note
        const title = document.createElement('p');
        title.classList.add('activity-title');
        title.textContent = transaction.title;
        
        if (transaction.date) {
            const date = document.createElement('p');
            date.classList.add('activity-date');
            date.textContent = transaction.date;
            item.appendChild(title);
            item.appendChild(date);
        } else if (transaction.note) {
            const note = document.createElement('p');
            note.classList.add('activity-note');
            note.textContent = transaction.note;
            item.appendChild(title);
            item.appendChild(note);
        }

        // Optional amount if present
        if (transaction.amount !== undefined) {
            const amount = document.createElement('p');
            amount.classList.add('activity-amount');
            amount.textContent = `£${transaction.amount.toFixed(2)}`;
            item.appendChild(amount);
        }

        transactionList.appendChild(item);
    });

    // Add transaction list to activity section
    activityContainer.appendChild(transactionList);
};

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', () => {
    const userData = loadUserData();
    displayUserData(userData);
});
