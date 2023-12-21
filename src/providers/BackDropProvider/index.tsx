'use client'
import { useAppSelector } from '@/redux/hooks'
import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'

const BackDropProvider = ({ children }: { children: React.ReactNode }) => {
    const appState = useAppSelector((s) => s.app)
    return (
        <div>
            <Backdrop
                open={appState.fullScreenLoading}
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {children}
        </div>
    )
}

export default BackDropProvider