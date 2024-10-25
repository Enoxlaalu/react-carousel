import Carousel from './components/Carousel/Carousel'

import s from './App.module.scss'

function App() {
    return (
        <div className={s.wrapper}>
            <Carousel>
                {Array(10)
                    .fill('')
                    .map((item, index) => {
                        return (
                            <div key={index} className={s.carouselItem}>
                                {index}
                            </div>
                        )
                    })}
            </Carousel>
        </div>
    )
}

export default App
