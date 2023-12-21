import { cn } from '@/utils/styles'
import React from 'react'
import { IconComponent } from '../Icon'
interface LoadingScreenProps {
    className?: string
}
const LoadingScreen = ({ className }: LoadingScreenProps) => {
    return (
        <div className={cn('flex items-center justify-center', className)}>
            <IconComponent name='LoadingIcon' className='animate-spin' />
        </div>
    )
}

export default LoadingScreen