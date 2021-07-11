import '../src/css/App.css';
import  Adminpage  from "./js/adminpage/manageUser";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/adminpage" component={Adminpage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
