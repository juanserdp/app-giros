import { useState } from "react";

export function useCargarDataForm(initialState, data){
    const [form, setForm] = useState(initialState);
    const [cargarForm, setCargarForm] = useState(true);

    if (data && cargarForm) {
        for(let dato in data){
            if(data[dato])
                console.log(data[dato]);
                setForm({ ...form, ...data[dato] });
        } 
        setCargarForm(false);
    }
    return [form, setForm];
}
