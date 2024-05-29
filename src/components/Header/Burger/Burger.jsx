'use client'

import './Burger.css';
import { useSelector, useDispatch } from 'react-redux';
import { toggle } from '../../../redux/slices/navigation';

const Burger = () => {
    const dispatch = useDispatch();
    const isToggled = useSelector(state => state.toggle.value);

    return (
        <div className="burger" onClick={() => dispatch(toggle())}>
            <span style={!isToggled ? {transform: 'translateY(0px)'} : {transform: 'translateY(13px)'}}></span>
            <span></span>
            <span style={!isToggled ? {transform: 'translateY(0px)'} : {transform: 'translateY(-13px)'}}></span>
        </div>
    );
};

export default Burger;