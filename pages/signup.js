import style from "../styles/About.module.css"
import {useRouter} from "next/router";
import {useState} from "react";
import Head from "next/head";

export default function Signup() {
    const router = useRouter()

    const [state, setState] = useState({
        username: "",
        email: "",
        password: ""
    })

    async function handle() {
        const res = await fetch('http://localhost:8080/auth/signup', {
            method: "POST",
            body: JSON.stringify(state),
            headers: {
                "Content-type": "application/json"
            }
        })
        if (res.ok) {
            alert("yeah! success, baby!!!")
            await router.push("/signin")
        }
    }

    function extract(e) {
        const copy = {...state}
        copy[e.target.name] = e.target.value
        setState(copy)
    }

    return (
        <>
            <Head>
                <title>Sign UP</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className={style.containerSign}>
                <div className={style.form}>
                    <h1>Sign in</h1>
                    <div>
                        <input type="text" name="username" placeholder="username"
                               value={state.username} onChange={extract} autoComplete="off"/>
                    </div>
                    <div>
                        <input type="email" name="email" placeholder="email"
                               value={state.email} onChange={handle} autoComplete="off"/>
                    </div>
                    <div>
                        <input type="password" name="password" placeholder="password"
                               value={state.password} onChange={handle}/>
                    </div>
                    <button onClick={handle}>Submit</button>
                </div>
            </div>
        </>
    );
}