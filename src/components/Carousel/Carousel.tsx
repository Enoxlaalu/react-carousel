import { Children, useEffect, useRef, useState } from 'react'

import s from './Carousel.module.scss'
import { CarouselComponentType } from './Carousel.types'
import CarouselArrow from './CarouselArrow/CarouselArrow'

const Carousel: CarouselComponentType = ({ children }) => {
    const list = useRef<HTMLUListElement>(null)
    const [indexes, setIndexes] = useState<number[]>([])

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
            threshold: 1,
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

    const makeScroll = (nextIndex: number) => {
        const items = Array.from(list.current!.children)

        items[nextIndex].scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest',
        })
    }

    const scrollToPrev = () => {
        const nextIndex = indexes.length > 1 ? indexes[0] : indexes[0] - 1

        makeScroll(nextIndex)
    }
    const scrollToNext = () => {
        const nextIndex =
            indexes.length > 1
                ? indexes[indexes.length - 1]
                : indexes[indexes.length - 1] + 1

        makeScroll(nextIndex)
    }

    return (
        <div className={s.sliderContainer}>
            <CarouselArrow
                onClick={scrollToPrev}
                hidden={!indexes.length || indexes.includes(0)}
            />
            <ul ref={list} className={s.innerSlider}>
                {children}
            </ul>
            <CarouselArrow
                onClick={scrollToNext}
                direction="next"
                hidden={!indexes.length || indexes.includes(itemsCount - 1)}
            />
        </div>
    )
}

export default Carousel
