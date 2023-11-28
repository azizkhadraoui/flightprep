import React, { useState, useEffect } from "react";
import Navbar2 from "../components/navbar/Navbar2";
import app from "../base";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import {
  TextField,
  Button,
  Typography,
  Avatar,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/system";


const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  marginBottom: theme.spacing(2),
}));

const StyledForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

const Profile = () => {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const user = auth.currentUser;
  const storage = getStorage(app);
  const fileInputRef = React.useRef();

  const [userData, setUserData] = useState(null);
  const [formFields, setFormFields] = useState({
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    phoneNumber: "",
  });
  const [editMode, setEditMode] = useState({
    firstname: false,
    lastname: false,
    address: false,
    city: false,
    zipCode: false,
    country: false,
    phoneNumber: false,
  });

  const toggleEditMode = (field) => {
    setEditMode({ ...editMode, [field]: !editMode[field] });
  };

  const saveChanges = async () => {
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, formFields);
      setUserData({ ...userData, ...formFields });
      toggleEditMode();
      console.log("Profile information updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    if (user) {
      const userRef = doc(db, "users", user.uid);

      getDoc(userRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log("No user data found.");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [user, db]);

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const storageRef = ref(storage, `profilePics/${user.uid}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, { profileImage: url });
    setUserData({ ...userData, profileImage: url });
  };
  const handleIconButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundImage: `url("/landingpage.svg")`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      }}
    >
      <Navbar2 />
      <div
        style={{
          display: "flex",
          maxWidth: "1000px",
          marginLeft: "250px",
          background: "white",
          borderRadius: 25,
          marginTop: "50px",
        }}
      >
        <div
          style={{
            flex: 1,
            paddingLeft: "40px",
            paddingTop:'20px',
          }}
        >
          <div
            style={{
              position: "relative",
              width: "200px",
              height: "200px",
              marginLeft:'40px'
            }}
          >
            <StyledAvatar
              src={userData?.profileImage || "/default-profile-pic.jpg"}
              style={{
                width: "200px",
                height: "200px",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                background: "rgba(0, 0, 0, 0.5)",
                color: "#fff",
                padding: "5px",
                borderRadius: "50%",
              }}
            >
              <IconButton
                onClick={handleIconButtonClick}
                style={{ borderRadius: "50%" }}
              >
                <AddIcon />
              </IconButton>
              <input
                ref={fileInputRef}
                type="file"
                style={{ display: "none" }}
                onChange={handleFileInputChange}
              />
            </div>
          </div>
          <Typography component="h1" variant="h5" color="black" style={{marginLeft:'75px', marginTop:'20px'}}>
            User Profile
          </Typography>
        </div>
        <div
          style={{
            flex: 2,
            paddingLeft: "10px",
            paddingRight:'20px',
          }}
        >
          <StyledForm>
            <Card>
              <CardContent>
                {editMode.firstname ? (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="firstname"
                    label="First Name"
                    name="firstname"
                    autoComplete="firstname"
                    autoFocus
                    value={formFields.firstname || ""}
                    onChange={(e) =>
                      setFormFields({
                        ...formFields,
                        firstname: e.target.value,
                      })
                    }
                  />
                ) : (
                  <Typography variant="body1">
                    {formFields.firstname}
                  </Typography>
                )}
                <IconButton onClick={() => toggleEditMode("firstname")}>
                  <EditIcon />
                </IconButton>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                {editMode.lastname ? (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="lastname"
                    label="Last Name"
                    name="lastname"
                    autoComplete="lastname"
                    value={formFields.lastname || ""}
                    onChange={(e) =>
                      setFormFields({ ...formFields, lastname: e.target.value })
                    }
                  />
                ) : (
                  <Typography variant="body1">{formFields.lastname}</Typography>
                )}
                <IconButton onClick={() => toggleEditMode("lastname")}>
                  <EditIcon />
                </IconButton>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                {editMode.address ? (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    autoComplete="address"
                    value={formFields.address || ""}
                    onChange={(e) =>
                      setFormFields({ ...formFields, address: e.target.value })
                    }
                  />
                ) : (
                  <Typography variant="body1">{formFields.address}</Typography>
                )}
                <IconButton onClick={() => toggleEditMode("address")}>
                  <EditIcon />
                </IconButton>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                {editMode.city ? (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="city"
                    label="City"
                    name="city"
                    autoComplete="city"
                    value={formFields.city || ""}
                    onChange={(e) =>
                      setFormFields({ ...formFields, city: e.target.value })
                    }
                  />
                ) : (
                  <Typography variant="body1">{formFields.city}</Typography>
                )}
                <IconButton onClick={() => toggleEditMode("city")}>
                  <EditIcon />
                </IconButton>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                {editMode.zipCode ? (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="zipCode"
                    label="Zip Code"
                    name="zipCode"
                    autoComplete="zipCode"
                    value={formFields.zipCode || ""}
                    onChange={(e) =>
                      setFormFields({ ...formFields, zipCode: e.target.value })
                    }
                  />
                ) : (
                  <Typography variant="body1">{formFields.zipCode}</Typography>
                )}
                <IconButton onClick={() => toggleEditMode("zipCode")}>
                  <EditIcon />
                </IconButton>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                {editMode.country ? (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="country"
                    label="Country"
                    name="country"
                    autoComplete="country"
                    value={formFields.country || ""}
                    onChange={(e) =>
                      setFormFields({ ...formFields, country: e.target.value })
                    }
                  />
                ) : (
                  <Typography variant="body1">{formFields.country}</Typography>
                )}
                <IconButton onClick={() => toggleEditMode("country")}>
                  <EditIcon />
                </IconButton>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                {editMode.phoneNumber ? (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="phoneNumber"
                    label="Phone Number"
                    name="phoneNumber"
                    autoComplete="phoneNumber"
                    value={formFields.phoneNumber || ""}
                    onChange={(e) =>
                      setFormFields({
                        ...formFields,
                        phoneNumber: e.target.value,
                      })
                    }
                  />
                ) : (
                  <Typography variant="body1">
                    {formFields.phoneNumber}{" "}
                  </Typography>
                )}
                <IconButton onClick={() => toggleEditMode("phoneNumber")}>
                  <EditIcon />
                </IconButton>
              </CardContent>
            </Card>
            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={saveChanges}
            >
              Save Changes
            </StyledButton>
          </StyledForm>
        </div>
      </div>
    </div>
  );
};

export default Profile;
