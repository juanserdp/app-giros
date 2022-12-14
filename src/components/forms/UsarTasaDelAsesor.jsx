import { Form } from "react-bootstrap";

export function UsarTasaDelAsesor({ value, onChange, md, disabled, children }) {
    return <Form.Check
        type="switch"
        className="mx-3"
        label={children}
        defaultChecked={value}
        onChange={(event) => {
            const valor = event.target.defaultChecked;
            onChange({ target: { value: !valor, name: "usarTasaDelAsesor" } });
        }}
        md={md}
        disabled={disabled ? true : false} />
}