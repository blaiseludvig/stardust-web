import { render } from '@testing-library/react';

import ModalFrame from './modal-frame';

describe('ModalFrame', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ModalFrame />);
    expect(baseElement).toBeTruthy();
  });
});
