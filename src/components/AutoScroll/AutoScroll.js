import React, {useEffect, useState, useRef} from 'react';

import './AutoScroll.css';

const AutoScroll = (props) => {
    const {stopAtEnd, onEnd, data} = props;
    const id = `AutoScroll_${Date.now()}`

    const scroll = (element, top = 0, maxTop = Infinity) => {
        const newTop = top + 4;
        element.style.top = `-${newTop}px`;
        setTimeout(() => {
            if (newTop >= maxTop && onEnd) {
                setTimeout(() => {
                    element.style.top = `0px`
                    setTimeout(onEnd, 1000);
                }, 1000);
            } else scroll(element, newTop >= maxTop ? 0 : newTop, maxTop);
        }, 200)
    }

    useEffect(() => {
        const containerHeight = document.querySelector(`#${id}`).getBoundingClientRect().height;
        const elementHeight = document.querySelector(`#${id}>*`).getBoundingClientRect().height;
        if (elementHeight > containerHeight) {
            scroll(document.querySelector(`#${id}>*`), 0, elementHeight - containerHeight);
        } else if (elementHeight <= containerHeight && onEnd) {
            setTimeout(onEnd, 3000 * Math.random() + 3000)
        }
    }, [data])


    return (
        <div className='AutoScroll' id={id}>
            {props.children}
        </div>
    )
}

export default AutoScroll;