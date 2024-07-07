import React from 'react'
import { Box } from '@mui/material';
import Header from '../../components/Header';
// import { useTheme } from '@mui/material';
// import { tokens } from '../../theme';
import CustomizedTables from './customizedTables';
const Home = () => {
    // const theme = useTheme()
    // const colors = tokens(theme.palette.mode)
    return (
        <Box m="20px" height="75vh">
            <Header title="BAR CHART" subtitle="simple bar chart" />
            <p>TEST</p>
            <CustomizedTables/>
        </Box>
    )
}

export default Home