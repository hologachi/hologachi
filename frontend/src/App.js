import '../src/css/App.css';
import  MUser  from "./js/adminpage/manageUser";
import  MGB  from "./js/adminpage/manageGB";
import  MGBPost  from "./js/adminpage/manageGBPost";
import  MGBCategory  from "./js/adminpage/manageGBCategory";
import  ChatList  from "./js/chat/chatList";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/mUser" component={MUser} />
          <Route path="/mGB" component={MGB} />
          <Route path="/mGBPost" component={MGBPost} />
          <Route path="/mGBCategory" component={MGBCategory} />
          <Route path="/chat/List" component={ChatList} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
