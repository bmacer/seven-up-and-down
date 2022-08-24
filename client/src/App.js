import "./App.css";
import { Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Game from "./components/Game";

import { UserProvider } from "./contexts/user/user.context";

const App = () => {
  return (
    <UserProvider>
      <div className="App">
        <Route path="/" exact component={Homepage} />
        <Route path="/play" exact component={Game} />
      </div>
    </UserProvider>
  );
};

export default App;
