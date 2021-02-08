import { FunctionalComponent, h } from "preact";
import { route } from 'preact-router';
import { useEffect, useState } from "preact/hooks";
import * as style from "./style.css";
import { api } from '../../api';
const Logout = () => {
    useEffect(() => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('username');
    }, []);
    return (
        <div class={style.profile}>
            <h1>您已登出系统</h1>
        </div>
    );
};

export default Logout;
