document.addEventListener("DOMContentLoaded", function () {
    const settingsButton = document.createElement("button");
    settingsButton.innerText = "Settings";
    settingsButton.addEventListener("click", toggleSettingsPanel);
    document.body.appendChild(settingsButton);

    function toggleSettingsPanel() {
        const settingsPanel = document.getElementById("settings-panel");
        settingsPanel.style.right = settingsPanel.style.right === "0px" ? "-300px" : "0";
    }

    // Handle form submission
    const userDetailsForm = document.getElementById("user-details-form");
    userDetailsForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission for now
        saveUserDetails();
    });

    function saveUserDetails() {
        const name = document.getElementById("name").value;
        const address = document.getElementById("address").value;

        // You can now use the 'name' and 'address' variables as needed
        console.log("Name:", name);
        console.log("Address:", address);

        // Add logic to save the user details (e.g., send to server, store in localStorage, etc.)
    }
});
