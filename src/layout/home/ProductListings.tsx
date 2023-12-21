import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import add, { getAddWithFiltersThunk } from '@/redux/slices/add'
import LoadingScreen from '@/ui/LoadingScreen'
import NotFoundScreen from '@/ui/NotFoundScreen.tsx'
import Pagination from '@/ui/components/Pagination'
import ProductCard from '@/ui/components/ProductCard'
import React, { useRef } from 'react'

const ProductListings = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()
    const addState = useAppSelector((s) => s.add)
    if (addState.loading) {
        return <LoadingScreen className='min-h-[400px]' />
    }
    if (addState.adds.length === 0 && !addState.loading) {
        return <NotFoundScreen className='min-h-[400px]' />
    }

    const setContainerIntoView = () => {
        if (!containerRef.current) {
            return;
        }
        containerRef.current.scrollIntoView({ behavior: "smooth", block: 'start' })
    }
    return (
        <div ref={containerRef}>
            {
                addState.loading ?
                    <LoadingScreen className="h-[400px]" />
                    :
                    <div className="grid md:grid-cols-3 gap-[10px] mt-[32px] min-h-[400px]">
                        {addState.adds.map((el, index) => (
                            <ProductCard
                                key={index}
                                // @ts-ignore
                                liked={el.liked ?? false}
                                add={el}
                            />
                        ))}
                    </div>
            }
            <div className="flex items-center justify-center py-8">
                {
                    addState?.filteration?.limit && (
                        <Pagination
                            currentPage={addState.filteration.page}
                            totalPages={Math.ceil(addState.totalDocs / addState?.filteration?.limit)}
                            onPageChange={async (page: number) => {
                                dispatch(getAddWithFiltersThunk({ page: page }))
                                setContainerIntoView()
                            }}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default ProductListings