import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './i18n.js';
import { HelmetProvider } from 'react-helmet-async';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '3rem', textAlign: 'center', fontFamily: 'sans-serif', color: '#0f2c59' }}>
          <h2>Ocurrió un inconveniente temporal de renderizado</h2>
          <p style={{ color: '#666', maxWidth: '500px', margin: '1rem auto' }}>
            Si tienes una extensión de traducción automática activada en el navegador, por favor desactívala para este sitio.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{ padding: '0.8rem 1.5rem', borderRadius: '12px', background: '#b85c38', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Recargar Página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

