import { render } from '@testing-library/react';

import SignInModal from './sign-in-modal';

describe('SignInModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SignInModal />);
    expect(baseElement).toBeTruthy();
  });
});
