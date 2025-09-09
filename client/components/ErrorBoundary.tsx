import * as React from "react";

interface State {
  hasError: boolean;
  error?: Error | null;
}

export default class ErrorBoundary extends React.Component<unknown, State> {
  constructor(props: unknown) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error("Uncaught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background text-foreground">
          <div className="max-w-2xl text-center">
            <h1 className="text-2xl font-semibold mb-4">Something went wrong</h1>
            <p className="text-sm text-muted-foreground mb-6">An unexpected error occurred — we&apos;re tracking this issue.</p>
            <details className="text-xs text-muted-foreground whitespace-pre-wrap">
              {this.state.error?.stack}
            </details>
          </div>
        </div>
      );
    }

    return this.props.children as React.ReactElement;
  }
}
