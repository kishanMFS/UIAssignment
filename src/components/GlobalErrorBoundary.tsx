import React from "react";

type propsType = {
  children: React.ReactNode;
  onError?: (error: unknown) => void;
};

type stateType = {
  hasError: boolean;
  error: unknown;
};

class GlobalErrorBoundary extends React.Component<propsType, stateType> {
  constructor(props: propsType) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: unknown) {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown) {
    if (window.location.pathname === "/error") return;
    setTimeout(() => {
      this.props.onError(error);
    }, 0);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;
