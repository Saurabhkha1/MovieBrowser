import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CommonHome} from '../../screens';
import {IconComponent} from '../../components';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {Icons} from '../../utils/icons';
import {Colors} from '../../utils/colors';

type BottomTabParamList = {
  NowPlaying: {title: string; icon: IconProp};
  Popular: {title: string; icon: IconProp};
  TopRated: {title: string; icon: IconProp};
  Upcoming: {title: string; icon: IconProp};
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator = () => {
  const getIcon = (icon: IconProp, size?: number, color?: string) => {
    return <IconComponent icon={icon} size={size} color={color} />;
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.darkBlue,
      }}>
      <Tab.Screen
        name="NowPlaying"
        component={CommonHome}
        options={{
          tabBarIcon: ({focused}) =>
            getIcon(
              Icons.nowPlaying,
              25,
              focused ? Colors.darkBlue : Colors.black,
            ),
          tabBarLabel: 'Now Playing',
        }}
        initialParams={{title: 'Now Playing', icon: Icons.nowPlaying}}
      />
      <Tab.Screen
        name="Popular"
        component={CommonHome}
        options={{
          tabBarIcon: ({focused}) =>
            getIcon(
              Icons.popular,
              25,
              focused ? Colors.darkBlue : Colors.black,
            ),
          tabBarLabel: 'Popular',
        }}
        initialParams={{title: 'Popular', icon: Icons.popular}}
      />
      <Tab.Screen
        name="TopRated"
        component={CommonHome}
        options={{
          tabBarIcon: ({focused}) =>
            getIcon(
              Icons.topRated,
              25,
              focused ? Colors.darkBlue : Colors.black,
            ),
          tabBarLabel: 'Top Rated',
        }}
        initialParams={{title: 'Top Rated', icon: Icons.topRated}}
      />
      <Tab.Screen
        name="Upcoming"
        component={CommonHome}
        options={{
          tabBarIcon: ({focused}) =>
            getIcon(
              Icons.upcoming,
              25,
              focused ? Colors.darkBlue : Colors.black,
            ),
        }}
        initialParams={{title: 'Upcoming', icon: Icons.upcoming}}
      />
    </Tab.Navigator>
  );
};
