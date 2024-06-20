import React from 'react'
import FlexBetween from './FlexBetween'
import { Box, Typography } from '@mui/material'

type Props = {
    title: string,
    subtitle?: string,
    sidetext: string,
    icon?: React.ReactNode;
}

const BoxHeaders = ({ title, subtitle, sidetext, icon }: Props) => {

    return (
        <>
            <FlexBetween color="#c2c5ce" margin="1.5rem 1rem 0rem 1rem" >
                <FlexBetween>
                    {icon}
                    <Box width="100%" >
                        <Typography variant='h5' mb="-0.1rem" >{title}</Typography>
                        <Typography variant='h6'>{subtitle}</Typography>
                    </Box>
                </FlexBetween>
                <Typography variant='h5' fontWeight="700" color="#f2b455" >{sidetext}</Typography>
            </FlexBetween>
        </>
    )
}

export default BoxHeaders