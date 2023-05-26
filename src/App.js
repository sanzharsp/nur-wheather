import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RiCelsiusFill, RiFahrenheitFill } from 'react-icons/ri';
import {
  TbMapSearch,
  TbMoon,
  TbSun,
  TbVolume,
  TbVolumeOff,
} from 'react-icons/tb';
import DetailsCard from './components/DetailsCard';
import SummaryCard from './components/SummaryCard';
import './languages/i18n';
import LakeBackground from './asset/lake-background.jpg';
import Astronaut from './asset/not-found.svg';
import SearchPlace from './asset/search.svg';
import BackgroundColor from './components/BackgroundColor';
import BackgroundImage from './components/BackgroundImage';
import Animation from './components/Animation';
import {UndoOutlined, AreaChartOutlined} from  '@ant-design/icons';
import axios from 'axios';
import Chart from './diagramm/diagramm'
import { useNavigate } from "react-router-dom";



function App() {

  let navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [noData, setNoData] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState();
  const [weatherIcon, setWeatherIcon] = useState(
    `https://openweathermap.org/img/wn/10n@2x.png`
  );
  const [currentLanguage, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });
  const [loading, setLoading] = useState(false);
  const [backgroundSoundEnabled, setBackgroundSoundEnabled] = useState(true);
  const [isFahrenheitMode, setIsFahrenheitMode] = useState(false);
  const degreeSymbol = useMemo(
    () => (isFahrenheitMode ? '\u00b0F' : '\u00b0C'),
    [isFahrenheitMode]
  );
  const [active, setActive] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [refreshing, setRereshing] = useState(false);


  
  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  // SETTING THEMES ACCORDING TO DEVICE
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setIsDark(true);
    }

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        setIsDark(event.matches);
      });
  }, [setIsDark]);

  const toggleDark = () => {
    setIsDark((prev) => !prev);
  };
  

  const activate = () => {
    setActive(true);
  };

  useEffect(() => {
    if (currentLanguage === 'en') return;

    changeLanguage(currentLanguage);

    // eslint-disable-next-line
  }, [currentLanguage]);

  const toggleFahrenheit = () => {
    setIsFahrenheitMode(!isFahrenheitMode);
  };

    // const handleChange = (input) => {
    //   const { value } = input.target;
    //   setSearchTerm(value);
    // };

  const handleSubmit = () => {
   
    getWeather(searchTerm);
  };

  const handleLanguage = (event) => {
    changeLanguage(event.target.value);
    localStorage.setItem('language', event.target.value);
  };

  const changeLanguage = (value, location) => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value) && getWeather(location))
      .catch((err) => console.log(err));
  };

  const getWeather = async (location) => {
    console.log(location)
    setLoading(true);
    setWeatherData([]);
    let how_to_search =
      typeof location === 'string'
        ? `q=${"Astana"}`
        : `lat=${51.134464}&lon=${71.4309632}`;


    try {

      axios.post( `https://nurweather.pythonanywhere.com/api/v1/weather`,{'how_to_learn':how_to_search}).
      then((res)=>{
        console.log(res.data);
        setWeatherData(res.data);

        setTimeout(() => {
          setLoading(false);
        }, 500);
        setCity(`${res.data.city.name}, ${res.data.city.country}`);
        setWeatherIcon(
          `${
            'https://openweathermap.org/img/wn/' + res.data.list[0].weather[0]['icon']
          }@4x.png`
        );
      }).catch((err)=>{
        console.log(err);
        setNoData('Location Not Found');
        setCity('Unknown Location');
        setTimeout(() => {
          setLoading(false);
        }, 500);
        return;
      })





    } catch (error) {
      setLoading(true);
      console.log(error);
    }
  };

  const myIP = (location) => {
  
    const { latitude, longitude } = location.coords;
    getWeather([latitude, longitude]);
  };

  // For the autocomplete search box- Places List
  const [countries,setCountries]=useState([]);
  const [countryMatch,setCountryMatch]=useState([]);

  useEffect(()=>{
    const loadCountries=async()=>{
      const response= await axios.get("https://restcountries.com/v3.1/all");
      let arr = []
      response.data.forEach(element => {
        arr.push(element.name.official);
      });
      setCountries(arr);
      console.log(arr);
    };

    loadCountries();
  }, []);

  // console.log(countries);

  const searchCountries=(input)=>{
      // const {value}=input.target;
      setSearchTerm(input);
      
      if(!input){                             // created if-else loop for matching countries according to the input
        setCountryMatch([]);
      }

      else{
      let matches=countries.filter((country)=>{
      // eslint-disable-next-line no-template-curly-in-string
      const regex=new RegExp(`${input}`,"gi");
      // console.log(regex)
      return country.match(regex) || country.match(regex);
    });
      setCountryMatch(matches);
    }
      // console.log(countryMatch);
  };

  // load current location weather info on load
  window.addEventListener('load', function () {
    navigator.geolocation.getCurrentPosition(myIP);
  });
  useEffect(()=>{handleSubmit()},[refreshing])



  return (
    <div className='container'>
      <div
        className='blur'
        style={{
          background: `${
            weatherData ? BackgroundColor(weatherData) : '#a6ddf0'
          }`,
          top: '-10%',
          right: '0',
        }}
      ></div>
      <div
        className='blur'
        style={{
          background: `${
            weatherData ? BackgroundColor(weatherData) : '#a6ddf0'
          }`,
          top: '36%',
          left: '-6rem',
        }}
      ></div>
      <div className='content'>
        <div
          className='form-container'
          style={{
            backgroundImage: `url(${
              weatherData ? BackgroundImage(weatherData) : LakeBackground
            })`,
          }}
        >
          <div className='name'>
            <Animation />
            <div className='toggle-container'>
              <input
                type='checkbox'
                className='checkbox'
                id='checkbox'
                checked={isDark}
                onChange={toggleDark}
              />
              <label htmlFor='checkbox' className='label'>
                <TbMoon
                  style={{
                    color: '#a6ddf0',
                  }}
                />
                <TbSun
                  style={{
                    color: '#f5c32c',
                  }}
                />
                <div className='ball' />
              </label>
            </div>
            <div className='city'>
              <TbMapSearch />
              <p>{"Astana, KZ"}</p>
            </div>
          </div>
          <div className='search'>
            <h2
              style={{
                marginRight: currentLanguage === 'es' || 'fr' ? '10px' : '0px',
              }}
            >
              {t('title')}
            </h2>
          
            <hr />

         
     
              <button className='s-icon'  onClick={() => setBackgroundSoundEnabled(() => setRereshing(!refreshing))}>
              <UndoOutlined size={45} />
        
              </button>

         
              <button
              className='s-icon sound-toggler'
              onClick={() => setBackgroundSoundEnabled((prev) => !prev)}
            >
              {backgroundSoundEnabled ? <TbVolume /> : <TbVolumeOff />}
            </button>
           
            <button
              className='s-icon sound-toggler'
              onClick={()=>{navigate("/charts", { replace: true });}}
            >
              <AreaChartOutlined />
            </button>
          </div>
       
        </div>
        <div className='info-container'>
          <div className='info-inner-container'>
            <select
              className='selected-language'
              defaultValue={currentLanguage}
              onChange={(e) => handleLanguage(e)}
            >
              <option selected value='kk'>
                Қазақ
              </option>
              <option value='es'>Español</option>
              <option value='fr'>Français</option>
              <option value='id'>Indonesia</option>
              <option value='ta'>தமிழ்</option>
              <option value='zh'>简体中文</option>
              <option value='ukr'>Ukrainian</option>
              <option value='es'>{t('languages.es')}</option>
              <option value='fr'>{t('languages.fr')}</option>
              <option value='id'>{t('languages.id')}</option>
              <option value='it'>{t('languages.it')}</option>
              <option value='ta'>{t('languages.ta')}</option>
              <option value='ru'>{t('languages.ru')}</option>
              <option value='bn'>{t('languages.bn')}</option>
              <option value='zh'>{t('languages.zh')}</option>
              <option value='ptBR'>{t('languages.ptBR')}</option>
              <option value='sw'>{t('languages.sw')}</option>
              <option value='neNP'>{t('languages.neNP')}</option>
              <option value='he'>{t('languages.he')}</option>
              <option value='hnd'>{t('languages.hnd')}</option>
            </select>
            <div className='toggle-container'>
              <input
                type='checkbox'
                className='checkbox'
                id='fahrenheit-checkbox'
                onChange={toggleFahrenheit}
              />
              <label htmlFor='fahrenheit-checkbox' className='label'>
                <RiFahrenheitFill />
                <RiCelsiusFill />
                <div className='ball' />
              </label>
            </div>
          </div>
          {loading ? (
            <div className='loader'></div>
          ) : (
            <span>
              {weatherData.length === 0 ? (
                <div className='nodata'>
                  <h1>{noData ?? t('no-data')}</h1>
                  {noData === 'Location Not Found' ? (
                    <>
                      <img
                        src={Astronaut}
                        alt='an astronaut lost in the space'
                      />
                      <p>Oh oh! We're lost in space finding that place.</p>
                    </>
                  ) : (
                    <>
                      <img
                        src={SearchPlace}
                        alt='a person thinking about what place to find'
                      />
                      <p style={{ padding: '20px' }}>
                      Уайымдамаңыз, не іздеу керектігін білмесеңіз, мына әрекетті орындап көріңіз:
                         Дакка, Канада немесе АҚШ болуы мүмкін.
                      </p>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <h1 className='centerTextOnMobile'>{t('today')}</h1>
                  <DetailsCard
                    weather_icon={weatherIcon}
                    data={weatherData}
                    soundEnabled={backgroundSoundEnabled}
                    isFahrenheitMode={isFahrenheitMode}
                    degreeSymbol={degreeSymbol}
                  />
                  <h1 className='title centerTextOnMobile'>
                    {t('more-on')} {"Astana, KZ"}
                  </h1>
                  <ul className='summary'>
                    {weatherData.list.map((days, index) => (
                      <SummaryCard
                        key={index}
                        day={days}
                        isFahrenheitMode={isFahrenheitMode}
                        degreeSymbol={degreeSymbol}
                      />
                    ))}
                  </ul>
                </>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
