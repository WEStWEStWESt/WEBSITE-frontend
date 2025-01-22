import style from "../styles/Page.module.css"
import {useRouter} from "next/router";
import {useState} from "react";
import Head from "next/head";

export default function Signin() {
    const router = useRouter()

    const [state, setState] = useState({
        username: "",
        //email: "", E-mail input есть в разметке(56-57 строки) но не было здесь, или тут раскоментить или там убрать
        password: ""
    })

    function fill(e) {
        const copy = {...state}
        copy[e.target.name] = e.target.value
        setState(copy)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        console.log(state)
        localStorage.clear()
        try {
            const res = await fetch('http://localhost:8080/auth/signin', {
                method: "POST",
                body: JSON.stringify(state),
                headers: {
                    "Content-type": "application/json"
                }
            })
            if (res.ok) {
                const json = await res.text()
                console.log(json)
                localStorage.setItem("token", json)
                await router.push("/")
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <Head>
                <title>Sign in</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className={style.container}>
                <form className={style.form} onSubmit={handleSubmit}>
                    <h1>Sign in</h1>
                    <input className={style.input} type="text" name="username" placeholder="username"
                           value={state.username} onChange={fill} autoComplete="off" required/>
                    <input className={style.input} type="email" name="email" placeholder="email"
                           value={state.email} onChange={fill} autoComplete="off" required/>
                    <input className={style.input} type="password" name="password" placeholder="password"
                           value={state.password} onChange={fill} required/>
                    <button className={style.button} type={'submit'}>Submit</button>
                </form>
            </div>
        </>
    );
}