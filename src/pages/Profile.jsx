import React, { useState, useEffect } from "react";
import Navbar2 from "../components/navbar/Navbar2";
import app from "../base";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Avatar,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/system";

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: theme.spacing(4),
}));

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

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const Profile = () => {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const user = auth.currentUser;

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

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
  };

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
      <StyledContainer component="main" maxWidth="xs">
        <StyledAvatar
          src={userData?.profileImage || "/default-profile-pic.jpg"}
        />
        <Typography component="h1" variant="h5">
          User Profile
        </Typography>
        <StyledForm>
          <StyledCard>
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
                    setFormFields({ ...formFields, firstname: e.target.value })
                  }
                />
              ) : (
                <Typography variant="body1">{formFields.firstname}</Typography>
              )}
              <IconButton onClick={() => toggleEditMode("firstname")}>
                <EditIcon />
              </IconButton>
            </CardContent>
          </StyledCard>
          <StyledCard>
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
          </StyledCard>
          <StyledCard>
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
          </StyledCard>
          <StyledCard>
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
          </StyledCard>
          <StyledCard>
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
          </StyledCard>
          <StyledCard>
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
          </StyledCard>
          <StyledCard>
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
          </StyledCard>
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={saveChanges}
          >
            Save Changes
          </StyledButton>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="raised-button-file"
            multiple
            type="file"
            onChange={handleFileInputChange}
          />
          <label htmlFor="raised-button-file">
            <Button variant="raised" component="span">
              Upload
            </Button>
          </label>
        </StyledForm>
      </StyledContainer>
    </div>
  );
};

export default Profile;
