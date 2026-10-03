
        const display = document.getElementById("display");

        let firstNumber = null;
        let operator = null;
        let waitingForSecondNumber = false;


        // Add number
        function addNumber(number) {

            if (display.value === "0" || waitingForSecondNumber) {
                display.value = number;
                waitingForSecondNumber = false;
            } else {
                display.value += number;
            }
        }


        // Add decimal
        function addDecimal() {

            if (waitingForSecondNumber) {
                display.value = "0.";
                waitingForSecondNumber = false;
                return;
            }

            if (!display.value.includes(".")) {
                display.value += ".";
            }
        }


        // Select operator
        function chooseOperator(selectedOperator) {

            const currentNumber = parseFloat(display.value);

            if (operator && waitingForSecondNumber) {
                operator = selectedOperator;
                return;
            }

            if (firstNumber === null) {
                firstNumber = currentNumber;
            } else if (operator) {
                const result = performCalculation(
                    firstNumber,
                    currentNumber,
                    operator
                );

                display.value = result;
                firstNumber = result;
            }

            operator = selectedOperator;
            waitingForSecondNumber = true;
        }


        // Perform calculation
        function performCalculation(number1, number2, operator) {

            switch (operator) {

                case "+":
                    return number1 + number2;

                case "-":
                    return number1 - number2;

                case "×":
                    return number1 * number2;

                case "÷":
                    if (number2 === 0) {
                        alert("Cannot divide by zero");
                        return 0;
                    }

                    return number1 / number2;

                default:
                    return number2;
            }
        }


        // Equals
        function calculate() {

            if (operator === null || firstNumber === null) {
                return;
            }

            const secondNumber = parseFloat(display.value);

            const result = performCalculation(
                firstNumber,
                secondNumber,
                operator
            );

            display.value = result;

            firstNumber = null;
            operator = null;
            waitingForSecondNumber = true;
        }


        // Clear calculator
        function clearDisplay() {

            display.value = "0";
            firstNumber = null;
            operator = null;
            waitingForSecondNumber = false;
        }


        // Delete last number
        function deleteNumber() {

            if (display.value.length > 1) {
                display.value = display.value.slice(0, -1);
            } else {
                display.value = "0";
            }
        }


        // Keyboard support
        document.addEventListener("keydown", function(event) {

            const key = event.key;

            if (!isNaN(key)) {
                addNumber(key);
            }

            if (key === ".") {
                addDecimal();
            }

            if (key === "+") {
                chooseOperator("+");
            }

            if (key === "-") {
                chooseOperator("-");
            }

            if (key === "*") {
                chooseOperator("×");
            }

            if (key === "/") {
                event.preventDefault();
                chooseOperator("÷");
            }

            if (key === "Enter" || key === "=") {
                calculate();
            }

            if (key === "Backspace") {
                deleteNumber();
            }

            if (key === "Escape") {
                clearDisplay();
            }
        });