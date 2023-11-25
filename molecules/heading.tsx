import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';

import {ColorPalette} from '../constants/colorPalette';

interface IProps {
  heading: string;
  headingStyle?: TextStyle;
}

const Heading = (props: IProps) => {
  const {heading, headingStyle = {}} = props;
  return <Text style={[styles.heading, headingStyle]}>{heading}</Text>;
};

export default Heading;

const styles = StyleSheet.create({
  heading: {
    fontWeight: '600',
    fontSize: 30,
    color: ColorPalette.black,
    textAlign: 'center',
  },
});
