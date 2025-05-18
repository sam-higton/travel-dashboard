interface WeatherResponse {
    current: {
      temperature_2m: number;
      weather_code: number;
    };
  }
  
  interface WeatherResult {
    temperature: number;
    status: string;
  }

  interface ForecastResponse {
    daily: {
      time: string[];
      temperature_2m_max: number[];
      temperature_2m_min: number[];
      weather_code: number[];
    };
  }
  
  interface DailyForecast {
    date: string;
    maxTemperature: number;
    minTemperature: number;
    status: string;
  }
  
  interface WeeklyForecastResult {
    location: string;
    forecast: DailyForecast[];
  }
  
  /**
   * Gets the current weather for a specified location
   * @param location - Location in format 'Country/City' (e.g. 'Australia/Perth')
   * @returns Promise with temperature and weather status
   */
  export async function currentWeather(location: string): Promise<WeatherResult> {
    try {
      // Parse the location into coordinates (simplified for demo)
      // In production, you'd use a geocoding service or lookup table
      let latitude: number;
      let longitude: number;
      
      // Default coordinates for Perth, Australia
      if (location === 'Australia/Perth') {
        latitude = -31.9523;
        longitude = 115.8613;
      } else if (location === 'Europe/London') {
        latitude = 51.5074;
        longitude = -0.1278;
      } else {
        throw new Error(`Location not supported: ${location}`);
      }
      
      // Build Open-Meteo API URL
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`;
      
      // Fetch weather data
      const response = await fetch(url, {next: {revalidate: 30 * 60}});
      
      if (!response.ok) {
        throw new Error(`Weather API responded with status: ${response.status}`);
      }
      
      const data = await response.json() as WeatherResponse;
      
      // Convert weather code to status string
      const status = weatherCodeToStatus(data.current.weather_code);
      
      return {
        temperature: data.current.temperature_2m,
        status
      };
    } catch (error) {
      console.error('Error fetching weather:', error);
      throw error;
    }
  }
  
  /**
   * Converts WMO weather codes to human-readable status
   * @param code - WMO weather code
   * @returns Weather status string
   */
  function weatherCodeToStatus(code: number): string {
    // WMO Weather interpretation codes (https://open-meteo.com/en/docs)
    switch (true) {
      case code === 0:
        return 'clear';
      case code === 1:
        return 'mostly clear';
      case code === 2:
        return 'partly cloudy';
      case code === 3:
        return 'cloudy';
      case code >= 45 && code <= 48:
        return 'foggy';
      case code >= 51 && code <= 67:
        return 'rainy';
      case code >= 71 && code <= 77:
        return 'snowy';
      case code >= 80 && code <= 82:
        return 'rainy';
      case code >= 85 && code <= 86:
        return 'snowy';
      case code >= 95 && code <= 99:
        return 'thunderstorm';
      default:
        return 'unknown';
    }
  }

  /**
 * Gets a 7-day weather forecast for a specified location
 * @param location - Location in format 'Country/City' (e.g. 'Australia/Perth')
 * @returns Promise with 7-day forecast data
 */
export async function weeklyForecast(location: string): Promise<WeeklyForecastResult> {
    try {
      // Parse the location into coordinates
      let latitude: number;
      let longitude: number;
      
      // Define coordinates for supported locations
      if (location === 'Australia/Perth') {
        latitude = -31.9523;
        longitude = 115.8613;
      } else if (location === 'Europe/London') {
        latitude = 51.5074;
        longitude = -0.1278;
      } else {
        throw new Error(`Location not supported: ${location}`);
      }
      
      // Build Open-Meteo API URL for 7-day forecast
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7`;
      
      // Fetch forecast data
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Weather API responded with status: ${response.status}`);
      }
      
      const data = await response.json() as ForecastResponse;
      
      // Process the daily forecast data
      const forecast: DailyForecast[] = data.daily.time.map((date, index) => {
        return {
          date: formatDate(date),
          maxTemperature: data.daily.temperature_2m_max[index],
          minTemperature: data.daily.temperature_2m_min[index],
          status: weatherCodeToStatus(data.daily.weather_code[index])
        };
      });
      
      return {
        location,
        forecast
      };
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw error;
    }
  }
  
  /**
   * Formats date string from API (YYYY-MM-DD) to a more readable format
   * @param dateStr - Date string in YYYY-MM-DD format
   * @returns Formatted date string
   */
  function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  }
  
  
  // Example usage
  // currentWeather('Australia/Perth').then(console.log).catch(console.error);