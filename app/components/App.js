import React from "react"
import Popular from "./Popular"
import Home from "./Home"
import Battle from "./Battle"
import Results from "./Results"
import { Switch, BrowserRouter as Router, Route} from "react-router-dom"
import Nav from "./Nav"

class App extends React.Component {
    render(){
        return (
            <Router>
                <div>
                    <Nav />
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/battle" component={Battle} />
                            <Route path="/battle/results" component={Results} />
                            <Route path="/popular" component={Popular} />
                            <Route component={() => <p>Not found</p>} />
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}

export default App