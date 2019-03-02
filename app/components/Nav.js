var React = require("react"),
NavLink = require("react-router-dom").NavLink;

function Nav(){
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink exact activeClassName="active" className="nav-link" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName="active" className="nav-link" to="/battle">Battle</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName="active" className="nav-link" to="/popular">Popular</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

module.exports = Nav