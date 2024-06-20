import FlexBetween from '@/components/FlexBetween';
import { Box, Typography } from '@mui/material'
import PixIcon from '@mui/icons-material/Pix';
import { useState } from 'react'
import { Link } from 'react-router-dom';


const Navbar = () => {

    const [selected, setSelected] = useState("dashboard")

    return (
        <FlexBetween mb="0.25rem" p="0.5rem 0rem" color="#d1d3da" >
            <FlexBetween gap="0.75rem" >
                <PixIcon sx={{ fontSize: "28px" }} />
                <Typography variant='h4' fontSize="16px" >
                    Finance
                </Typography>
            </FlexBetween>
            <FlexBetween gap="2rem" >
                <Box sx={{ "&:hover": { color: "#d0fcf4" } }} >
                    <Link to={"/Finance-Dashboard-MERN"} onClick={() => setSelected("dashboard")}
                        style={{
                            color: selected === "dashboard" ? "inherit" : "#6b6d74",
                            textDecoration: "inherit"
                        }} >
                        Dashboard
                    </Link>
                </Box>
                <Box sx={{ "&:hover": { color: "#d0fcf4" } }} >
                    <Link to={"/predictions"} onClick={() => setSelected("predictions")}
                        style={{
                            color: selected === "predictions" ? "inherit" : "#6b6d74",
                            textDecoration: "inherit"
                        }} >
                        Predictions
                    </Link>
                </Box>

            </FlexBetween>
        </FlexBetween>
    )
}

export default Navbar