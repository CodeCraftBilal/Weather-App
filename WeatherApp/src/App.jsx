import { useState, useEffect } from 'react'
import './App.css'

function App() {

  useEffect(() => {
    document.title = "Weather App";
  }, []);

  const [region, setRegion] = useState('Mianwali')
  const [weather, setWeather] = useState({})
  const [errors, setErrors] = useState({})
  const [iserror, setIsError] = useState(false)

  const handleChange = (e) => {
    setRegion(e.target.value);
    console.log('Handle Change region', region)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiKey = '8e09b73b4635404798774513250303';
    const city = region;
    const days = 5;
    const url = `https://api.weatherapi.com/v1/forecast.json?days=${days}&key=${apiKey}&q=${city}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setIsError(false);
      if (data.error) {
        console.log('Error: ', data.error.message);
        setIsError(true);
        setErrors(data.error.message);
        return;
      }
      console.log(data);
      setWeather(data);
    } catch (error) {
      console.log(error);
    }
  }



  const weatherDetails = [
    { key: 'Feels like', value: weather.current ? `${weather.current.feelslike_c}°C` : 'N/A' },
    { key: 'Wind', value: weather.current ? `${weather.current.wind_kph} kph` : 'N/A' },
    { key: 'Pressure', value: weather.current ? `${weather.current.pressure_mb} mb` : 'N/A' },
    { key: 'Precipitation', value: weather.current ? `${weather.current.precip_mm} mm` : 'N/A' },
    { key: 'Visibility', value: weather.current ? `${weather.current.vis_km} km` : 'N/A' },
    { key: 'UV Index', value: weather.current ? weather.current.uv : 'N/A' }
  ];

  const forcastdays = weather.forecast ? weather.forecast.forecastday : [];
  console.log('Forcast', forcastdays);

  return (
    <>
      <div className='w-[100%] h-[100vh] mt-0 bg-[url(./assets/clouds.jpg)] bg-no-repeat bg-cover max-md:flex-col'>

        <form onSubmit={handleSubmit} className='p-2 text-white mt-0 flex items-center justify-center gap-1'>

          <input onChange={handleChange} value={region} name='region' type="text" placeholder='Select Region' className='border-2 border-white rounded-xl p-2' />
          <button type='submit' className='border-2 border-white hover:bg-green-400 transition-all hover:cursor-pointer p-2 rounded-xl'>Submit</button>
          {/* {iserror && <span className='text-red-500'>Error: {errors}</span>} */}
        </form>

        {iserror && <div className='bg-red-500 text-white p-2 text-center'>Error: {errors}</div>}

        <div className="bg-black/50 backdrop-blur-md top w-[80%] text-white flex justify-between p-10 m-auto h-28 mt-10 rounded-2xl text-2xl items-center max-md:w-[90%]">
          <div className="left flex flex-col gap-2">
            <h1>{weather.location ? weather.location.name : 'City'}</h1>
            <h1>{weather.current ? `${weather.current.temp_c}°C` : 'Temp'}</h1>
          </div>
          <div className="right flex flex-col gap-2">
            <h1>{weather.current ? weather.current.condition.text : 'Sun Pos'}</h1>
            <h1>humidity: {weather.current ? weather.current.humidity : 'humidity'}</h1>
          </div>
        </div>

        <div className="details m-auto w-[80%] mt-8 flex justify-between max-md:flex-col max-md:gap-10 max-md:w-[97%]">

          <div className='w-[42%] h-72 max-md:w-full'>
            <h1 className='text-2xl font-bold text-white'>Weather details</h1>
            <div className='bg-black/50 backdrop-blur-md w-full h-full bg-opacity-75 grid grid-rows-2 grid-cols-3 gap-2 p-2'>
              {weatherDetails.map((detail, index) => (
                <div key={index} className="card bg-black h-[110px] w-[120px] flex items-center justify-center text-white gap-1 flex-col rounded-xl">
                  <span>{detail.key}</span>
                  <span>{detail.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className='w-[55%] h-72 max-md:w-full'>
            <h1 className='text-2xl font-bold text-white'>5-day weather forecast</h1>
            <div className='bg-black/50 backdrop-blur-md w-full h-full bg-opacity-75 flex gap-2 p-2 flex-col rounded-xl overflow-x-auto'>
              {
                forcastdays.map((day, index) => {
                  return (
                    <div key={index} className='card bg-black h-[150px] w-full flex flex-col justify-between text-white gap-2 p-2 rounded-xl'>
                      <div className='flex justify-between'>
                        <div className='flex items-center gap-2'>
                          <img src={day.day.condition.icon} alt="" className='h-10 w-10' />
                          <span>{day.date}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <span>{day.day.maxtemp_c}°C</span>
                          <span>{day.day.mintemp_c}°C</span>
                        </div>
                      </div>
                      
                      <div className='flex justify-between'>
                        <div className='flex items-center gap-2'>
                          <img src={day.day.condition.icon} alt="" className='h-10 w-10' />
                          <span>Condition</span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <span>{day.day.condition.text}</span>
                        </div>
                      </div>

                      <div className='flex justify-between'>
                        <div className='flex items-center gap-2'>
                          <img src={day.day.condition.icon} alt="" className='h-10 w-10' />
                          <span>wind</span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <span>{day.day.maxwind_kph}kph</span>
                          <span>{day.day.maxwind_mph}mph</span>
                        </div>
                      </div>

                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>

      </div>

    </>
  )
}
export default App
