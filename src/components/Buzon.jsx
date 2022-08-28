import { Carousel } from "react-bootstrap"
import { buzon } from "../assets/constants/buzon"

export function Buzon() {
    return (
        <Carousel variant="dark">
            {
                buzon.map((mensaje, i) => {
                    return (
                        <Carousel.Item key={i} interval={4000}>
                            <h5>{mensaje}</h5>
                            <br /><br />
                        </Carousel.Item>
                    )
                })
            }
        </Carousel>
    )
}