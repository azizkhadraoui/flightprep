import React, { useState } from "react";
import app from "./base";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const auth = getAuth(app);


const db = getFirestore(app);

const Infos = () => {
  const [name, setName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSave = async () => {
    try {
      const user = app.currentUser;
      if (user) {
        const userId = user.uid;
        const userRef = doc(db, "users", userId);
        await setDoc(userRef, {
          name,
          familyName,
          age,
          address,
          city,
          zipCode,
          country,
          phoneNumber
        });
        console.log("User information saved successfully!");
      }
    } catch (error) {
      console.error("Error saving user information:", error);
    }
  };

  return (
    <div>
      <h1>Provide Your Information</h1>
      <label>
        Name
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Family Name
        <input type="text" value={familyName} onChange={(e) => setFamilyName(e.target.value)} />
      </label>
      <label>
        Age
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
      </label>
      <label>
        Address
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      </label>
      <label>
        City
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
      </label>
      <label>
        ZIP Code
        <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
      </label>
      <label>
        Country
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="usa">USA</option>
          <option value="canada">Canada</option>
          {/* Add more country options */}
        </select>
      </label>
      <label>
        Phone Number
        <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </label>
      <button onClick={handleSave}>Save Information</button>
    </div>
  );
};

export default Infos;
