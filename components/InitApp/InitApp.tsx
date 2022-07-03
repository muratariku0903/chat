import React, { useEffect } from 'react';
import { useSetup } from '../../hooks/setup';

const InitApp: React.FC = (): null => {
    const { setup } = useSetup();

    useEffect(() => {
        setup().then(res => {
            console.log('setup!');
        }).catch(e => {
            console.error(e);
        })
    }, []);

    return null;
}

export default InitApp;
