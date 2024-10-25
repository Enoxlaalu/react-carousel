import { CarouselArrowType } from './CarouselArrow.types'

import s from './CarouselArrow.module.scss'

const CarouselArrow: CarouselArrowType = ({
    direction = 'prev',
    onClick,
    hidden,
}) => {
    const handleClick = () => onClick(direction)

    return (
        <div
            className={`${s.carouselArrow} ${s[direction]} ${
                hidden && s.hidden
            }`}
            onClick={handleClick}
        >
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M16.5345 4.44896C16.8326 4.73334 17 5.11803 17 5.51901C17 5.91999 16.8326 6.30468 16.5345 6.58906L10.8674 12.0379L16.5345 17.4109C16.8326 17.6953 17 18.08 17 18.481C17 18.882 16.8326 19.2667 16.5345 19.551C16.3857 19.6933 16.2086 19.8062 16.0135 19.8833C15.8184 19.9603 15.6092 20 15.3979 20C15.1865 20 14.9773 19.9603 14.7822 19.8833C14.5871 19.8062 14.4101 19.6933 14.2612 19.551L7.47354 13.1156C7.32349 12.9745 7.20439 12.8066 7.12312 12.6217C7.04184 12.4367 7 12.2383 7 12.0379C7 11.8376 7.04184 11.6392 7.12312 11.4542C7.20439 11.2693 7.32349 11.1014 7.47354 10.9603L14.2612 4.44896C14.4101 4.3067 14.5871 4.19379 14.7822 4.11673C14.9773 4.03967 15.1865 4 15.3979 4C15.6092 4 15.8184 4.03967 16.0135 4.11673C16.2086 4.19379 16.3857 4.3067 16.5345 4.44896Z"
                    fill="#1F242E"
                />
            </svg>
        </div>
    )
}

export default CarouselArrow
