import * as React from 'react';

const Button: React.FunctionComponent = (): React.ReactElement => {
    return (
        <button onClick={() => console.log('Button clicked!')}>Button</button>
    );
};

export default Button;
