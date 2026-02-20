import * as React from 'react';
import { cleanup, render, fireEvent, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

import Authentication from '../../components/Authentication/Authentication.tsx';
import GeneratorCollage from './GeneratorCollage.tsx';

describe('GeneratorCollage Container', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('Should render component', () => {
    const { container } = createComponent();
    expect(container.firstChild).toBeDefined();
  });

  it('Should generator Collage', async () => {
    const limit = 50;
    const timeRange = 'long_term';

    global.fetch.mockResolvedValue({
      status: 200,
      json: async () => ({
        items: [
          {
            name: 'Testing 1',
            images: [
              { url: 'http://www.google.com.br' }
            ]
          }
        ]
      })
    });

    const { container } = createComponent();

    const btnEle = screen.getByRole('button', { name: /GENERATE_COLLAGE/i });
    fireEvent.click(btnEle);

    expect(container.firstChild).toBeDefined();
    expect(global.fetch).toHaveBeenCalledWith(
      `https://api.spotify.com/v1/me/top/artists?limit=${limit}&time_range=${timeRange}`,
      expect.any(Object)
    );
  });
});

function createComponent(props = {}) {
  const defaultProps = {
    ...props
  };

  const defaultPropsAuthentication = {
    access_key: 'rice'
  };

  return render(
    <Authentication {...defaultPropsAuthentication}>
      <GeneratorCollage {...defaultProps} />
    </Authentication>
  );
}
