/**
 * Helper Script to Register and Obtain Auth Token
 */

const registrationData = {
  email: "am8866@srmist.edu.in",
  name: "Aryan Mandlik",
  mobileNo: "9172493381",
  githubUsername: "aryann_lol",
  rollNo: "RA2311003012259",
  accessCode: "QkbpxH" 
};

async function getAccessToken() {
  const BASE_URL = 'http://20.207.122.201/evaluation-service';
  try {
    const regRes = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registrationData)
    });
    const regData = await regRes.json();
    
    const authRes = await fetch(`${BASE_URL}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...registrationData,
        clientID: regData.clientID,
        clientSecret: regData.clientSecret
      })
    });
    const authData = await authRes.json();
    console.log(authData.access_token);
  } catch (err) {
    console.error(err.message);
  }
}
getAccessToken();
