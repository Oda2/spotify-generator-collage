import React from 'react';
import { cleanup, render, getByText } from '@testing-library/react';

import Main from './Main.tsx';

afterEach(cleanup);

describe('Main Containers', () => {
  it('Should render component', () => {
    const { container } = createComponent();

    expect(container.firstChild).toBeDefined();
    expect(getByText(container, 'My Content')).toBeDefined();
  });
});

function createComponent(props = {}) {
  const defaultProps = {
    ...props
  };

  return render(
    <Main {...defaultProps}>
      <h1>My Content</h1>
    </Main>
  );
}
