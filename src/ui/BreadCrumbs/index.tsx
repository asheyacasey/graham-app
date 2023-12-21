import { cn } from '@/utils/styles'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
type BreadCrumb = {
  title: string
  route?: string,

}
interface BreadCrumbsProps {
  data: BreadCrumb[]
  fontSize?: number
  className?: string
}
const BreadCrumbs = ({ data, fontSize = 16, className }: BreadCrumbsProps) => {
  const router = useRouter()
  return (
    <div className=''>
      {
        data.map((el, index) => (
          <span onClick={() => {
            if (el.route) {
              router.push(el.route)
            }
          }} style={{ fontSize }} className={cn('font-Roboto', {
            'text-brand_gray-200': index === data.length - 1,
            'cursor-pointer': el.route
          }, className)} key={index}>{index === data.length - 1 ? el.title : `${el.title} / `}</span>
        ))
      }
    </div>
  )
}

export default BreadCrumbs