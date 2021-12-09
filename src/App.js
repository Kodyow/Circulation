import react, { Component } from "react";
import { Navbar } from "./components/Navbar";

class App extends Component {
  state = {
    data: null
  };
  

  render () {
    return (
      <div className="App">
        <Navbar />
      </div>
    );
  }
}

export default App;