import style from "../styles/Page.module.css"
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

    async function handleSubmit(e) {
        e.preventDefault()
        try {
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
        } catch (err) {
            console.error(err)
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
            <div className={style.container}>
                <form className={style.form} onSubmit={handleSubmit}>
                    <h1>Sign up</h1>
                    <input className={style.input} type="text"  name="username" placeholder="username"
                           value={state.username} onChange={extract} autoComplete="off" required/>
                    <input className={style.input} type="email" name="email" placeholder="email"
                           value={state.email} onChange={extract} autoComplete="off" required/>
                    <input className={style.input} type="password" name="password" placeholder="password"
                           value={state.password} onChange={extract} autoComplete="off" required/>
                    <button className={style.button} type={'submit'}>Submit</button>
                </form>
            </div>
        </>
    );
}