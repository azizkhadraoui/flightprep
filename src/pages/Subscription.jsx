import React from 'react';
import Navbar from '../components/navbar/Navbar';
import './contact.css';
import { Card } from '@mui/material';

const Subscription = () => {
    const cardStyle = {
        width: '400px',
        height: '514px',
        flexShrink: 0,
        marginRight: '20px', // Add spacing between cards
        marginBottom: '20px', // Add spacing vertically between cards
        borderRadius: '21px', // Rounded corners
        background: '#F1870C', // Background color
        boxShadow: '17px 17px 4px 0px rgba(0, 0, 0, 0.25)', // Box shadow
        // Add any other custom card styles here
      };
    
      const cardContentStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', // Full width of the card
        height: '100%', // Full height of the card
        flexShrink: 0,
        color: '#FFF',
        textAlign: 'center',
        textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        fontFamily: 'Mulish',
      };
    
      const buttonStyle = {
        color: '#F1870C',
        textAlign: 'center',
        fontFamily: 'Mulish',
        fontSize: '27px',
        fontStyle: 'normal',
        fontWeight: '1000',
        lineHeight: 'normal',
        width: '179px',
        height: '45px',
        flexShrink: 0,
        borderRadius: '31px',
        background: '#FFF',
      };

  const cardContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  };

  return (
    <div
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100vh',
      }}
    >
      <Navbar />
      <div>
        <h1>Choose Your Plan</h1>
      </div>
      <div style={{ ...cardContainerStyle, flexWrap: 'wrap' }}>
        <Card style={cardStyle}>
          <div style={cardContentStyle}>
            <h1 style={{ fontSize: '90px', fontWeight: '1000', lineHeight: 'normal' }}>$30</h1>
            <p style={{ fontSize: '27px', fontWeight: '600', lineHeight: 'normal', marginTop:'0px' }}>3 Months</p>
            <h5 style={{ color: '#312783', fontSize: '27px', fontWeight: '700', lineHeight: 'normal' }}>Subscription</h5>
            <p style={{ fontSize: '24px', fontWeight: '500', lineHeight: 'normal' }}>
              Subscription length 3 months<br />Full access to the latest questions<br />An up-to-date questions<br />Instant activation<br />Marked real exam questions
            </p>
            <button style={buttonStyle}>Subscribe</button>
          </div>
        </Card>
        <Card style={cardStyle}>
          <div style={cardContentStyle}>
            <h1 style={{ fontSize: '90px', fontWeight: '1000', lineHeight: 'normal' }}>$30</h1>
            <p style={{ fontSize: '27px', fontWeight: '600', lineHeight: 'normal', marginTop:'0px' }}>3 Months</p>
            <h5 style={{ color: '#312783', fontSize: '27px', fontWeight: '700', lineHeight: 'normal' }}>Subscription</h5>
            <p style={{ fontSize: '24px', fontWeight: '500', lineHeight: 'normal' }}>
              Subscription length 3 months<br />Full access to the latest questions<br />An up-to-date questions<br />Instant activation<br />Marked real exam questions
            </p>
            <button style={buttonStyle}>Subscribe</button>
          </div>
        </Card>
        <Card style={cardStyle}>
          <div style={cardContentStyle}>
            <h1 style={{ fontSize: '90px', fontWeight: '1000', lineHeight: 'normal' }}>$30</h1>
            <p style={{ fontSize: '27px', fontWeight: '600', lineHeight: 'normal', marginTop:'0px' }}>3 Months</p>
            <h5 style={{ color: '#312783', fontSize: '27px', fontWeight: '700', lineHeight: 'normal' }}>Subscription</h5>
            <p style={{ fontSize: '24px', fontWeight: '500', lineHeight: 'normal' }}>
              Subscription length 3 months<br />Full access to the latest questions<br />An up-to-date questions<br />Instant activation<br />Marked real exam questions
            </p>
            <button style={buttonStyle}>Subscribe</button>
          </div>
        </Card>
        <Card style={cardStyle}>
          <div style={cardContentStyle}>
            <h1 style={{ fontSize: '90px', fontWeight: '1000', lineHeight: 'normal' }}>$30</h1>
            <p style={{ fontSize: '27px', fontWeight: '600', lineHeight: 'normal', marginTop:'0px' }}>3 Months</p>
            <h5 style={{ color: '#312783', fontSize: '27px', fontWeight: '700', lineHeight: 'normal' }}>Subscription</h5>
            <p style={{ fontSize: '24px', fontWeight: '500', lineHeight: 'normal' }}>
              Subscription length 3 months<br />Full access to the latest questions<br />An up-to-date questions<br />Instant activation<br />Marked real exam questions
            </p>
            <button style={buttonStyle}>Subscribe</button>
          </div>
        </Card>
        <Card style={cardStyle}>
          <div style={cardContentStyle}>
            <h1 style={{ fontSize: '90px', fontWeight: '1000', lineHeight: 'normal' }}>$30</h1>
            <p style={{ fontSize: '27px', fontWeight: '600', lineHeight: 'normal', marginTop:'0px' }}>3 Months</p>
            <h5 style={{ color: '#312783', fontSize: '27px', fontWeight: '700', lineHeight: 'normal' }}>Subscription</h5>
            <p style={{ fontSize: '24px', fontWeight: '500', lineHeight: 'normal' }}>
              Subscription length 3 months<br />Full access to the latest questions<br />An up-to-date questions<br />Instant activation<br />Marked real exam questions
            </p>
            <button style={buttonStyle}>Subscribe</button>
          </div>
        </Card>
        <Card style={cardStyle}>
          <div style={cardContentStyle}>
            <h1 style={{ fontSize: '90px', fontWeight: '1000', lineHeight: 'normal' }}>$30</h1>
            <p style={{ fontSize: '27px', fontWeight: '600', lineHeight: 'normal', marginTop:'0px' }}>3 Months</p>
            <h5 style={{ color: '#312783', fontSize: '27px', fontWeight: '700', lineHeight: 'normal' }}>Subscription</h5>
            <p style={{ fontSize: '24px', fontWeight: '500', lineHeight: 'normal' }}>
              Subscription length 3 months<br />Full access to the latest questions<br />An up-to-date questions<br />Instant activation<br />Marked real exam questions
            </p>
            <button style={buttonStyle}>Subscribe</button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Subscription;
