import React from "react";

type propsType = {
  children: React.ReactNode;
};

type stateType = {
  hasError: boolean;
  error: any;
};

class GlobalErrorBoundary extends React.Component<propsType, stateType> {
  constructor(props: propsType) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, info: any) {
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
      return (null)
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;