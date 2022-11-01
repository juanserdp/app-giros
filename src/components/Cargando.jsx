import React from 'react';
import { Spinner } from 'react-bootstrap';

export function Cargando() {
    return (
        <React.Fragment>
            <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true" />
            &nbsp;
            Cargando...
        </React.Fragment>
    )
}