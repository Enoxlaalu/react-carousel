import Carousel from './components/Carousel/Carousel'

import s from './App.module.scss'

function App() {
    return (
        <div className={s.wrapper}>
            <Carousel>
                {Array(20)
                    .fill('')
                    .map((item, index) => {
                        return (
                            <div
                                key={index}
                                style={{ width: Math.random() * 100 }}
                                // style={{ width: 200 }}
                                className={s.carouselItem}
                            >
                                {index}
                            </div>
                        )
                    })}
            </Carousel>
        </div>
    )
}

export default App
