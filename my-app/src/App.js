import React, { Component } from 'react';
import './App.css';

import Titles from "./components/titles/Titles";
import Weather from "./components/weather/Weather";
import Form from "./components/form/Form";

const API_KEY='a4451a98f72e5044e5d46ec974d2b9f4';

class App extends Component {

  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined

  }


  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();

    if (city && country){
    console.log(data);

    this.setState({
      temperature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      error:""

    })
  }
  else{
    this.setState({
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error:"Please enter the values!"
  })
}
}
  render() {
    return (
      <div>
        <Titles />
        <p>Find out weather, temperatures and more...</p>
        <Form getWeather={this.getWeather}/>
        <Weather
        temperature={this.state.temperature}
        city={this.state.city}
        country={this.state.country}
        humidity={this.state.humidity}
        description={this.state.description}
        error={this.state.error}
        />


      </div>
    );
  }
}

export default App;
