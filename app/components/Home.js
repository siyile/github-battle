import React from "react"
import { Link } from "react-router-dom"

class Home extends React.Component{
    render(){
        return(
            <div className="jumbotron">
                <div className="container">
                    <h1 className="display-4">
                        Github Battle
                    </h1>
                    <p className="lead">Battle your friends...and stuff.</p>
                    <hr className="my-4" />
                    <p>Completing with your friend or anyone in the github by repo star and following.</p>
                    <Link className="btn mt-3 btn-dark btn-lg" to="/battle">
                    Battle
                    </Link>
                </div>
            </div>
        )
    }
}

export default Home