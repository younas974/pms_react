import React, {FC} from 'react';
import { WeatherData } from '../store/types';


interface WeatherProps {
    data: WeatherData;
}

const Weather: FC<WeatherProps> =({data}) =>{

    const fahrenhit = (data.main.temp * 1.8 -459.67).toFixed(2);
    const celsius = (data.main.temp -273.15).toFixed(2);

    return(
        <section className="section">
            <div> younas change</div>
            <div className="container">
                <h1 className="title has-text-cetnered" style={{marginBottom: 50}}></h1>
                <div className="level" style={{alignItems: 'flext-start'}}>
                    <div className="level-item has-text-centered">
                        <div>   
                            <p className="heading">{data.weather[0].dispcription}</p>
                            <p className="title"> <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}`} /></p>
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading">temp</p>
                            <div className="title">
                                <p className="mb-2">{data.main.temp}K</p>
                                <p className="mb-2">{fahrenhit}<sup>&#8457;</sup></p>
                                <p className=""> {celsius} <sup>&#8451;</sup></p>
                            </div>
                        </div>
                    </div>

                    <div className="level-item has-text-centered">
                        <p className="heading">humidity</p>
                        <p className="title">{data.main.humidety}</p>
                    </div>
                    <div className="level-item has-text-centered"> 
                        <div>
                            <p className="heading">
                                pressure
                            </p>
                            <p className="title">{data.main.pressure}</p>
                        </div>
                    </div>
                    <div className="level-item has-text-centered"> 
                        <div>
                            <p className="heeading">
                                wind
                            </p>
                            <p className="title">{data.wind.speed} m/s</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Weather;
