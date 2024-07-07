import React, { ReactNode } from 'react';

type ErrorBtnStateType = {
  isError: boolean;
};

class ErrorBoundaryButton extends React.Component<object, ErrorBtnStateType> {
  constructor(props: object) {
    super(props);
    this.state = {
      isError: false,
    };
  }

  throwError = () => {
    this.setState({ isError: true });
  };

  render(): ReactNode {
    const { isError } = this.state;

    if (isError) {
      throw new Error('I crashed!');
    }
    return <button onClick={this.throwError}>Error!</button>;
  }
}

export default ErrorBoundaryButton;
