import React from 'react';
import tomato from '../../assets/tomato.png';
import './Tomato.css';

export default props => {

    const tomatoImg = (id) => (
        <span key={id} className="tomato__item">
            <img src={tomato} alt="tomato"/>
        </span>
    );

    let array = [];

    let count = props.tomato;

    while(count !== 0) {
        array.push(tomatoImg(count));
        count--;
    }

    const result = () => array.map(el => el);

    return (
        <div className="tomato__wrapper">
            {result()}
        </div>
    );
}
