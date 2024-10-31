import { Children, useEffect, useRef, useState } from 'react'

import s from './Carousel.module.scss'
import { CarouselComponentType } from './Carousel.types'
import CarouselArrow from './CarouselArrow/CarouselArrow'

const Carousel: CarouselComponentType = ({ children }) => {
    const list = useRef<HTMLUListElement>(null)
    const [indexes, setIndexes] = useState<number[]>([])
    const [edgeIndexes, setEdgeIndexes] = useState<number[] | null>(null)

    const itemsCount = Children.count(children)

    useEffect(() => {
        /* Intersection Observer Functionality */

        // when the observer detects an entry changing
        // (item entering or exiting  list)
        // and the entry is intersecting
        // get the intersecting item’s index
        // set the correct indicator to active

        let map: number[] = []

        const items = Array.from(list.current?.children || [])

        const onIntersectionObserved = (
            entries: IntersectionObserverEntry[]
        ) => {
            entries.forEach((entry) => {
                const intersectingIndex = items.indexOf(entry.target)

                if (entry.isIntersecting) {
                    map = [...map, intersectingIndex]
                } else {
                    map = map.filter((item) => item !== intersectingIndex)
                }
            })

            const intersectingIndexes = map.sort((a, b) => a - b)

            setIndexes(intersectingIndexes)
        }

        // create an observer with the list as intersection root
        const observer = new IntersectionObserver(onIntersectionObserved, {
            root: list.current,
            rootMargin: '0px',
            threshold: 0,
        })

        // observe each item
        items.forEach((item) => {
            observer.observe(item)
        })

        return () =>
            items.forEach((item) => {
                observer.unobserve(item)
            })
    }, [itemsCount])

    useEffect(() => {
        const items = Array.from(list.current?.children || [])

        if (!items.length) return

        const observer = new IntersectionObserver(
            (entries) => {
                let arr: number[] = []

                entries.forEach((e) => {
                    const intersectingIndex = items.indexOf(e.target)

                    if (e.isIntersecting) {
                        arr = [...arr, intersectingIndex]
                    } else {
                        arr = arr.filter((item) => item !== intersectingIndex)
                    }
                })

                setEdgeIndexes(arr)
            },
            {
                root: list.current,
                rootMargin: '0px',
                threshold: 1,
            }
        )

        const arr = [items[0], items[items.length - 1]]

        arr.forEach((el) => observer.observe(el))
        return () => arr.forEach((el) => observer.unobserve(el))
    }, [])

    if (!itemsCount) return

    const makeScroll = (nextIndex: number) => {
        const items = Array.from(list.current!.children)

        items[nextIndex].scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest',
        })
    }

    const scrollToPrev = () => {
        const nextIndex = indexes[0]

        makeScroll(nextIndex)
    }
    const scrollToNext = () => {
        const nextIndex = indexes[indexes.length - 1]

        makeScroll(nextIndex)
    }

    return (
        <div className={s.sliderContainer}>
            <CarouselArrow
                onClick={scrollToPrev}
                hidden={!edgeIndexes || edgeIndexes.includes(0)}
            />
            <ul ref={list} className={s.innerSlider}>
                {children}
            </ul>
            <CarouselArrow
                onClick={scrollToNext}
                direction="next"
                hidden={!edgeIndexes || edgeIndexes.includes(itemsCount - 1)}
            />
        </div>
    )
}

export default Carousel
