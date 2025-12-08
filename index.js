"use strict"

document.addEventListener("DOMContentLoaded", (e)=>{
    
    const expenseContainer = document.getElementById("expense-list");
    const totalExpend = document.getElementById("total-expense");
    const filterCategory = document.getElementById("filter-category");
    const btnAddExpense = document.getElementById("btn");
    const selectCategory = document.getElementById("expense-category");
    const expenseForm = document.getElementById("expense-form");

    let allExpenses = JSON.parse(localStorage.getItem("expenses")) || [];

    function saveData(allExpenses){
        localStorage.setItem("expenses", JSON.stringify(allExpenses));
    }


    function displayExpenses(allExpenses){
        expenseContainer.innerHTML = "";
        allExpenses.forEach((expense) =>{
            const tableRow = document.createElement("tr");
            tableRow.innerHTML =`
            <td>${expense.expenseName}</td>
            <td>${expense.expenseAmount}</td>
            <td>${expense.expenseCategory}</td>
            <td>${expense.expenseDate}</td>
            <td>
            <button class="edit--btn" data-id="${expense.id}">Edit</button>
            <button class="delete--btn" data-id="${expense.id}">Delete</button>
            </td>
            `;
            expenseContainer.appendChild(tableRow);
        });
    }

    function calculateTotalExpense(allExpenses){
            const total = allExpenses.reduce((
            acc, expense) => acc + expense.expenseAmount, 0);
            totalExpend.textContent = total.toFixed(2);
    }

    displayExpenses(allExpenses);
    calculateTotalExpense(allExpenses);

    expenseForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const expenseName = document.getElementById("expense-name").value;
    const expenseAmount = parseInt(document.getElementById("expense-amount").value);
    const expenseCategory = document.getElementById("expense-category").value;
    const expenseDate = document.getElementById("expense-date").value;

    let expense ={
        id:Date.now(),
        expenseName,
        expenseAmount,
        expenseCategory,
        expenseDate
    }

    allExpenses.push(expense);
    displayExpenses(allExpenses);
    calculateTotalExpense(allExpenses);
    filteredExpenseByCategory(allExpenses);
    saveData(allExpenses);
    expenseForm.reset();
    });
    
    expenseContainer.addEventListener("click", (e)=>{
        e.preventDefault();
        const id = Number(e.target.dataset.id);
        const expense = allExpenses.find(expense => expense.id === id);
        if(e.target.classList.contains("delete--btn")){
            allExpenses = allExpenses.filter(
            expense => expense.id !== id);
            saveData(allExpenses);
            displayExpenses(allExpenses);
            calculateTotalExpense(allExpenses);
        }

        if (e.target.classList.contains("edit--btn")){
            document.getElementById("expense-name").value = expense.expenseName;
            document.getElementById("expense-amount").value = expense.expenseAmount;
            document.getElementById("expense-category").value = expense.expenseCategory;
            document.getElementById("expense-date").value = expense.expenseDate;

            allExpenses = allExpenses.filter((expense) => expense.id !== id);
            saveData(allExpenses);
            displayExpenses(allExpenses);
            calculateTotalExpense(allExpenses);
            
        }
    });
        
    function filteredExpenseByCategory(allExpenses){
        filterCategory.addEventListener("change", (e)=>{
            const category = document.getElementById("filter-category").value;
            if(category === "All"){
                displayExpenses(allExpenses);
                calculateTotalExpense(allExpenses);
            }else{
                const expenseCategory = allExpenses.filter(
                (expense) => expense.expenseCategory === category);
                displayExpenses(expenseCategory);
                calculateTotalExpense(expenseCategory);
            }
        });
    }
});


