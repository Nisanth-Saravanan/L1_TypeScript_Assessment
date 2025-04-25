import React, {useEffect} from "react"; 

function Home() {
useEffect(() => {
  document.title = "Home";
})

  return (
    <div className="container fader">
      <h1>Welcome to Traffic Monitor</h1>
      <p>{`Welcome to Traffic Monitor, a simple app for monitoring traffic in different locations. ${
        Math.random() < 0.5
          ? "It's a great day to drive!"
          : "Be careful on the roads!"
      }`}</p>
      <br />
      <h4>What is Traffic Monitor?</h4>
      <p style={{ fontSize: "x-small" }}>
        Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus
        ex sapien vitae pellentesque sem placerat. In id cursus mi pretium
        tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
        Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis
        massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper
        vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra
        inceptos himenaeos.
      </p>
    </div>
  );
}

export default Home;
