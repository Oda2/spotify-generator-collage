import React from 'react';
import { cleanup, render } from '@testing-library/react';

import ErrorBoundary from './ErrorBoundary';

afterEach(cleanup);

describe('ErrorBoundary Component', () => {
  it('Should render Component', () => {
    const { container } = createComponent();

    expect(container.firstChild).toBeDefined();
  });
});

function createComponent(props = {}) {
  const defaultProps = {
    ...props
  };

  return render(
    <ErrorBoundary {...defaultProps}>
      <h1>My Component</h1>
    </ErrorBoundary>
  );
};
