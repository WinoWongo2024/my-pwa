document.addEventListener("DOMContentLoaded", () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    if (!currentUser) {
        alert("Please log in.");
        window.location.href = "login.html";
        return;
    }
    
    document.getElementById("balance").textContent = currentUser.balance.toFixed(2);
    
    const transactionList = document.getElementById("transaction-list");
    currentUser.transactions.forEach(transaction => {
        const listItem = document.createElement("li");
        listItem.textContent = `${transaction.date}: ${transaction.type} - $${transaction.amount}`;
        transactionList.appendChild(listItem);
    });
});
