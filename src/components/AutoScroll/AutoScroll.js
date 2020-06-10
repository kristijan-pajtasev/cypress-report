import React, {useEffect, useState, useRef} from 'react';

import './AutoScroll.css';

const AutoScroll = (props) => {
    const {stopAtEnd, onEnd} = props;
    const id = `AutoScroll_${Date.now()}`

    const scroll = (element, top = 0, maxTop = Infinity) => {
        setTimeout(() => {
            const newTop = top + 2;
            element.style.top = `-${newTop}px`;

            if(newTop > maxTop && stopAtEnd) onEnd();
            else scroll(element, newTop > maxTop ? 0 : newTop, maxTop);
        }, 100)
    }

    useEffect(() => {
        const containerHeight = document.querySelector(`#${id}`).getBoundingClientRect().height;
        const elementHeight = document.querySelector(`#${id}>*`).getBoundingClientRect().height;
        scroll(document.querySelector(`#${id}>*`), 0, elementHeight - containerHeight);
    }, [])


    return (
        <div className='AutoScroll' id={id}>
            {props.children}
        </div>
    )
}

export default AutoScroll;