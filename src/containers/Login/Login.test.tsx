import React from 'react';
import { cleanup, render, getByText } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../core/i18n.ts';

import Login from './Login.tsx';
import LoginModal from './LoginModal.tsx';

afterEach(cleanup);

const renderWithI18n = (component: React.ReactElement) => {
  return render(
    <I18nextProvider i18n={i18n}>
      {component}
    </I18nextProvider>
  );
};

describe('Login Container', () => {
  it('Should render Login component', () => {
    const { container } = renderWithI18n(<Login />);

    expect(container.firstChild).toBeDefined();
    expect(getByText(container, 'Music Collage')).toBeDefined();
    expect(getByText(container, 'Generator')).toBeDefined();
  });

  it('Should render platform buttons', () => {
    const { container } = renderWithI18n(<Login />);

    expect(getByText(container, 'Spotify')).toBeDefined();
    expect(getByText(container, 'YouTube Music')).toBeDefined();
    expect(getByText(container, 'Deezer')).toBeDefined();
  });

  it('Should render footer', () => {
    const { container } = renderWithI18n(<Login />);

    expect(getByText(container, '© 2026 Music Collage Generator')).toBeDefined();
  });
});

describe('LoginModal Component', () => {
  it('Should render Spotify modal when open', () => {
    const { container } = renderWithI18n(
      <LoginModal
        isOpen={true}
        onClose={() => {}}
        onConfirm={() => {}}
        platform="spotify"
      />
    );

    expect(getByText(container, 'Spotify')).toBeDefined();
  });

  it('Should render YouTube Music modal when open', () => {
    const { container } = renderWithI18n(
      <LoginModal
        isOpen={true}
        onClose={() => {}}
        onConfirm={() => {}}
        platform="youtube"
      />
    );

    expect(getByText(container, 'YouTube Music')).toBeDefined();
  });

  it('Should render Deezer modal when open', () => {
    const { container } = renderWithI18n(
      <LoginModal
        isOpen={true}
        onClose={() => {}}
        onConfirm={() => {}}
        platform="deezer"
      />
    );

    expect(getByText(container, 'Deezer')).toBeDefined();
  });

  it('Should not render when closed', () => {
    const { container } = renderWithI18n(
      <LoginModal
        isOpen={false}
        onClose={() => {}}
        onConfirm={() => {}}
        platform="spotify"
      />
    );

    expect(container.firstChild).toBeNull();
  });
});
