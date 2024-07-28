import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomTabNavigator} from '../bottomTabs';
import {MovieDetails} from '../../screens';
import {Movie} from '../../redux/movieSlice';

export type RootStackParamList = {
  BottomTabs: undefined;
  MovieDetails: {movie: Movie};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
      <Stack.Screen name="MovieDetails" component={MovieDetails} />
    </Stack.Navigator>
  );
};
