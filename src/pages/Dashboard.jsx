import React from 'react';
import Navbar2 from '../components/navbar/Navbar2';
import {} from '@mui/material';
import Typography from '@mui/material/Typography';
import Chart from 'react-apexcharts';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
    const history = useHistory();
    const options = {
        chart: {
          id: 'basic-line-chart'
        },
        xaxis: {
          categories: ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5']
        }
      };
      const series = [
        {
          name: 'Scores',
          data: [30, 40, 45, 50, 49]
        }
      ];

  return (
    <div
      style={{
        backgroundImage: `url("/loginbackground.svg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100vh',
      }}
    >
      <Navbar2 />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ width: '309px', height: '284px', flexShrink: 0, border: '1px solid rgba(255, 255, 255, 0.00)', background: '#001F70',cursor: 'pointer', }}>
      <Typography 
            style={{
              color: '#FFF',
              textAlign: 'center',
              fontFamily: 'Mulish',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: 'normal',
              textTransform: 'uppercase'
            }}
          >
            Average Score
          </Typography>
          <Typography 
            style={{
              color: '#F1870C',
              fontFamily: 'Mulish',
              fontSize: '32px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: 'normal',
              textTransform: 'uppercase'
            }}
          >
            40%
          </Typography>
          <Typography 
            style={{
              color: '#FFF',
              textAlign: 'center',
              fontFamily: 'Mulish',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: 'normal',
              textTransform: 'uppercase'
            }}
          >
            Questions Seen
          </Typography>
          <Typography 
            style={{
              color: '#F1870C',
              fontFamily: 'Mulish',
              fontSize: '32px',
              fontStyle: 'normal',
              fontWeight: 700,
              lineHeight: 'normal',
              textTransform: 'uppercase'
            }}
          >
            22%
          </Typography>
          <Typography 
            style={{
              color: '#FFF',
              fontFamily: 'Mulish',
              fontSize: '15px',
              fontStyle: 'normal',
              fontWeight: 300,
              lineHeight: 'normal',
              textTransform: 'uppercase'
            }}
          >
            Last 25 scores achieved on completed tests
          </Typography>
      </div>
      <div style={{ width: '1034px', height: '284px', flexShrink: 0, border: '1px solid rgba(255, 255, 255, 0.00)', background: '#6F77A7' }}>
        <Chart options={options} series={series} type="line" width="100%" height="100%" />
      </div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '25px' }}>
      <div style={{ width: '309px', height: '109px', flexShrink: 0, background: '#001F70', borderLeft: '3px solid #F1870C', marginRight:"30px",cursor: 'pointer', }}>
        <Typography
          style={{
            color: '#FFF',
            textAlign: 'center',
            fontFamily: 'Mulish',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 800,
            lineHeight: 'normal',
            textTransform: 'uppercase',
          }}
        >
          New Test
        </Typography>
        <Typography
          style={{
            color: '#FFF',
            fontFamily: 'Mulish',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal',
            textTransform: 'capitalize',
          }}
        >
          Create a study or exam test
        </Typography>
      </div>
      <div style={{ width: '309px', height: '109px', flexShrink: 0, background: '#001F70', borderLeft: '3px solid #F1870C', marginRight:"30px",cursor: 'pointer', }}>
        <Typography
          style={{
            color: '#FFF',
            textAlign: 'center',
            fontFamily: 'Mulish',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 800,
            lineHeight: 'normal',
            textTransform: 'uppercase',
          }}
        >
          Saved Tests
        </Typography>
        <Typography
          style={{
            color: '#FFF',
            fontFamily: 'Mulish',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal',
            textTransform: 'capitalize',
          }}
        >
          Create a study or exam test
        </Typography>
      </div>
      <div style={{ width: '309px', height: '109px', flexShrink: 0, background: '#001F70', borderLeft: '3px solid #F1870C', marginRight:"30px",cursor: 'pointer', }}>
        <Typography
          style={{
            color: '#FFF',
            textAlign: 'center',
            fontFamily: 'Mulish',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 800,
            lineHeight: 'normal',
            textTransform: 'uppercase',
          }}
        >
          Search
        </Typography>
        <Typography
          style={{
            color: '#FFF',
            fontFamily: 'Mulish',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal',
            textTransform: 'capitalize',
          }}
        >
          Create a study or exam test
        </Typography>
      </div>
      <div style={{ width: '309px', height: '109px', flexShrink: 0, background: '#001F70', borderLeft: '3px solid #F1870C', marginRight:"30px",cursor: 'pointer', }}>
        <Typography
          style={{
            color: '#FFF',
            textAlign: 'center',
            fontFamily: 'Mulish',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 800,
            lineHeight: 'normal',
            textTransform: 'uppercase',
          }}
        >
          Reports
        </Typography>
        <Typography
          style={{
            color: '#FFF',
            fontFamily: 'Mulish',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal',
            textTransform: 'capitalize',
          }}
        >
          Create a study or exam test
        </Typography>
      </div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '25px' }}>
  <div style={{ width: '654px', height: '95px', flexShrink: 0, borderRadius: '12px', background: '#F1870C',cursor: 'pointer', }}>
    <Typography
      style={{
        color: '#FFF',
        textAlign: 'center',
        fontFamily: 'Mulish',
        fontSize: '20px',
        fontStyle: 'normal',
        fontWeight: 800,
        lineHeight: 'normal',
        textTransform: 'uppercase',
      }}
    >
      Overview
    </Typography>
  </div>
  <div style={{ width: '654px', height: '95px', flexShrink: 0, borderRadius: '12px', background: '#F1870C', marginLeft: '30px',cursor: 'pointer', }}>
    <Typography
      style={{
        color: '#FFF',
        textAlign: 'center',
        fontFamily: 'Mulish',
        fontSize: '20px',
        fontStyle: 'normal',
        fontWeight: 800,
        lineHeight: 'normal',
        textTransform: 'uppercase',
      }}
    >
      Most Viewed
    </Typography>
  </div>
</div>
<div style={{ display: 'flex', flexDirection: 'row', marginTop: '25px' }}>
  {/* First set of divs */}
  <div style={{ display: 'flex', flexWrap: 'wrap', width: '654px' }}>
        {[
          { text: 'My Profile', route: '/profile' },
          { text: 'Reset Flags', route: '/reset-flags' },
          { text: 'Give Feedback', route: '/contact' },
          { text: 'Annexes', route: '/annexes' },
          { text: 'News', route: '/home' },
          { text: 'Contact', route: '/contact' },
        ].map((item, index) => (
          <div
            key={index}
            style={{
              width: 'calc(33.33% - 20px)', // 3 columns with 20px margin between them
              height: '121px',
              flexShrink: 0,
              background: '#001F70',
              margin: '0 20px 20px 0', // 20px margin between columns, 20px margin below rows
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily: 'Mulish',
              fontSize: '16px',
              color: '#FFF',
              cursor: 'pointer',
            }}
            onClick={() => history.push(item.route)} // Use navigate to go to the specified route
          >
            {item.text}
          </div>
        ))}
      </div>

  {/* Margin between sets of divs */}
  <div style={{ width: '10px' }}></div>

  {/* Second set of divs */}
  <div style={{ display: 'flex', flexDirection: 'column',cursor: 'pointer', }}>
  {[
    { topText: 'Settings', bottomText: 'update ur settings on this page', route: '/profile' },
    { topText: 'My Comments', bottomText: 'your saved comments', route: '/comments' },
    { topText: 'My Notes', bottomText: 'ur saved notes', route: '/notes' },
  ].map((textObj, index) => (
    <div
      key={index}
      style={{
        width: '290px',
        height: '121px',
        flexShrink: 0,
        background: '#9B9EB5',
        marginBottom: '25px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
      onClick={() => history.push(textObj.route)}
    >
      <div
        style={{
          color: '#312783',
          fontFamily: 'Mulish',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: 800,
          textTransform: 'uppercase',
        }}
      >
        {textObj.topText}
      </div>
      <div
        style={{
          color: '#FFF',
          fontFamily: 'Mulish',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: 700,
          textTransform: 'capitalize',
        }}
      >
        {textObj.bottomText}
      </div>
    </div>
  ))}
  </div>

  {/* Second div inside the second set of divs */}
  <div style={{ width: '290px', height: '465px', flexShrink: 0, background: '#9B9EB5', marginLeft: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
  <div
    style={{
      color: '#312783',
      fontFamily: 'Mulish',
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: 800,
      textTransform: 'uppercase',
    }}
  >
    The Last Saved Tests
  </div>
  <div>
    {/* List of saved tests (replace with actual data from Firebase) */}
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      <li>
        <span
          style={{
            color: '#FFF',
            fontFamily: 'Mulish',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 700,
            textTransform: 'uppercase',
          }}
        >
          Test 1
        </span>
        <span
          style={{
            color: '#FFF',
            fontFamily: 'Mulish',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 700,
            textTransform: 'uppercase',
          }}
        >
          - Date 1
        </span>
      </li>
      <li>
        <span
          style={{
            color: '#FFF',
            fontFamily: 'Mulish',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 700,
            textTransform: 'uppercase',
          }}
        >
          Test 2
        </span>
        <span
          style={{
            color: '#FFF',
            fontFamily: 'Mulish',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 700,
            textTransform: 'uppercase',
          }}
        >
          - Date 2
        </span>
      </li>
      {/* Add more list items as needed */}
    </ul>
  </div>
  <button
    style={{
      width: '259px',
      height: '41px',
      flexShrink: 0,
      borderRadius: '12px',
      background: '#F1870C',
      color: '#FFF',
      fontFamily: 'Mulish',
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: 700,
      textTransform: 'uppercase',
      border: 'none',
      cursor: 'pointer',
      marginTop: '20px',
    }}
    onClick={() => history.push('/alltests')}
  >
    All Saved Tests
  </button>
</div>

</div>
<div style={{ width: '1358px', height: '208px', flexShrink: 0, background: '#312783', marginTop:'20px' }}></div>
    </div>
  );
};

export default Dashboard;
