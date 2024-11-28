function Solve(val) {
   var v = document.getElementById('res');
   let currentValue = v.value;
   const operators = '+-*/.%';
   const minus = '-';

   if (currentValue === '') {
      if (val === minus || !operators.includes(val)) {
         v.value += val;
      }
      return;
   }

   const lastChar = currentValue.slice(-1);
   const secondLastChar = currentValue.slice(-2, -1);

   if (!operators.includes(val)) {
      v.value += val;
      return;
   }

   if (operators.includes(lastChar)) {

      if (
         val === minus &&
         !operators.includes(secondLastChar) &&
         lastChar !== minus
      ) {
         v.value += val;
      }
      return;
   }

   v.value += val;
}

function Result() {
   var display = document.getElementById('res');
   var expression = display.value;

   try {
      const processedExpression = expression.replace(/(\d+(\.\d+)?)%/g, '($1 / 100)');

      var result = eval(processedExpression);

      display.value = result;

      SaveToHistory(expression, result);
   } catch (error) {
      display.value = 'Error';
   }
}



function Clear() {
   var inp = document.getElementById('res');
   inp.value = '';
}

function Back() {
   var ev = document.getElementById('res');
   ev.value = ev.value.slice(0, -1);
}

function SaveToHistory(expression, result) {
  const historyList = document.getElementById('history-list');
  const historyItem = document.createElement('li');

  historyItem.textContent = `${expression} = ${result}`;
  historyList.appendChild(historyItem);
}

function ClearHistory() {
   const historyList = document.getElementById('history-list');
   historyList.innerHTML = '';
}

document.addEventListener('keydown', function (event) {
   const key = event.key;
   const validKeys = '0123456789+-*/.%';
   if (validKeys.includes(key)) {
       Solve(key === '*' ? 'x' : key);
   } else if (key === 'Enter') {
       Result();
   } else if (key === 'Backspace') {
       Back();
   } else if (key.toLowerCase() === 'c') {
       Clear();
   }
});
