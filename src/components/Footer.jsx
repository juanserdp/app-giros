import { Link } from "react-router-dom";

export function Footer() {
    return (
        <footer className="py-3 my-4">
            <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                <li className="nav-item ">
                    <Link className="nav-link px-2 text-muted" to="/inicio">
                        Inicio
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link px-2 text-muted" to="/cuenta">
                        Cuenta
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link px-2 text-muted" to="/">
                        Salir
                    </Link>
                </li>
            </ul>
            <p className="text-center text-muted">&copy; 2021 Company, Inc</p>
        </footer>
    )
}