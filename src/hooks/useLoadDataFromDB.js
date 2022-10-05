import { useEffect, useState } from "react";

export function useLoadDataFromDB(initialState, data, loading) {
    let dataForState = {}
    const [state, setState] = useState(initialState);
    const [isNotDataLoaded, setIsNotDataLoaded] = useState(true);
    
    if (isNotDataLoaded) {
        if (!loading) {
            if (data) {
                for (const field in initialState) {
                    dataForState = { ...dataForState, [field]: Object.entries(data)[0][1][field] };
                }
                setState(dataForState);
                setIsNotDataLoaded(false);
            };
        }
    };
    return [state, setState];
}
