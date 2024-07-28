import {View, ActivityIndicator, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/colors';

type Props = {
  size?: 'full' | 'normal';
  color?: string;
};

export const Loader = ({size, color = Colors.black}: Props) => {
  return (
    <View style={size === 'full' ? styles.fullScreen : styles.normal}>
      <ActivityIndicator size={'large'} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  normal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
