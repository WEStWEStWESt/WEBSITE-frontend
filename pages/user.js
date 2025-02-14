import style from "../styles/Page.module.css"
import Head from "next/head";
import {useEffect, useState} from "react";

const User = () => {
    const [userName, setUserName] = useState('')

    useEffect(() => {
        const token = localStorage.getItem("token")
        token ? fetchContent() : setUserName('')
    }, []);

    async function fetchContent() {

        try {
            const res = await fetch('http://localhost:8080/secured/user', {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer" + localStorage.getItem("token")
                }
            })
            if (res.ok) {
                const json = await res.text()
               setUserName(json)
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <Head>
                <title>USER</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <div className={style.container}>
                <div className={style.form}>
                    {
                        userName ?
                            <h1>Signed in as: {userName}</h1>
                            : <h1>UNAUTHORIZED</h1>
                    }
                </div>
            </div>
        </>
    );
};

export default User;