import { createExpandContainer } from '@alist/react';
import { createControllerBox, InternalVirtualField } from '@formily/next';
var NextExpandContainer = createExpandContainer({ VirtualField: InternalVirtualField, createControllerBox: createControllerBox });
export default NextExpandContainer;
