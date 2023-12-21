import { cn } from '@/utils/styles'
import React from 'react'
import { IconComponent } from '../Icon'
interface NotFoundScreenProps {
    className?: string
    text?: string
}
const NotFoundScreen = ({ className, text = `No search results, sorry for that :(` }: NotFoundScreenProps) => {
    return (
        <div className={cn('flex items-center justify-center flex-col space-y-3 mb-10', className)}>
            <IconComponent name='NotFoundIcon' width={300} height={300} />
            <h1 className='font-bold md:text-xl text-base'>{text}</h1>
        </div>
    )
}

export default NotFoundScreen