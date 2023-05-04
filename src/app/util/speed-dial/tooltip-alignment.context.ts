import { createContext } from 'react';

import { placementTypes } from '../tooltip/tooltip';

const TooltipAlignmentContext = createContext<{
  tooltipPlacement: placementTypes;
}>({ tooltipPlacement: 'left' });

export default TooltipAlignmentContext;
