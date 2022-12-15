import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

interface Props {
  text: string;
  color?: 'grayLight' | 'grayDark' | 'orange';
  widthFull?: boolean;
  onClick: (number: string) => void;
}

const getColor = (color: string) => {
  switch (color) {
    case 'grayLight':
      return '#9C9A9C';
    case 'grayDark':
      return '#2D2D2D';
    case 'orange':
      return '#FF9227';
  }
};

export const ButtonCalc: React.FC<Props> = ({
  text,
  color = 'grayDark',
  widthFull = false,
  onClick,
}) => {
  return (
    <TouchableOpacity onPress={() => onClick(text)}>
      <View
        style={[
          styles.button,
          {
            backgroundColor: getColor(color),
            width: widthFull ? 180 : 80,
          },
        ]}>
        <Text
          style={{
            ...styles.buttonText,
            color: color === 'grayLight' ? 'black' : 'white',
          }}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    height: 80,
    width: 80,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    padding: 10,
    fontWeight: '300',
  },
});
