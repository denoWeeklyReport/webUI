import { FunctionalComponent, h } from "preact";
import { route } from "preact-router";
import { Link } from "preact-router/match";
import { useEffect, useState } from "preact/hooks";
import * as style from "./style.css";

const Header: FunctionalComponent = () => {
    const [localStorageUserName, setLocalStorageUserName] = useState<string | null>(null)
    const check = () => {
        const u = localStorage.getItem('username') || null;
        if (u != localStorageUserName) {
            setLocalStorageUserName(u);
        }
    }
    useEffect(() => {
        check();
        setInterval(() => {
            check();
        }, 3000)
    }, []);
    return (
        <header class={style.header}>
            <h1 onClick={() => {
                route("/");
            }}>weeklyReport</h1>
            <nav>
                <Link activeClassName={style.active} href="/">
                    Home
                </Link>
                {
                    localStorageUserName &&
                    <Link activeClassName={style.active} href={`/${localStorageUserName}`}>
                        Me
                        </Link>

                }
                {
                    localStorageUserName &&
                    <Link activeClassName={style.active} href={`/write/${localStorageUserName}`}>
                        write
                        </Link>

                }
                {
                    localStorageUserName &&
                    <Link activeClassName={style.active} href="/logout">
                        logout
                        </Link>
                }
                {
                    !localStorageUserName &&
                    <Link activeClassName={style.active} href="/login">
                        login
                        </Link>
                }
                {
                    !localStorageUserName &&
                    <Link activeClassName={style.active} href="/reg">
                        reg
                        </Link>
                }
            </nav>
        </header>
    );
};

export default Header;
