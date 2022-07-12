import React, { useEffect } from 'react';
import { useReactLifeCycle } from '../../hooks/reactLifeCycle';
import { useSetup } from '../../hooks/setup';

const InitApp: React.FC = (): null => {
    const { setup } = useSetup();
    const { componentWillMount } = useReactLifeCycle();

    componentWillMount(setup);

    return null;
}

export default InitApp;
