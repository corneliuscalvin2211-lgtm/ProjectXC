document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("payment-form");

    const options = document.querySelectorAll(
        'input[name="payment"]'
    );

    const bankFields = document.getElementById("bank-fields");
    const cardFields = document.getElementById("card-fields");
    const bankSelect = document.getElementById("bank");
    const message = document.getElementById("payment-message");

    if (!form || options.length === 0) {
        console.error("Payment form or radio buttons not found.");
        return;
    }

    function updateFields() {
        const selected = document.querySelector(
            'input[name="payment"]:checked'
        );

        const choice = selected ? selected.value : "";

        bankFields.hidden = choice !== "transfer";
        cardFields.hidden = choice !== "card";

        bankSelect.required = choice === "transfer";

        message.textContent = "";
    }

    options.forEach(function (option) {
        option.addEventListener("change", updateFields);
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const selected = document.querySelector(
            'input[name="payment"]:checked'
        );

        if (!selected) {
            message.textContent = "Please select a payment method.";
            return;
        }

        if (
            selected.value === "transfer" &&
            bankSelect.value === ""
        ) {
            message.textContent = "Please select your bank.";
            bankSelect.focus();
            return;
        }

        let method = selected.value;

        if (method === "transfer") {
            method = "Bank Transfer - " +
                bankSelect.options[bankSelect.selectedIndex].text;
        } else if (method === "card") {
            method = "Debit/Credit Card (Test Mode)";
        } else if (method === "cash") {
            method = "Cash on Delivery";
        }

        try {
            sessionStorage.setItem("paymentMethod", method);
        } catch (error) {
            console.warn("Session storage is unavailable.");
        }

        message.textContent = "Payment option accepted.";

        window.location.href = "confirmation.html";
    });

    updateFields();
});