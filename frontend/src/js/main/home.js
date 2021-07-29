import React from 'react'
import Feed from "./feed"
import 'bootstrap/dist/css/bootstrap.min.css';
import Post from "./post"

function home() {
    return (
        <div className="Home">
            <div className="home__body">
                <Feed />
                <Post />
            </div>
        </div>
    )
}

export default home
