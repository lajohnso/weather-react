import React from "react";

import Form from "./components/form/Form";
import Weather from "./components/weather/Weather";
import Titles from "./components/titles/Titles";


const API_KEY = "a4451a98f72e5044e5d46ec974d2b9f4";

{/* COMMENTS!
  - Unique API Key from openweathermap.org
  - set default state on data as undefined
  - creates a json object from data, and writes to variables
  - write to components, and let weather access state
  */}
class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    rain: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    console.log(data);
    if (city && country) {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        wind: data.wind.speed,
        description: data.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        wind: undefined,
        description: undefined,
        error: "Please enter the values!"
      });
    }
  }
  reset = async (e) =>{
    e.preventDefault();
    this.setState({
      temperature: undefined,
      city: undefined,
      country: undefined,
      wind: undefined,
      description: undefined,
      error: "Please enter the values!"
    });

  }
  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-sm-5 title-container">
                  <Titles />
                </div>
                <div className="col-sm-7 form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather
                    temperature={this.state.temperature}
                    wind={this.state.wind}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                    reset={this.reset}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
