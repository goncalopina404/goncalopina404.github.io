const carContainer = document.getElementById('carContainer');
const carImage = document.getElementById('carImage');
const carInfo = document.getElementById('carInfo');
const changeColorBtn = document.getElementById('changeColorBtn');
const changeTextBtn = document.getElementById('changeTextBtn');
const carInput = document.getElementById('carInput');
const typedText = document.getElementById('typedText');
const carForm = document.getElementById('carForm');
const formResult = document.getElementById('formResult');
const carColorInput = document.getElementById('carColor');

carContainer.addEventListener('click', () => {
    carInfo.textContent = "Você clicou no carro!";
});

carContainer.addEventListener('dblclick', () => {
    carInfo.textContent = "Clique duplo no carro! Carro turbo ativado!";
});

carContainer.addEventListener('mouseover', () => {
    carInfo.textContent = "Este é um clássico JDM!";
    carInfo.style.color = "lime";
});

carContainer.addEventListener('mouseout', () => {
    carInfo.textContent = "Passe o mouse sobre o carro para mais detalhes";
    carInfo.style.color = "white";
});

carContainer.addEventListener('mousemove', (event) => {
    carInfo.textContent = `Movendo o mouse na posição (${event.clientX}, ${event.clientY})`;
});

carInput.addEventListener('keydown', (event) => {
    typedText.textContent = `Você pressionou: ${event.key}`;
});

carInput.addEventListener('keyup', (event) => {
    typedText.textContent = `Última tecla solta: ${event.key}`;
});

carForm.addEventListener('change', () => {
    formResult.textContent = `Cor selecionada: ${carColorInput.value}`;
});

carForm.addEventListener('submit', (event) => {
    event.preventDefault(); 
    formResult.textContent = `Carro registrado com a cor: ${carColorInput.value}`;
    formResult.style.color = carColorInput.value.toLowerCase();
});

changeColorBtn.addEventListener('click', () => {
    document.body.style.backgroundColor = 
        document.body.style.backgroundColor === 'black' ? 'grey' : 'black';
});

changeTextBtn.addEventListener('click', () => {
    carInfo.innerHTML = `<strong>Este é um carro JDM incrível!</strong>`;
});
