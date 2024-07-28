import React from 'react';
import TestRenderer from 'react-test-renderer';
import {IconComponent} from '../../../../src/components';
import {Icons} from '../../../../src/utils/icons';

jest.mock('../../../../src/components', () => ({
  IconComponent: jest.fn(() => null),
}));

describe('IconComponent', () => {
  it('renders correctly with default props', () => {
    const component = TestRenderer.create(
      <IconComponent icon={Icons.search} />,
    ).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with size and color props', () => {
    const component = TestRenderer.create(
      <IconComponent icon={Icons.search} size={24} color="blue" />,
    ).toJSON();
    expect(component).toMatchSnapshot();
  });
});
