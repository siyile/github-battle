var React = require("react"),
Link = require("react-router-dom").Link;

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
                    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                    <Link className="btn mt-3 btn-dark btn-lg" to="/battle">
                    Battle
                    </Link>
                </div>
            </div>
        )
    }
}

module.exports = Home