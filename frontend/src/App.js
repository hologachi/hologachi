import '../src/css/App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import '../src/css/App.css';
import  Home  from "./js/main/home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {/* Mypage */}
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
