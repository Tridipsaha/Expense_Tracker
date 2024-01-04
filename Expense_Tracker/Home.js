// Assuming balance is a global variable
let balance = 0;

// Assuming expenses is a global array to store expense data
let expenses = [];

// Function to render/update the pie chart
function updatePieChart() {
    const ctx = document.getElementById('expenseChart').getContext('2d');

    // Extract labels and data from expenses
    const labels = expenses.map(expense => expense.name);
    const data = expenses.map(expense => expense.amount);

    // Clear existing chart if it exists
    if (window.myPieChart) {
        window.myPieChart.destroy();
    }

    // Create a new pie chart
    window.myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'], // Customize colors as needed
            }],
        },
    });
}

function addExpense() {
    // Get the expense name and amount from the input fields
    const expenseName = document.getElementById('expenseName').value;
    const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);

    // Validate the input
    if (!expenseName || isNaN(expenseAmount)) {
        alert('Please enter valid expense details.');
        return;
    }

    // Update the expense list
    const expenseList = document.getElementById('expenseList');
    const newExpenseItem = document.createElement('li');
    newExpenseItem.innerHTML = `
        ${expenseName}: $${expenseAmount.toFixed(2)}
        <button onclick="editExpense('${expenseName}')">Edit</button>
    `;
    expenseList.appendChild(newExpenseItem);

    expenses.push({ name: expenseName, amount: expenseAmount });

    // Update the pie chart
    updatePieChart();

    // Update the balance
    updateBalance(expenseAmount);
}

function updateBalance(amount) {
    // Update the global balance variable
    balance -= amount;

    // Display the updated balance
    const balanceSpan = document.getElementById('balance');
    balanceSpan.textContent = balance.toFixed(2);
}

function updateLiveBalance() {
    // Update the global balance variable as the input value changes
    const inputBalance = parseFloat(document.getElementById('updateBalance').value);

    if (!isNaN(inputBalance)) {
        balance = inputBalance;

        // Display the updated balance
        const balanceSpan = document.getElementById('balance');
        balanceSpan.textContent = balance.toFixed(2);
    }
}

function updateBalanceFromInput() {
    // Update the global balance variable directly from the input value
    const inputBalance = parseFloat(document.getElementById('updateBalance').value);

    if (!isNaN(inputBalance)) {
        balance = inputBalance;

        // Display the updated balance
        const balanceSpan = document.getElementById('balance');
        balanceSpan.textContent = balance.toFixed(2);
    }
}

function editExpense(name, oldAmount) {
    // Implement the edit logic here
    const newName = prompt('Enter new expense name:');
    const newAmount = parseFloat(prompt('Enter new expense amount:'));

    if (newName && !isNaN(newAmount)) {
        // Create a new list item with the updated values
        const editedItem = document.createElement('li');
        editedItem.innerHTML = `
            ${newName}: $${newAmount.toFixed(2)}
            <button onclick="editExpense('${newName}', ${newAmount})">Edit</button>
        `;

        // Find the existing list item to be replaced
        const existingItem = document.querySelector(`#expenseList li:contains('${name}')`);

        // Replace the existing item with the edited one
        existingItem.replaceWith(editedItem);

        // Update or replace the expense in the expenses array
        const index = expenses.findIndex(expense => expense.name === name);
        expenses[index] = { name: newName, amount: newAmount };

        // Update the pie chart
        updatePieChart();

        // Update the balance
        updateBalance(newAmount - oldAmount);
    } else {
        alert('Invalid input. Edit canceled.');
    }
}

// Custom function to find an element containing specific text
// Used in the editExpense function
function containsText(element, text) {
    return element.innerText.includes(text);
}
