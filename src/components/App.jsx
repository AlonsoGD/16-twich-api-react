import React from "react";
import Title from "./Title";
import Legend from "./Legend";

class App extends React.Component {
  render() {
    return (
      <>
        <header>
          <Title />
        </header>
        <div style={{ textAlign: "center" }}>
          <Legend status="Online" />
          <Legend status="Offline" />
        </div>
      </>
    );
  }
}

export default App;
