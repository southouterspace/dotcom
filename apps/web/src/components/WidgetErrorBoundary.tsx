'use client';

import React from 'react';

type WidgetErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};

type WidgetErrorBoundaryProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export default class WidgetErrorBoundary extends React.Component<
  WidgetErrorBoundaryProps,
  WidgetErrorBoundaryState
> {
  constructor(props: WidgetErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): WidgetErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, _errorInfo: React.ErrorInfo) {
    // Report to error monitoring service if available
    if (typeof window !== 'undefined') {
      const windowWithGtag = window as typeof window & {
        gtag?: (
          command: string,
          targetId: string,
          config?: Record<string, unknown>
        ) => void;
      };

      if (windowWithGtag.gtag) {
        windowWithGtag.gtag('event', 'exception', {
          description: `Widget Error: ${error.message}`,
          fatal: false,
        });
      }
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            <h3 className="font-medium text-sm">Widget Error</h3>
            <p className="mt-1 text-red-600 text-sm">
              The conversational widget failed to load. Please refresh the page
              to try again.
            </p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
