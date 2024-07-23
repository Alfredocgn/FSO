import axios from 'axios'
import {useState,useEffect} from 'react'


const App = () => {
  const [query,setQuery] = useState('')
  const [results,setResults] = useState([])
  const [allCountries,setAllCountries]= useState([])
  const [weather,setWeather] = useState(null)
  const [selectedCountry,setSelectedCountry] = useState(null)

  // const weatherUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`

  const API_WEATHER = import.meta.env.VITE_API_WEATHER


  useEffect(()=> {
    const fetchResults = async () => {
      try{
        const response = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        setAllCountries(response.data)
      }catch(error){
        console.log(error)
      }
    }
    fetchResults()

  },[])

useEffect(() => {
  if(query.trim() === ''){
    setResults([])
    setWeather(null)
  return

  }
  const filteredResults = allCountries.filter(country => country.name.common.toLowerCase().includes(query.toLocaleLowerCase()))
  setResults(filteredResults)
  setSelectedCountry(null)
  setWeather(null)

},[query,allCountries])


const handleInputChange = (e) => {
  setQuery(e.target.value)
}

const handleClickShowButton = (name) => {

  setQuery(name)
  setSelectedCountry(name)
}
useEffect(()=> {
  if(selectedCountry){
    const fetchWeather = async () =>{
      try{
        const country = allCountries.find(country =>country.name.common === selectedCountry)
        const capital = country.capital
        const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_WEATHER}`)

        setWeather(weatherData.data)

      }catch(error){
        console.log(error)
      }
    }
    fetchWeather()
  }
},[selectedCountry,allCountries])

useEffect(()=> {
  if(results.length === 1){
    const country = results[0]
    setSelectedCountry(country.name.common)
  } 
},[results])


  return (
    <>
    <h3>find countries<input type="text"  value={query} onChange={handleInputChange}/></h3>
    <ul>

      {results.length >= 10 ? 'Too many matches specify another filter': results.length === 1 ? results.map((result) => {
        return(
          <div key={result.cca3}>
            <h2>{result.name.common}</h2>
            <p>capital:{result.capital}</p>
            <p>area:{result.area}</p>
            <h3>Languages</h3>
            <p>{Object.values(result.languages).map((lang,index) => {
              return(
                <li key={index}>{lang}</li>
              )
            })}</p>
            <img src={result.flags.svg} alt="flag" />
            {
              weather && (
                <>
                  <h2>Weather in {result.capital}</h2>
                  <p>temperature: {weather.main.temp} Celsius</p>
                  <p>wind: {weather.wind.speed} m/s</p>
                  <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="" />
                </>
              )
            }
          </div>
          
        )
      }) : results.map((result) => {
        return(
          <li key={result.cca3}>{result.name.common} <button onClick={() => handleClickShowButton(result.name.common)}>show</button></li>
        )
      })}
    </ul>
    
    </>
  )
}

export default App
