import React from 'react';
import { cleanup, render, fireEvent, getByText, getByTestId } from '@testing-library/react';

import Button from './Button';

afterEach(cleanup);

describe('Button component', () => {
  it('Should render component', () => {
    const { container } = createComponent();

    expect(container.firstChild).toBeDefined();
    expect(getByText(container, 'Testing')).toBeDefined();
  });

  it('Should onclick button', () => {
    const onClick = jest.fn();

    const { container } = createComponent({ onClick });

    const btnEl = getByText(container, 'Testing');
    fireEvent.click(btnEl);

    expect(onClick).toHaveBeenCalled();
  });

  it('Should pass properties with button', () => {
    const { container } = createComponent({
      'data-testid': 'btn-datatestid'
    });

    expect(getByTestId(container, 'btn-datatestid')).toBeDefined();
  });
});

function createComponent(props = {}) {
  const defaultProps = {
    ...props
  };

  return render(
    <Button {...defaultProps}>
      Testing
    </Button>
  );
}
