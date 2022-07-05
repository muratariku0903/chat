import { useEffect, useRef } from "react";


export const useReactLifeCycle = () => {
    const componentWillMount = (cb: () => void) => {
        const willMount = useRef(true);

        if (willMount.current) cb();

        willMount.current = false;
    }

    return { componentWillMount };
}
