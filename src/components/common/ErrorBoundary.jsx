import React from 'react';
import VertexLogo from './VertexLogo';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Atelier Error Boundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#07090e',
          color: '#ffffff',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          padding: '24px',
          textAlign: 'center'
        }}>
          <VertexLogo size={52} idSuffix="error-boundary" />
          <h1 style={{ marginTop: '24px', fontSize: '1.8rem', letterSpacing: '0.08em', color: '#d4af37' }}>
            VERTEX HORIZON
          </h1>
          <p style={{ marginTop: '12px', maxWidth: '500px', color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6' }}>
            The Atelier encountered an unexpected interface state. Please reload the console to resume your private client experience.
          </p>
          <button
            onClick={this.handleReload}
            style={{
              marginTop: '24px',
              padding: '12px 28px',
              background: 'linear-gradient(135deg, #d4af37, #b38840)',
              color: '#07090e',
              border: 'none',
              borderRadius: '2px',
              fontWeight: 700,
              fontSize: '0.82rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              cursor: 'pointer'
            }}
          >
            RELOAD ATELIER
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
