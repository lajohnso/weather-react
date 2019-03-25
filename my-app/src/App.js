import React, { Component } from 'react';
import './App.css';

import Titles from "./components/titles/Titles";
import Weather from "./components/weather/Weather";
import Form from "./components/form/Form";

const API_KEY='64da1e7f72052e7504bc10ca37da2af6';

class App extends Component {
  getWeather = async (e) => {
    e.preventDefault();
    const city=e.target.elemtents.city.value;
    const country=e.target.elemtents.country.value;
    const api_call=await fetch(`https://openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}
      &units=metrics`);
    const data = await api_call.json();
    console.log(data);
  }
  render() {
    return (
      <div>
        <Titles />
        <Weather />
        <p>Find out weather, temperatures and more...</p>
        <Form getWeather={this.getWeather}/>

      </div>
    );
  }
}

export default App;
