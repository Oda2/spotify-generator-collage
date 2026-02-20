import React from 'react';

class ErrorBoundary extends React.Component {
  state = { error: '', hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error) {
    if (import.meta.env.DEV) {
      console.error(`Ops: ${error}`);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <p>Error Screen</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
