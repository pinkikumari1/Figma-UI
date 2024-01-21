const bookedDetails = [];

function bookNow() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;
    let data = [name, email, mobile];
    bookedDetails.push(data);
    window.location.href = "success_booking.html";
    insertDataWithApi(data);
    initClient();
    // window.location.href = "success_booking.html";
    

}
function insertDataWithApi(userData){
    var raw = JSON.stringify({
      "name": userData[0],
      "email": userData[1],
      "mobile": userData[2],
      "meta": "meta data here"
    });
    
    var requestOptions = {
      method: 'POST',
      headers: {
      "Content-Type": "application/json"
      },
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://api.propacity.in/api/v1/webhooks/integration/61cf0d44-1ede-4dfa-b3ce-9834102082/insertLead", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
}

// Load the Google Sheets API
gapi.load('client', initClient);

function initClient() {
  gapi.client.init({
    apiKey: 'YOUR_API_KEY', // Or use OAuth for authenticated requests
    discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  }).then(() => {
    // Call functions to interact with the API
    setSheetData();
  });
}

function setSheetData() {
  // Specify the spreadsheet ID and range
  const spreadsheetId = 'GOOGLE_SHEET_ID';
  const range = 'Sheet1!A1:B2';

  // Make the API request to update values
  gapi.client.sheets.spreadsheets.values.update({
    spreadsheetId: spreadsheetId,
    range: range,
    valueInputOption: 'RAW',
    resource: { values: bookedDetails},
  }).then((response) => {
    console.log('Sheet updated successfully', response);
  }, (error) => {
    console.error('Error updating sheet', error);
  });
}
