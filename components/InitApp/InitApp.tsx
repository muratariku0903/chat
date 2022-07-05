import React, { useEffect } from 'react';
import { useReactLifeCycle } from '../../hooks/reactLifeCycle';
import { useSetup } from '../../hooks/setup';

const InitApp: React.FC = (): null => {
    const { setup } = useSetup();
    const { componentWillMount } = useReactLifeCycle();

    componentWillMount(setup);
    console.log('setup');

    // useEffect(() => {
    //     setup().then(res => {
    //         console.log('setup!');
    //     }).catch(e => {
    //         console.error(e);
    //     })
    // }, []);

    return null;
}

export default InitApp;
