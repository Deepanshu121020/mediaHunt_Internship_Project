document.addEventListener("DOMContentLoaded", function() {
    const startDateInput = document.getElementById("start-date");
    const endDateInput = document.getElementById("end-date");
    const excludedDatesInput = document.getElementById("excluded-dates");
    const monthOutput = document.getElementById("month");
    const yearOutput = document.getElementById("year");
    const numDaysOutput = document.getElementById("num-days");
    const leadCountInput = document.getElementById("lead-count");
    const expectedLeadCountOutput = document.getElementById("expected-lead-count");
    const saveButton = document.getElementById("save-button");

    startDateInput.addEventListener("change", updateDateOutputs);
    endDateInput.addEventListener("change", updateDateOutputs);
    excludedDatesInput.addEventListener("input", updateDateOutputs);
    leadCountInput.addEventListener("input", updateExpectedLeadCount);

    function updateDateOutputs() {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);
        const excludedDates = excludedDatesInput.value.split(",").map(date => date.trim());

        // Validate start and end date
        if (startDate > endDate) {
            alert("End date cannot be before start date!");
            return;
        }

        // Filter excluded dates within the range
        const filteredExcludedDates = excludedDates.filter(date => {
            const excludedDate = new Date(date);
            return excludedDate >= startDate && excludedDate <= endDate;
        });

        // Compute and display outputs
        const numDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1 - filteredExcludedDates.length;
        monthOutput.textContent = startDate.toLocaleString('default', { month: 'long' });
        yearOutput.textContent = startDate.getFullYear();
        numDaysOutput.textContent = numDays;

        updateExpectedLeadCount();
    }

    function updateExpectedLeadCount() {
        const numDays = parseInt(numDaysOutput.textContent);
        const leadCount = parseInt(leadCountInput.value);
        if (!isNaN(numDays) && !isNaN(leadCount)) {
            const expectedLeadCount = leadCount * numDays;
            expectedLeadCountOutput.textContent = expectedLeadCount;
        }
    }

    saveButton.addEventListener("click", function() {
        
        alert("Data saved successfully!");
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const saveButton = document.getElementById("save-button");
    const startDateInput = document.getElementById("start-date");
    const endDateInput = document.getElementById("end-date");
    const excludedDatesInput = document.getElementById("excluded-dates");
    const numDaysOutput = document.getElementById("num-days");
    const leadCountInput = document.getElementById("lead-count");
    const expectedLeadCountOutput = document.getElementById("expected-lead-count");

    const dataTableBody = document.querySelector("#data-table tbody");

    saveButton.addEventListener("click", function() {
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;
        const excludedDates = excludedDatesInput.value;
        const numDays = numDaysOutput.textContent;
        const leadCount = leadCountInput.value;
        const expectedLeadCount = expectedLeadCountOutput.textContent;

        // Create a new table row with the entered data
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${startDate}</td>
            <td>${endDate}</td>
            <td>${excludedDates}</td>
            <td>${numDays}</td>
            <td>${leadCount}</td>
            <td>${expectedLeadCount}</td>
        `;

        // Append the new row to the table
        dataTableBody.appendChild(newRow);

        // Clear input fields after saving data
        startDateInput.value = "";
        endDateInput.value = "";
        excludedDatesInput.value = "";
        numDaysOutput.textContent = "";
        leadCountInput.value = "";
        expectedLeadCountOutput.textContent = "";
    });
});
