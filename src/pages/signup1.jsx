import React, { useState } from 'react';
import Input from '@mui/joy/Input';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Navbar from '../components/navbar/Navbar';
import 'antd/dist/reset.css';
import { DatePicker } from 'antd';
import { Collapse } from '@mui/material';
import countries from '../countries';
import app from '../base';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { useHistory } from 'react-router-dom';

const Signup1 = () => {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const history = useHistory();

  const [selectedDate, setSelectedDate] = useState(null);
  const [formattedBirthdate, setFormattedBirthdate] = useState('');
  const [countryOpen, setCountryOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [currentSection, setCurrentSection] = useState(0);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date ? date.format('YYYY-MM-DD') : '';
    setFormattedBirthdate(formattedDate);
  };

  const toggleCountryList = () => {
    setCountryOpen(!countryOpen);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value) {
      setFilteredCountries(countries.filter((country) => country.name.toLowerCase().includes(event.target.value.toLowerCase())));
    } else {
      setFilteredCountries(countries);
    }
  };

  const [firstname, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userId = user.uid;
      const userRef = doc(db, 'users', userId);

      const userData = {
        firstname,
        lastname,
        birthdate: new Date(formattedBirthdate),
        address,
        city,
        zipCode,
        country,
        phoneNumber,
        email,
      };

      await setDoc(userRef, userData);
      console.log('User information saved successfully!');
      history.push('/');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
    } catch (error) {
      console.error('Error signing up with Google:', error);
    }
  };

  const handleFacebookSignUp = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
    } catch (error) {
      console.error('Error signing up with Facebook:', error);
    }
  };

  const sections = [
    (
      <div key={0}>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '16px' }}>
          <Input
            value={firstname}
            onChange={(e) => setName(e.target.value)}
            className="inputFirstName"
            name="firstname"
            type="text"
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
              justifyContent: 'center',
            }}
          />
          <Input
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            className="inputLastName"
            name="lastname"
            type="text"
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
              justifyContent: 'center',
            }}
          />
        </div>
        <Input
          value={email}
          onChange={(e) => setemail(e.target.value)}
          className="inputEmail"
          name="email"
          type="email"
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
            color: '#FFF',
          }}
        />
        <DatePicker
          placeholder="Birth Date"
          selected={selectedDate}
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
            color: '#FFF',
          }}
        />
      </div>
    ),
    (
      <div key={1}>
        <Input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="inputAddress"
          name="address"
          type="text"
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
            color: '#FFF',
          }}
        />
        <Input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="inputCity"
          name="city"
          type="text"
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
            color: '#FFF',
          }}
        />
        <Input
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          className="inputZipCode"
          name="zipcode"
          type="number"
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
            color: '#FFF',
          }}
        />
        <div>
        <select
          style={{
            width: '100%',
            maxHeight: '150px',
            overflowY: 'auto',
            flexShrink: 0,
            borderRadius: '62px',
            border: '1px solid #FFF',
            padding: '0 16px',
            marginBottom: '16px',
            height: '42px',
            backgroundColor: 'transparent',
            color: '#FFF',
          }}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option style={{color: '#000'}} value="">Select a country</option>
          {filteredCountries.map((country) => (
          <option style={{color: '#000'}} key={country.code} value={country.code}>
            {country.name}
            </option>
            ))}
        </select>
            
          
        </div>
        <Input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
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
            color: '#FFF',
          }}
        />
      </div>
    ),
    (
      <div key={2}>
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="inputPassword"
          name="password"
          type="password"
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
            color: '#FFF',
          }}
        />
        <Input
          className="inputConfirmPassword"
          name="confirmpassword"
          type="password"
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
            color: '#FFF',
          }}
        />
        <Button
          variant="contained"
          type="submit"
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
      </div>
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
        backgroundImage: `url("/loginbackground.svg")`,
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
            onClick={handleFacebookSignUp}
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
            onClick={handleGoogleSignUp}
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
        <form onSubmit={handleSave}>
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
  );
};

export default Signup1;
