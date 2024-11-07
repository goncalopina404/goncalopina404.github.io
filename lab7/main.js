        function showMessage() {
            const messageElement = document.getElementById('hoverMessage');
            messageElement.textContent = 'Obrigado por passares!';       
         }

        function changeTextColor(color) {
            document.getElementById('changeColorText').style.color = color;
        }

        function changeInputColor(input) {
            const colors = ['red', 'green', 'blue', 'purple', 'orange'];
            input.style.color = colors[Math.floor(Math.random() * colors.length)];
        }

        function changeBackgroundColor() {
            const colorInput = document.getElementById('colorInput').value;
            document.body.style.backgroundColor = colorInput;
        }

        function showCount() {
            const countDisplay = document.getElementById('countDisplay');
            let count = parseInt(countDisplay.textContent);
            countDisplay.textContent = ++count;
        }
