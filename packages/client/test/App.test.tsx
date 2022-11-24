import {cleanup, render} from '@testing-library/react';

import App from '@/App';

describe('<App /> tests', () => {
  afterEach(cleanup);

  it('renders <App /> without errors', () => {
    const {queryByText} = render(<App />);

    expect(queryByText('Vite + React')).toBeTruthy();
  });
});
