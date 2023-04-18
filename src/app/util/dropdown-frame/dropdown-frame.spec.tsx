import { render } from '@testing-library/react';

import DropdownFrame from './dropdown-frame';

describe('DropdownFrame', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DropdownFrame />);
    expect(baseElement).toBeTruthy();
  });
});
