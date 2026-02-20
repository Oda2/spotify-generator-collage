import React from 'react';
import { render, cleanup } from '@testing-library/react';

import App from './App.tsx';

afterEach(cleanup);

describe('App', () => {
  it('Should render component', () => {
    const { container } = render(<App />);

    expect(container.firstChild).toBeDefined();
  });
});
