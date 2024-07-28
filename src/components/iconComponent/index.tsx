import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

type Props = {
  icon: IconProp;
  size?: number;
  color?: string;
};

export const IconComponent = ({icon, size, color}: Props) => {
  return <FontAwesomeIcon icon={icon} size={size} color={color} />;
};
