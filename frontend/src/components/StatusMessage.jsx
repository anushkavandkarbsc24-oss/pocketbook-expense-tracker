import React, { Component } from 'react';

// CLASS COMPONENT (college requirement).
// A reusable status box for three situations: loading, error and empty.
// - props: type ('loading' | 'error' | 'empty'), message
// - state: dismissed (errors can be closed by the user)
// - lifecycle: componentDidUpdate shows the error again when the message changes
class StatusMessage extends Component {
  constructor(props) {
    super(props);
    this.state = { dismissed: false };
    this.handleDismiss = this.handleDismiss.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.message !== this.props.message && this.state.dismissed) {
      this.setState({ dismissed: false });
    }
  }

  handleDismiss() {
    this.setState({ dismissed: true });
  }

  render() {
    const { type, message } = this.props;
    if (this.state.dismissed || (type === 'error' && !message)) return null;

    if (type === 'loading') {
      return (
        <div className="flex items-center justify-center gap-3 py-10 text-sm text-slate-500" role="status">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-income" />
          {message || 'Loading...'}
        </div>
      );
    }

    if (type === 'error') {
      return (
        <div className="flex items-start justify-between gap-3 rounded-lg border border-rose-200 bg-expense-soft px-4 py-3 text-sm text-rose-800" role="alert">
          <span>{message}</span>
          <button onClick={this.handleDismiss} className="font-semibold hover:underline" aria-label="Dismiss message">
            Dismiss
          </button>
        </div>
      );
    }

    // type === 'empty'
    return <div className="py-10 text-center text-sm text-slate-500">{message}</div>;
  }
}

StatusMessage.defaultProps = { type: 'empty', message: '' };

export default StatusMessage;
