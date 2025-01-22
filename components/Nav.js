import Link from 'next/link'
import Script from 'next/script'
import {useEffect, useState} from 'react'
import {useRouter} from "next/router";
// import Signin from "../pages/signin";
// import Signup from "../pages/signup";

const Nav = () => {
    const router = useRouter();
    const [item, setItem] = useState(null)

    useEffect(() => {
        console.log(location.href);
        console.log(localStorage.getItem("token"))
        setItem(localStorage.getItem("token"))
    }, [router]);

    function logout() {
        localStorage.removeItem("token")
        setItem(null)
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
                    {
                        item === null ?
                            <li><Link href="/signin">Signin</Link></li>
                            : null
                    }
                    {
                        item === null ?
                            <li><Link href="/signup">Signup</Link></li>
                            : null
                    }

                    {/*<li onClick={Signin}><Link href="/">Signin</Link></li>*/}
                    {/*<li onClick={Signup}><Link href="/">Signup</Link></li>*/}
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