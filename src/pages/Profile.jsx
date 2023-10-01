import React, { useState, useEffect } from 'react';
import Navbar2 from '../components/navbar/Navbar2';
import app from '../base';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { MdEdit } from 'react-icons/md'; // Import the edit icon as needed

const Profile = () => {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const user = auth.currentUser;

  // Define state variables for user data, edit mode, and form fields
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formFields, setFormFields] = useState({
    firstname: '',
    lastname: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    phoneNumber: '',
    // Add more fields here
  });

  // Handle file input for profile picture
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    // Upload the file to storage and update user profile picture
    // You can implement this part using Firebase Storage and update the user's document with the new URL.
  };

  // Function to toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Function to save changes to Firestore
  const saveChanges = async () => {
    try {
      // Update user profile information in Firestore
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, formFields);
      setUserData({ ...userData, ...formFields });
      toggleEditMode(); // Exit edit mode
      console.log('Profile information updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // Use useEffect to fetch user data when the component mounts
  useEffect(() => {
    if (user) {
      const userRef = doc(db, 'users', user.uid);

      getDoc(userRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            // Set user data to state
            setUserData(docSnap.data());
          } else {
            console.log('No user data found.');
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [user, db]);

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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          padding: '20px',
        }}
      >
        {/* Left Div - Profile Information */}
        <div
          style={{
            width: '45%',
            backgroundColor: '#EBEAEA',
            color: '#000',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h2>User Profile</h2>
          {/* Profile picture */}
          {editMode ? (
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
            />
          ) : (
            userData && (
              <img
                src={userData.profileImage || '/default-profile-pic.jpg'}
                alt="Profile"
                style={{ width: '150px', height: '150px', borderRadius: '50%' }}
              />
            )
          )}
          {/* Name */}
          <h3>{userData ? `${userData.firstname} ${userData.lastname}` : 'Loading...'}</h3>
        </div>

        {/* Right Div - Edit Profile */}
        <div
          style={{
            width: '55%',
            backgroundColor: '#FFF',
            color: '#000',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <h2>Edit Profile</h2>
          {/* First Name */}
          <div className="profile-field">
            <span className="profile-label">First Name:</span>
            {editMode ? (
              <input
                type="text"
                value={formFields.firstname || ''}
                onChange={(e) =>
                  setFormFields({ ...formFields, firstname: e.target.value })
                }
              />
            ) : (
              <span>{userData ? userData.firstname : 'Loading...'}</span>
            )}
            {editMode && (
              <MdEdit className="edit-icon" onClick={saveChanges} />
            )}
          </div>
          {/* Last Name */}
          <div className="profile-field">
            <span className="profile-label">Last Name:</span>
            {editMode ? (
              <input
                type="text"
                value={formFields.lastname || ''}
                onChange={(e) =>
                  setFormFields({ ...formFields, lastname: e.target.value })
                }
              />
            ) : (
              <span>{userData ? userData.lastname : 'Loading...'}</span>
            )}
            {editMode && (
              <MdEdit className="edit-icon" onClick={saveChanges} />
            )}
          </div>
          {/* Add more fields with edit functionality */}
          {/* Address */}
          <div className="profile-field">
            <span className="profile-label">Address:</span>
            {editMode ? (
              <input
                type="text"
                value={formFields.address || ''}
                onChange={(e) =>
                  setFormFields({ ...formFields, address: e.target.value })
                }
              />
            ) : (
              <span>{userData ? userData.address : 'Loading...'}</span>
            )}
            {editMode && (
              <MdEdit className="edit-icon" onClick={saveChanges} />
            )}
          </div>
          {/* City */}
          <div className="profile-field">
            <span className="profile-label">City:</span>
            {editMode ? (
              <input
                type="text"
                value={formFields.city || ''}
                onChange={(e) =>
                  setFormFields({ ...formFields, city: e.target.value })
                }
              />
            ) : (
              <span>{userData ? userData.city : 'Loading...'}</span>
            )}
            {editMode && (
              <MdEdit className="edit-icon" onClick={saveChanges} />
            )}
          </div>
          {/* Zip Code */}
          <div className="profile-field">
            <span className="profile-label">Zip Code:</span>
            {editMode ? (
              <input
                type="text"
                value={formFields.zipCode || ''}
                onChange={(e) =>
                  setFormFields({ ...formFields, zipCode: e.target.value })
                }
              />
            ) : (
              <span>{userData ? userData.zipCode : 'Loading...'}</span>
            )}
            {editMode && (
              <MdEdit className="edit-icon" onClick={saveChanges} />
            )}
          </div>
          {/* Country */}
          <div className="profile-field">
            <span className="profile-label">Country:</span>
            {editMode ? (
              <input
                type="text"
                value={formFields.country || ''}
                onChange={(e) =>
                  setFormFields({ ...formFields, country: e.target.value })
                }
              />
            ) : (
              <span>{userData ? userData.country : 'Loading...'}</span>
            )}
            {editMode && (
              <MdEdit className="edit-icon" onClick={saveChanges} />
            )}
          </div>
          {/* Phone Number */}
          <div className="profile-field">
            <span className="profile-label">Phone Number:</span>
            {editMode ? (
              <input
                type="text"
                value={formFields.phoneNumber || ''}
                onChange={(e) =>
                  setFormFields({ ...formFields, phoneNumber: e.target.value })
                }
              />
            ) : (
              <span>{userData ? userData.phoneNumber : 'Loading...'}</span>
            )}
            {editMode && (
              <MdEdit className="edit-icon" onClick={saveChanges} />
            )}
          </div>
          {/* Save Changes Button */}
          {editMode && (
            <button onClick={saveChanges}>Save Changes</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
