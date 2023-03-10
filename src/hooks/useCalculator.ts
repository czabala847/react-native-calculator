import {useRef, useState} from 'react';
enum Operators {
  sum,
  subtract,
  multiply,
  divide,
}

export const useCalculator = () => {
  const [prevNumber, setPrevNumber] = useState('0');
  const [number, setNumber] = useState('0');
  const lastOperator = useRef<Operators>();

  const clean = () => {
    setNumber('0');
    setPrevNumber('0');
  };

  const addNumber = (numberText: string) => {
    // No aceptar doble punto
    if (number.includes('.') && numberText === '.') {
      return;
    }

    if (number.startsWith('0') || number.startsWith('-0')) {
      // Punto decimal
      if (numberText === '.') {
        setNumber(number + numberText);

        // Evaluar si es otro cero, y hay un punto
      } else if (numberText === '0' && number.includes('.')) {
        setNumber(number + numberText);

        // Evaluar si es diferente de cero y no tiene un punto
      } else if (numberText !== '0' && !number.includes('.')) {
        setNumber(numberText);

        // Evitar 0000.0
      } else if (numberText === '0' && !number.includes('.')) {
        setNumber(number);
      } else {
        setNumber(number + numberText);
      }
    } else {
      setNumber(number + numberText);
    }
  };

  const positiveNegative = () => {
    if (number.includes('-')) {
      setNumber(number.replace('-', ''));
    } else {
      setNumber('-' + number);
    }
  };

  const onDeleteNumber = () => {
    if (number === '0') {
      return;
    }

    let negative = '';
    let numberTemp = number;

    if (number.includes('-')) {
      negative = '-';
      numberTemp = number.substring(1);
    }

    if (numberTemp.length > 1) {
      setNumber(negative + numberTemp.slice(0, -1));
    } else {
      setNumber('0');
    }
  };

  const changePrevNumber = () => {
    if (number.endsWith('.')) {
      setPrevNumber(number.slice(0, -1));
    } else {
      setPrevNumber(number);
    }

    setNumber('0');
  };

  const onDivide = () => {
    changePrevNumber();
    lastOperator.current = Operators.divide;
  };
  const onMultiply = () => {
    changePrevNumber();
    lastOperator.current = Operators.multiply;
  };
  const onSubtract = () => {
    changePrevNumber();
    lastOperator.current = Operators.subtract;
  };
  const onSum = () => {
    changePrevNumber();
    lastOperator.current = Operators.sum;
  };

  const onCalculate = () => {
    const num1 = Number(number);
    const num2 = Number(prevNumber);

    switch (lastOperator.current) {
      case Operators.divide:
        setNumber(`${num2 / num1}`);
        break;
      case Operators.multiply:
        setNumber(`${num2 * num1}`);
        break;
      case Operators.subtract:
        setNumber(`${num2 - num1}`);
        break;
      case Operators.sum:
        setNumber(`${num1 + num2}`);
        break;
    }

    setPrevNumber('0');
  };

  return {
    addNumber,
    clean,
    number,
    onCalculate,
    onDeleteNumber,
    onDivide,
    onMultiply,
    onSubtract,
    onSum,
    positiveNegative,
    prevNumber,
  };
};
