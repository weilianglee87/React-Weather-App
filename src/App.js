import './App.css'
import TopButton from './components/TopButton'
import Inputs from './components/Inputs'
import TimeAndLocation from './components/TimeAndLocation'
import TemperatureAndDetails from './components/TemperatureAndDetails'
import Forecast from './components/Forecast'
import getFormattedWeatherData from './services/weatherService'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link, useLocation } from 'react-router-dom'
import { UilSetting } from '@iconscout/react-unicons'

function App() {
  const [query, setQuery] = useState({ q: '' })
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)

  const location = useLocation()
  const newquery = new URLSearchParams(location.search)
  const inputList = newquery.get('inputList')
    ? JSON.parse(decodeURIComponent(newquery.get('inputList')))
    : []

  useEffect(() => {
    if (!query.q) return
    const fetchWeather = async () => {
      const message = query.q ? query.q : 'current location'

      toast.info('Fetching weather for ' + message)
      try {
        await getFormattedWeatherData({ ...query, units }).then((data) => {
          toast.success(`Successfully fetched weather for ${data.country}.`)

          setWeather(data)
        })
      } catch (error) {
        toast.error(`Error fetching weather: ${error.message}`)
      }
    }
    fetchWeather()
  }, [query, units])

  const formatBackground = () => {
    if (!weather) return 'from-cyan-700 to-blue-700'
    const threshold = units === 'metric' ? 30 : 60
    if (weather.temp <= threshold) return 'from-cyan-700 to-blue-700'
    return 'from-yellow-700 to-orange-700'
  }

  return (
    <div
      className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to to-blue-700 h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <div className="flex items-center justify-around my-6 text-white text-lg font-medium ">
        <nav>
          <Link to={{ pathname: '/Userpage' }}>
            <UilSetting />
          </Link>
        </nav>
      </div>
      <TopButton setQuery={setQuery} inputList={inputList} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />
          <Forecast title="hourly forecast" items={weather.hourly} />
          <Forecast title="daily forecast" items={weather.daily} />
        </div>
      )}

      <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
    </div>
  )
}

export default App
