function calculate() {
    const input = document.getElementById('numbers').value;
    const numbers = input.split(',').map(num => parseFloat(num.trim())).filter(num => !isNaN(num));
    
    if (numbers.length === 0) {
        document.getElementById('result').innerText = "Por favor, insira números válidos.";
        return;
    }

    const operation = document.getElementById('operation').value;
    let result;

    switch (operation) {
        case 'mean':
            result = `Média: ${calculateMean(numbers).toFixed(2)}`;
            break;
        case 'mode':
            const modeResult = calculateMode(numbers);
            result = modeResult.length > 0 ? `Moda: ${modeResult.join(', ')}` : "Não há uma moda.";
            break;
        case 'median':
            result = `Mediana: ${calculateMedian(numbers).toFixed(2)}`;
            break;
    }

    document.getElementById('result').innerText = result;
}

function calculateMean(numbers) {
    const total = numbers.reduce((acc, num) => acc + num, 0);
    return total / numbers.length;
}

function calculateMode(numbers) {
    const frequency = {};
    numbers.forEach(num => {
        frequency[num] = (frequency[num] || 0) + 1;
    });

    const maxFrequency = Math.max(...Object.values(frequency));
    const modes = Object.keys(frequency).filter(num => frequency[num] === maxFrequency).map(Number);

    return modes.length === numbers.length ? [] : modes; // Retorna vazio se todos os números aparecerem com a mesma frequência
}

function calculateMedian(numbers) {
    numbers.sort((a, b) => a - b);
    const mid = Math.floor(numbers.length / 2);
    return numbers.length % 2 === 0 ? (numbers[mid - 1] + numbers[mid]) / 2 : numbers[mid];
}
