// Declare the object to store user savings goals only once
let savingsGoals = {};  // This should only be declared once in your script

// Function to create a new savings goal
function createSavingsGoal(userID, targetAmount, targetDate) {
    savingsGoals[userID] = {
        targetAmount: targetAmount,
        targetDate: new Date(targetDate), // Convert to Date format
        amountSaved: 0
    };
    console.log(`Savings goal set for User ${userID}: $${targetAmount} by ${targetDate}`);
}

// Function to update savings progress
function updateSavingsProgress(userID, amountSaved) {
    if (savingsGoals[userID]) {
        savingsGoals[userID].amountSaved += amountSaved;
        console.log(`User ${userID} saved $${amountSaved}. Total saved: $${savingsGoals[userID].amountSaved}`);
    } else {
        console.log(`No savings goal found for User ${userID}.`);
    }
}

// Function to check goal status
function checkGoalStatus(userID) {
    if (!savingsGoals[userID]) {
        console.log(`No savings goal found for User ${userID}.`);
        return;
    }

    let goal = savingsGoals[userID];
    let today = new Date();
    let timeLeft = (goal.targetDate - today) / (1000 * 60 * 60 * 24); // Convert milliseconds to days

    if (goal.amountSaved >= goal.targetAmount) {
        console.log(`User ${userID} has met their savings goal! 🎉`);
    } else if (timeLeft <= 7) { // If less than a week remains
        console.log(`Warning: User ${userID} is approaching the deadline and has not met the savings goal.`);
    } else {
        console.log(`User ${userID} has saved $${goal.amountSaved} out of $${goal.targetAmount}. Keep going!`);
    }
}

// Function to send notification if the deadline is approaching
function sendNotification(userID) {
    if (!savingsGoals[userID]) {
        console.log(`No savings goal found for User ${userID}.`);
        return;
    }

    let goal = savingsGoals[userID];
    let today = new Date();
    let timeLeft = (goal.targetDate - today) / (1000 * 60 * 60 * 24); // Convert milliseconds to days

    if (timeLeft <= 7 && goal.amountSaved < goal.targetAmount) {
        console.log(`🔔 Reminder: User ${userID}, your savings goal deadline is approaching!`);
    }
}

// Event listener for form submission
document.getElementById('goalForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values from form
    let userID = document.getElementById('userID').value;
    let targetAmount = parseFloat(document.getElementById('targetAmount').value);
    let targetDate = document.getElementById('targetDate').value;

    // Call function to create savings goal
    createSavingsGoal(userID, targetAmount, targetDate);
});
