import { render } from '@testing-library/react';

import SignUpModal from './sign-up-modal';

describe('SignUpModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SignUpModal />);
    expect(baseElement).toBeTruthy();
  });
});
