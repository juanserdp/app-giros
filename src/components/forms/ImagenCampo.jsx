import { Col,  Form } from "react-bootstrap";
import swal from "sweetalert";
import { FeedBack } from "../Feedback";

export function ImagenCampo({
    mensaje,
    setMensaje,
    disabled,
    file
    // value,
    // onChange,
    // isNewMensaje,
    // autoFocusMensaje
}) {

    const onChange = async (e) => {
        const img = e.target.files[0];
        if (img.size < 2000000) {
            const reader = new FileReader();
            reader.onload = async function (e) {
                const binaryString = e.target.result;
                setMensaje({ ...mensaje, imagen: binaryString });
            };
            reader.readAsBinaryString(img);
        } else swal("Error!", "No se puede cargar una imagen que pese mas de 2mb", "error");
    };

    return (
        <Form.Group
            as={Col}
            className="mb-3"
            md="12"
            style={{ fontFamily: "'Roboto', sans-serif" }}
        >
            <Form.Control
                id="inputFile"
                controlid="label_imagen"
                required
                name="imagen"
                type="file"
                accept=".png, .jpg, .jpeg"
                disabled={disabled ? true : false}
                onChange={(e) => onChange(e)}
                // value={value} 
                style={{ display: "none" }}
            />
            <FeedBack />
        </Form.Group>
    );
};