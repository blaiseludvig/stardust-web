import { render } from '@testing-library/react';

import Collapsible from './collapsible';

describe('Collapsible', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Collapsible />);
    expect(baseElement).toBeTruthy();
  });
});
