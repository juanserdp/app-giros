import {
    GridColumnMenuContainer,
    GridFilterMenuItem,
} from '@mui/x-data-grid';
import React from 'react';

export const GridColumnMenu = React.forwardRef(function GridColumnMenu(props, ref) {
    const { hideMenu, currentColumn } = props;
    return (
        <GridColumnMenuContainer ref={ref} {...props} >
            <GridFilterMenuItem onClick={hideMenu} column={currentColumn} />
        </GridColumnMenuContainer>
    );
});