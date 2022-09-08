import { useState } from "react";

export function useCargarDataChart(initialState, data) {
    const [form, setForm] = useState(initialState);
    const [isNotDataLoaded, setIsNotDataLoaded] = useState(true);

    if (data && isNotDataLoaded) {
        let datos = {};
        for (let prop in data) {
            datos = { ...datos, [prop]: data[prop] };
        }
        setForm({ ...form, ...datos });
        setIsNotDataLoaded(false);
    }
    return [form, setForm];
}
