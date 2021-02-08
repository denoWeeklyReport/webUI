import { FunctionalComponent, h } from "preact";
import { route } from 'preact-router';
import { useEffect, useState } from "preact/hooks";
import * as style from "./style.css";
import { api } from '../../api';
interface Imsg {
    type: string,
    text: string
}
const Reg = () => {
    const [username, setUserName] = useState<string>("");
    const [password, setPassWord] = useState<string>("");
    const [msg, setMsg] = useState<Imsg | null>(null)
    const reg = async () => {
        console.log(username, password)
        const res = await fetch(`${api}/reg`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        if (res.status == 200) {
            setMsg({
                type: "success",
                text: await res.text()
            })
            // route(`/`)
        } else {
            setMsg({
                type: "error",
                text: await res.text()
            })
        }
    }
    useEffect(() => {

    }, []);

    return (
        <div class={style.profile}>
            <h1>reg</h1>
            {
                msg && <div className={`toast toast-${msg?.type}`}>{msg?.text}</div>
            }
            <div className="form-group">
                <label className="form-label">username</label>
                <input className="form-input" value={username} onChange={(e: any) => {
                    setUserName(e.target.value)
                }} />
                <label className="form-label">password</label>
                <input className="form-input" type="password" value={password} onChange={(e: { target: any }) => {
                    setPassWord(e.target.value)
                }} />
            </div>
            <div className="form-group"><button className="btn btn-primary" onClick={reg}>reg</button></div>
        </div>
    );
};

export default Reg;
