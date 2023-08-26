import React, {useState, useRef} from 'react'
import Input from '@mui/joy/Input';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import Navbar from '../components/navbar/Navbar';
import 'antd/dist/reset.css'
import { DatePicker } from 'antd';
import { Collapse } from '@mui/material';
import TextField from '@mui/material';
import countries from '../countries';


const Signup1 = ()=> {
  
  const [selectedDate, setSelectedDate] = useState(null);
  const [countryOpen, setCountryOpen] = useState(false); // State for country list
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [currentSection, setCurrentSection] = useState(0);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const toggleCountryList = () => {
    setCountryOpen(!countryOpen);
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value) {
      setFilteredCountries(countries.filter(country => country.name.toLowerCase().includes(event.target.value.toLowerCase())));
    } else {
      setFilteredCountries(countries);
    }
  };
  const sections = [
    (
      <form key={0}>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '16px' }}>
          <Input
          className='inputFirstName'
          name='firstname'
          type='text'
          placeholder="First Name"
          style={{
            backgroundColor: 'transparent',
            color: '#FFF',
            width: '192px',
              height: '42px',
              flexShrink: 0,
              borderRadius: '62px',
              border: '1px solid #FFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
          }}
          />
          <Input
          className='inputLastName'
          name='lastname'
          type='text'
          placeholder="Last Name"
          style={{
            backgroundColor: 'transparent',
            color: '#FFF',
            width: '192px',
              height: '42px',
              flexShrink: 0,
              borderRadius: '62px',
              border: '1px solid #FFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
          }}
          />
          </div>
        <Input
          className='inputEmail'
          name='email'
          type='email'
          placeholder="Email"
          style={{
            width: '408px',
            height: '42px',
            flexShrink: 0,
            borderRadius: '62px',
            border: '1px solid #FFF',
            padding: '0 16px',
            marginBottom: '16px',
            backgroundColor: 'transparent',
            color: '#FFF'
          }}
        />
        
        <DatePicker
            placeholder="Birth Date"
            value={selectedDate}
            onChange={handleDateChange}
            inputStyle={{ color: '#FFF' }}
            style={{
              width: '408px',
              height: '42px',
              flexShrink: 0,
              borderRadius: '62px',
              border: '1px solid #FFF',
              padding: '20px 16px',
              marginBottom: '16px',
              backgroundColor: 'transparent',
              color: 'white',
            }}
          />
      </form>
    ),
    (
      <form key={1}>
        <Input
          className='inputAddress'
          name='address'
          type='text'
          placeholder="Address"
          style={{
            width: '408px',
            height: '42px',
            flexShrink: 0,
            borderRadius: '62px',
            border: '1px solid #FFF',
            padding: '0 16px',
            marginBottom: '16px',
            backgroundColor: 'transparent',
            color: '#FFF'
          }}
        />
        <Input
          className='inputCity'
          name='city'
          type='text'
          placeholder="City"
          style={{
            width: '408px',
            height: '42px',
            flexShrink: 0,
            borderRadius: '62px',
            border: '1px solid #FFF',
            padding: '0 16px',
            marginBottom: '16px',
            backgroundColor: 'transparent',
            color: '#FFF'
          }}
        />
        <Input
          className='inputZipCode'
          name='zipcode'
          type='number'
          placeholder="ZIP Code"
          style={{
            width: '408px',
            height: '42px',
            flexShrink: 0,
            borderRadius: '62px',
            border: '1px solid #FFF',
            padding: '0 16px',
            marginBottom: '16px',
            backgroundColor: 'transparent',
            color: '#FFF'
          }}
        />
        <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Button
          variant="contained"
          onClick={toggleCountryList}
          style={{
            flexShrink: 0,
          }}
        >
          Toggle Countries
        </Button>
        <Input
          fullWidth
          placeholder="Search for a country"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <Collapse in={countryOpen}>
        <div
          style={{
            width: '100%',
            maxHeight: '150px',
            overflowY: 'auto',
            marginTop: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        >
          <select>
            <option value="">Select a country</option>
            {filteredCountries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
      </Collapse>
    </div>
      <Input
        placeholder="Phone Number"
        type="tel"
        style={{
          width: '408px',
          height: '42px',
          flexShrink: 0,
          borderRadius: '62px',
          border: '1px solid #FFF',
          padding: '0 16px',
          marginBottom: '16px',
          backgroundColor: 'transparent',
          color: '#FFF'
        }}
      />
      </form>
    ),
    (
      <form key={2}>
        <Input
      className='inputPassword'
      name='password'
      type='password'
      placeholder="Password"
      style={{
        width: '408px',
        height: '42px',
        flexShrink: 0,
        borderRadius: '62px',
        border: '1px solid #FFF',
        padding: '0 16px',
        marginBottom: '16px',
        backgroundColor: 'transparent',
        color: '#FFF'
      }}
    />
    <Input
      className='inputConfirmPassword'
      name='confirmpassword'
      type='password'
      placeholder="Confirm Password"
      style={{
        width: '408px',
        height: '42px',
        flexShrink: 0,
        borderRadius: '62px',
        border: '1px solid #FFF',
        padding: '0 16px',
        marginBottom: '16px',
        backgroundColor: 'transparent',
        color: '#FFF'
      }}
    />
        <Button
          variant="contained"
          type='submit'
          style={{
            width: '110.586px',
            height: '42.162px',
            flexShrink: 0,
            borderRadius: '62px',
            background: '#F1870C',
          }}
        >
          Sign Up
        </Button>
      </form>
    ),
  ];
  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };
  return (
    <div
      style={{
        backgroundImage: `url("/loginbackground.svg")`, // Update the path if needed
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Navbar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '16px' }}>
          <Button
            variant="contained"
            //onClick={}
            style={{
              width: '192px',
              height: '42px',
              flexShrink: 0,
              borderRadius: '62px',
              border: '1px solid #F1870C',
              background: '#F1870C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img src="/facebookicon.svg" alt="" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
            <span
              style={{
                color: '#FFF',
                fontFamily: 'Trispace',
                fontSize: '12px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: 'normal',
              }}
            >
              Sign Up with Facebook
            </span>
          </Button>
          <Button
            variant="contained"
            //onClick={handleGoogleLogin}
            style={{
              width: '192px',
              height: '42px',
              flexShrink: 0,
              borderRadius: '62px',
              border: '1px solid #F1870C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
            }}
          >
            <img src="/gmailicon.svg" alt="" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
            <span
              style={{
                color: '#FFF',
                fontFamily: 'Trispace',
                fontSize: '12px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: 'normal',
              }}
            >
              Sign Up with Gmail
            </span>
          </Button>
          <Button
            variant="contained"
            style={{
              width: '192px',
              height: '42px',
              flexShrink: 0,
              borderRadius: '62px',
              border: '1px solid #F1870C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
            }}
          >
            <img src="/appleicon.svg" alt="" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
            <span
              style={{
                color: '#FFF',
                fontFamily: 'Trispace',
                fontSize: '12px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: 'normal',
                background: 'transparent',
              }}
            >
              Sign Up with Apple
            </span>
          </Button>
        </div>
        <Divider
            style={{
              width: '192px',
              marginTop: '20px',
              backgroundColor: '#F1870C',
            }}
          />
          <Typography
            variant="body1"
            sx={{
              color: '#F1870C',
              fontFamily: 'Mulish',
              fontSize: '16.518px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'normal',
              margin: '8px 0',
            }}
          >
            Or
          </Typography>
        <Divider style={{ width: '100%', margin: '24px 0' }} />
        <form /*</div>onSubmit={handleLogin}*/>
        <div style={{ textAlign: 'center' }}>{sections[currentSection]}</div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
        <Button variant="contained" onClick={handlePrevious} disabled={currentSection === 0}>
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={currentSection === sections.length - 1}
        >
          {currentSection === sections.length - 1 ? 'Sign Up' : 'Next'}
        </Button>
          
      </div>
        </form>
        
      </div>
    </div>
  )
}

export default Signup1;