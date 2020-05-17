import React from 'react';
import { cleanup, render, fireEvent, screen, getByText, act } from '@testing-library/react';
import fetchMock from 'fetch-mock';

import Authentication from '../../components/Authentication';
import GeneratorCollage from './GeneratorCollage';

afterEach(cleanup);

jest.useFakeTimers();

describe('GeneratorCollage Container', () => {
  it('Should render component', () => {
    const { container } = createComponent();
    expect(container.firstChild).toBeDefined();
  });

  it('Should generator Collage', async () => {
    const limit = 50;
    const timeRange = 'long_term';

    fetchMock.mock(`https://api.spotify.com/v1/me/top/artists?limit=${limit}&time_range=${timeRange}`, {
      status: 200,
      body: {
        items: [
          {
            name: 'Testing 1',
            images: [
              { url: 'http://www.google.com.br' }
            ]
          }
        ]
      }
    });

    const { container, debug } = createComponent();

    const btnEle = getByText(container, 'GENERATE_COLLAGE');
    fireEvent.click(btnEle);
    jest.runOnlyPendingTimers();
  
    expect(container.firstChild).toBeDefined();
    // expect(getByText(container, 'Testing 1')).toBeDefined();
    debug();
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
