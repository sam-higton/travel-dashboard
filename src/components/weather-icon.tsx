import 'weather-icons/css/weather-icons.min.css';
export default function WeatherIcon({status}:{status:string}) {
    switch(status) {
        case 'clear': return <i className="wi wi-day-sunny"></i>;
        case 'mostly clear': return <i className="wi wi-day-cloudy"></i>;
        case 'partly cloudy': return <i className="wi wi-day-cloudy"></i>;
        case 'cloudy': return <i className="wi wi-cloudy"></i>;
        case 'foggy': return <i className="wi wi-fog"></i>;
        case 'rainy': return <i className="wi wi-rain"></i>;
        case 'snowy': return <i className="wi wi-snow"></i>;
        case 'thunderstorm': return <i className="wi wi-thunderstorm"></i>;

        default: return <i className="wi wi-na"></i>
    }
}