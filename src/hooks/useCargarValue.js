import { useState } from "react";

export function useCargarValue(initialState, value) {
    const [field, setField] = useState(initialState);
    const [isNotValueLoaded, setIsNotValueLoaded] = useState(true);

    if (value && isNotValueLoaded) {
        if (value) setField(value);
        setIsNotValueLoaded(false);
    }
    return [field, setField];
}
