import { Form } from "react-bootstrap";

export function UsarTasaPreferencial({ value, onChange, md, disabled, children }) {
    return <Form.Check
    style={{ fontFamily: "'Roboto', sans-serif" }}
        type="switch"
        className="mx-3"
        label={children}
        defaultChecked={value}
        onChange={(event) => {
            const valor = event.target.defaultChecked;
            onChange({ target: { value: !valor, name: "usarTasaPreferencial" } });
        }}
        md={md}
        disabled={disabled ? true : false} />
}