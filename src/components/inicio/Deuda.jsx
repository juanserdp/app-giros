import { Card, CardContent, Skeleton } from "@mui/material";
import { currencyFormatter } from "../../util/currencyFormatter";

const textStyleH2 = {
    fontWeight: "500",
    fontSize: "1.5rem",
    fontFamily: "'Roboto Slab', serif",
    color: "white",
    backgroundColor: "#dc3545",
};

const textStyleH3 = {
    fontWeight: "400",
    fontSize: "2rem",
    fontFamily: "'Roboto Slab', serif",
    color: "white",
};

const cardStyle = {
    height: "220px"
};

export function Deuda({ deuda }) {
    return (
        <Card className="card-container-deuda rounded" style={cardStyle}>
            <CardContent className="p-0">
                <h2 className="mb-4 py-2" style={textStyleH2}>Deuda</h2>
                <br />
                <h3 style={textStyleH3}>{currencyFormatter.format(deuda)}</h3>
            </CardContent>
        </Card>
    )
}