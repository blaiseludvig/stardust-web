import { createContext } from 'react';

import { placementTypes } from '../tooltip/tooltip';

export type alignmentTypes = 'horizontal' | 'vertical';

const DialAlignmentContext = createContext<{
  alignment: alignmentTypes;
  tooltipPlacement: placementTypes;
}>({ alignment: 'vertical', tooltipPlacement: 'left' });

export default DialAlignmentContext;
