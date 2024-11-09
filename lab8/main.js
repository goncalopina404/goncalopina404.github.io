    function showMessage() {
        const messageElement = document.getElementById('hoverMessage');
        messageElement.textContent = 'Obrigado por passares!';
     }

    function resetMessage() {
        const messageElement = document.getElementById('hoverMessage');
        messageElement.textContent = '1. Passa por aqui!';
    }

        function changeTextColor(color) {
            document.getElementById('changeColorText').style.color = color;
        }

        document.querySelectorAll("#color button").forEach((e) => {
            e.addEventListener("click", () => {
               const color = e.dataset.color; 
               document.getElementById("title").style.color = color;  
            });
         });

        function changeInputColor(input) {
            const colors = ['red', 'green', 'blue', 'purple', 'orange'];
            input.style.color = colors[Math.floor(Math.random() * colors.length)];
        }

        function changeBackgroundColor() {
            const colorInput = document.getElementById('colorInput').value;
            document.body.style.backgroundColor = colorInput;
        }

        if (!localStorage.getItem('counter')) {
            localStorage.setItem('counter', 0);  
        }

        function Count() {
            let counter = parseInt(localStorage.getItem('counter'));  // Converte o valor para número
            counter++;  
            document.querySelector('h1').textContent = counter;
            localStorage.setItem('counter', counter);
        }

        window.onload = () => {
            document.querySelector('h1').textContent = localStorage.getItem('counter');
        };


        
        document.querySelector('select').onchange = function() {
            document.querySelector('body').style.backgroundColor = this.value;  
            document.getElementById('selectedColor').textContent = `Cor selecionada: ${this.value}`;  
        }
        
        
   
         function submitColor() {
            const colorSelect = document.getElementById('colorSelect');
            const color = colorSelect.value;
            document.getElementById('selectedColor').textContent = `Cor escolhida: ${color}`;
         }
   
         document.querySelector('form').onsubmit = (e) => {
            e.preventDefault();  
            
            const name = document.getElementById('nameInput').value;
            const age = document.getElementById('ageInput').value;
        
            document.getElementById('greeting').textContent = `Olá, o ${name} tem ${age}!`;
        };
        
        /// Arrow Function
         const startCounter = () => {
            let count = 0;
            setInterval(() => document.getElementById('counter').textContent = count++, 1000);
         };
         
         
         window.onload = startCounter;