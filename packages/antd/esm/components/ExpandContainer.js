import { createExpandContainer } from '@alist/react';
import { createControllerBox, InternalVirtualField } from '@formily/antd';
var NextExpandContainer = createExpandContainer({ VirtualField: InternalVirtualField, createControllerBox: createControllerBox });
export default NextExpandContainer;
