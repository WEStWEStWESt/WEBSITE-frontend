import Link from 'next/link'
import Script from 'next/script'
import { useState } from 'react'
import { useEffect } from "react";
import {router} from "next/client";

const Nav = () => {

    const [item, setItem] = useState("")
    useEffect(() => {
        console.log(location.href);
        console.log(localStorage.getItem("token"))
        setItem(localStorage.getItem("token"))
    }, []);

    function logout(){
        localStorage.removeItem("token")
        router.push("/")
    }

    return (
        <>
        <Script src="../js/toggle.js"></Script>
        <nav className="navbar-links">
            <ul className="nav-links">
                {
                    item !== null ?
                        <li><Link href="/user">User</Link></li>
                        : null
                }
                {
                    item !== null ?
                        <li onClick={logout}><Link href="/">Logout</Link></li>
                        : null
                }
                <li><Link href="/">User</Link></li>
                <li><Link href="/">Signin</Link></li>
                <li><Link href="/">Signup</Link></li>
                <li><Link href="/">Winderton</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="https://www.youtube.com/channel/winderton">Youtube</Link></li>
                <li><Link href="https://www.patreon.com/winderton">Patreon</Link></li>
            </ul>
            <a className="burg">
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </a>
        </nav>
    </>
    )
}

export default Nav;