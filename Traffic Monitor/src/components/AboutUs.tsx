import React, {useEffect} from "react"; 

function AboutUs() {
  useEffect(() => {
    document.title = "About Us";
  })
  

  return (
    <div className="container fader">
      <h1>About Us</h1>
      <br />
      <p>
        Traffic Monitor is a simple web application for monitoring traffic in
        different locations. It is a React application, built with Vite and
        TypeScript. The application uses a REST API to store and retrieve data.
        The API is mocked using json-server.
      </p>
      <p>
        The application is fully responsive and works on all devices with a
        modern web browser. The application is also fully accessible and follows
        the best practices for web accessibility.
      </p>
      <p>
        The application is licensed under the MIT License. The source code is
        available on GitHub.
      </p>
    </div>
  );
}

export default AboutUs;
