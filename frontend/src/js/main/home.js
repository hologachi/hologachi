import React from 'react'
import Feed from "./feed"
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./header"
import Post from "./post"
import Footer from "./footer"

function home() {
    return (
        <div className="Home">
            <Header />
            <div className="home__body">
                <Feed />
                <Post />
            </div>
            <Footer />
        </div>
    )
}

export default home
