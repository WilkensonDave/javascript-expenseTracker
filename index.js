document.addEventListener("DOMContentLoaded", (event) =>{

    const expenseForm = document.getElementById("expense-form");
    const ExpensesFilter = document.getElementById("filter-category")
    const tableBody = document.getElementById("expense-list");
    const totalExpense = document.getElementById("total-expense");

    let allExpenses = [];
    expenseForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        const name = document.getElementById("expense-name").value;
        const amount = Number(document.getElementById("expense-amount").value);
        const category = document.getElementById("expense-category").value;
        const date = document.getElementById("expense-date").value;

        let expense = {
            id:Date.now(),
            name,
            amount,
            category,
            date
        };

        allExpenses.push(expense);
        displayExpenses(allExpenses);
        calculateTotal(allExpenses);
        expenseForm.reset();
    });


    const displayExpenses = function(expenses){
            tableBody.innerHTML = "";
            expenses.forEach((expense) =>{
                const tableRow = document.createElement("tr");
                tableRow.innerHTML = `
                <td>${expense.name}</td>
                <td>${expense.amount.toFixed(2)}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
                <td>
                    <button class="edit--btn" data-id="${expense.id}">Edit</button>
                    <button class="delete--btn" data-id="${expense.id}">Delete</button>
                </td>
                `;
                tableBody.appendChild(tableRow);
            });
    };

    const calculateTotal = function(expenses){
        const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
        totalExpense.textContent = total.toFixed(2);
    };

    function updateExpenses(){
        tableBody.addEventListener("click", (e)=>{
            const id = parseInt(e.target.dataset.id);
            const expense = allExpenses.find(expense => expense.id === id);
            
            if(e.target.classList.contains("edit--btn")){
                document.getElementById("expense-name").value = expense.name;
                document.getElementById("expense-amount").value = expense.amount;
                document.getElementById("expense-category").value = expense.category;
                document.getElementById("expense-date").value = expense.date;

                allExpenses = allExpenses.filter(expense => expense.id !== id);
                displayExpenses(allExpenses);
                calculateTotal(allExpenses);
            };

            if(e.target.classList.contains("delete--btn")){
                allExpenses = allExpenses.filter(expense => expense.id !== id);
                displayExpenses(allExpenses);
                calculateTotal(allExpenses);
            };
        });
    };

    updateExpenses();

    function filterExpenseByCategory(){
        ExpensesFilter.addEventListener("change", (e)=>{
            const category = ExpensesFilter.value;
            const filteredItems = allExpenses.filter(expense => expense.category === category);
            if(category === "All"){
                displayExpenses(allExpenses);
                calculateTotal(allExpenses);
            }else{
                displayExpenses(filteredItems);
                calculateTotal(filteredItems);
            };
            
        });
    };

    filterExpenseByCategory();
});


