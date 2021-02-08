import { FunctionalComponent, h } from "preact";
import { route } from "preact-router";
import { Link } from "preact-router/match";
import { useEffect, useState } from "preact/hooks";
import * as style from "./style.css";

const Footer: FunctionalComponent = () => {
    useEffect(() => {

    }, []);
    return (
        <footer class={style.footer}>
            copyright 2021
        </footer>
    );
};

export default Footer;
