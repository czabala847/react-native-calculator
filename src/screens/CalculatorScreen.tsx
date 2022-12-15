import React, {useRef, useState} from 'react';
import {Text, View} from 'react-native';
import {ButtonCalc} from '../components/ButtonCalc';

import {styles} from '../theme/appTheme';

enum Operators {
  sum,
  subtract,
  multiply,
  divide,
}

export const CalculatorScreen = () => {
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

  return (
    <View style={styles.calculatorContainer}>
      {prevNumber !== '0' && (
        <Text style={styles.smallResult}>{prevNumber}</Text>
      )}
      <Text numberOfLines={1} adjustsFontSizeToFit style={styles.result}>
        {number}
      </Text>

      <View style={styles.row}>
        <ButtonCalc text="C" color="grayLight" onClick={clean} />
        <ButtonCalc text="+/-" color="grayLight" onClick={positiveNegative} />
        <ButtonCalc text="del" color="grayLight" onClick={onDeleteNumber} />
        <ButtonCalc text="/" color="orange" onClick={onDivide} />
      </View>

      <View style={styles.row}>
        <ButtonCalc text="7" onClick={addNumber} />
        <ButtonCalc text="8" onClick={addNumber} />
        <ButtonCalc text="9" onClick={addNumber} />
        <ButtonCalc text="*" color="orange" onClick={onMultiply} />
      </View>

      <View style={styles.row}>
        <ButtonCalc text="4" onClick={addNumber} />
        <ButtonCalc text="5" onClick={addNumber} />
        <ButtonCalc text="6" onClick={addNumber} />
        <ButtonCalc text="-" color="orange" onClick={onSubtract} />
      </View>

      <View style={styles.row}>
        <ButtonCalc text="0" widthFull onClick={addNumber} />
        <ButtonCalc text="." onClick={addNumber} />
        <ButtonCalc text="=" color="orange" onClick={onSum} />
      </View>
    </View>
  );
};
