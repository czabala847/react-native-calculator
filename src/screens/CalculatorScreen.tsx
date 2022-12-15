import React from 'react';
import {Text, View} from 'react-native';
import {ButtonCalc} from '../components/ButtonCalc';

import {useCalculator} from '../hooks/useCalculator';

import {styles} from '../theme/appTheme';

export const CalculatorScreen = () => {
  const {
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
  } = useCalculator();

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
        <ButtonCalc text="1" onClick={addNumber} />
        <ButtonCalc text="2" onClick={addNumber} />
        <ButtonCalc text="3" onClick={addNumber} />
        <ButtonCalc text="+" color="orange" onClick={onSum} />
      </View>

      <View style={styles.row}>
        <ButtonCalc text="0" widthFull onClick={addNumber} />
        <ButtonCalc text="." onClick={addNumber} />
        <ButtonCalc text="=" color="orange" onClick={onCalculate} />
      </View>
    </View>
  );
};
