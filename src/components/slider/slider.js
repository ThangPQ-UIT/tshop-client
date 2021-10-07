import React, { useState, useEffect } from 'react'

import greaterIcon from 'assets/icons/greater.png'
import lessIcon from 'assets/icons/less.png'

import { data } from './slideData'
import SlideItem from './components/slide_item/slide_item'

import './style.css'

const Slider = ({ data }) => {

    const [translatePosition, setTranslatePosition] = useState(0)

    useEffect(() => {

        const sliderTimer = setTimeout(() => {
            translatePosition === -100 * (data.length - 4)
                ? setTranslatePosition(0)
                : setTranslatePosition(translatePosition - 100)
        }, 3000)

        return (() => {
            clearTimeout(sliderTimer)
        })

    }, [translatePosition])

    const goLeft = () => {
        translatePosition === 0
            ? setTranslatePosition(-100 * (data.length - 4))
            : setTranslatePosition(translatePosition + 100)
    }
    const goRight = () => {
        translatePosition === -100 * (data.length - 4)
            ? setTranslatePosition(0)
            : setTranslatePosition(translatePosition - 100)
    }

    const style = {
        transform: `translateX(${translatePosition}%)`,
    }

    return (
        <div className='pr-slider'>
            <div className='pr-slide'>
                {data.map((item, index) => {
                    return (
                        <div style={style} className='pr-slide-item' key={index}>
                            <SlideItem data={item} />
                        </div>
                    )
                })}
            </div>
            {/* button left and right */}
            <div className='button-slide button-left'>
                <button
                    className='bg-transparent'
                    style={{
                        border: 'none',
                    }}
                    onClick={goLeft}
                >
                    <img src={lessIcon} />
                </button>
            </div>
            <div className='button-slide button-right'>
                <button
                    className='bg-transparent'
                    style={{
                        border: 'none',
                    }}
                    onClick={goRight}
                >
                    <img src={greaterIcon} />
                </button>
            </div>
        </div>
    )
}

export default Slider