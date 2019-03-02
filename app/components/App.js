var React = require("react"),
Popular = require("./popular").default,
Home = require("./Home"),
Battle = require("./Battle").default,
Results = require("./Results").default,
ReactRouter = require("react-router-dom"),
Switch = ReactRouter.Switch;
Router = ReactRouter.BrowserRouter,
Route = ReactRouter.Route,
Nav = require("./Nav");


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

module.exports = App