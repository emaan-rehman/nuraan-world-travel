/* assets/js/whatsapp.js */
const CONTACT_CONFIG = {
  PRIMARY_WHATSAPP: "27649816443",   
  SECONDARY_WHATSAPP: "27723526975", 
  EMAIL_ADDRESS: "info@nuraanworldtravel.com",
  EMAILJS_SERVICE_ID: "service_nuraan",   
  EMAILJS_TEMPLATE_ID: "template_nuraan"  
};

// --- FLIGHT EMAIL HANDLER ---
function sendViaEmail() {
  const tripType = document.querySelector('input[name="tripType"]:checked')?.value || 'One Way';
  const custName = document.getElementById('custName')?.value.trim();
  const custEmail = document.getElementById('custEmail')?.value.trim();
  const custPhone = document.getElementById('custPhone')?.value.trim();

  if (!custName || !custEmail || !custPhone) {
  Swal.fire({
  title: 'Inquiry Submitted!',
  text: 'Thank you! Your flight inquiry has been sent to info@nuraanworldtravel.com.',
  icon: 'success',
  confirmButtonText: 'OK',
  confirmButtonColor: '#d4af37', // Gold button matching your theme
  background: '#0b0e14',        // Dark card background matching your theme
  color: '#ffffff'
});
    return;
  }

  let flightDetailsText = '';

  if (tripType === 'Multi-City') {
    const rows = document.querySelectorAll('#multiCityRows .multi-city-row');
    let multiCityLegs = [];
    let isValid = true;

    rows.forEach((row, index) => {
      const origin = row.querySelector('.mc-origin')?.value.trim();
      const destination = row.querySelector('.mc-destination')?.value.trim();
      const date = row.querySelector('.mc-date')?.value.trim();

      if (!origin || !destination || !date) {
        isValid = false;
      }
      multiCityLegs.push(`Leg ${index + 1}: ${origin} -> ${destination} on ${date}`);
    });

    if (!isValid || multiCityLegs.length === 0) {
      alert("Please complete all Origin, Destination, and Date fields for your Multi-City routes.");
      return;
    }

    flightDetailsText = multiCityLegs.join('\n');

  } else {
    const fromCity = document.getElementById('fromCity')?.value.trim();
    const toCity = document.getElementById('toCity')?.value.trim();
    const departDate = document.getElementById('departDate')?.value.trim();
    const returnDate = document.getElementById('returnDate')?.value.trim();

    if (!fromCity || !toCity || !departDate || (tripType === 'Round Trip' && !returnDate)) {
      alert("Please fill out all required flight route and date fields.");
      return;
    }

    flightDetailsText = `From: ${fromCity}\nTo: ${toCity}\nDeparture: ${departDate}`;
    if (tripType === 'Round Trip') {
      flightDetailsText += `\nReturn: ${returnDate}`;
    }
  }

  const passengers = document.getElementById('passengerSummaryText')?.innerText || '1 Adult';

  const templateParams = {
    from_name: custName,
    from_email: custEmail,
    cust_phone: custPhone,
    trip_type: tripType,
    flight_details: flightDetailsText,
    passengers: passengers
  };

  if (typeof emailjs !== 'undefined') {
    emailjs.send(CONTACT_CONFIG.EMAILJS_SERVICE_ID, CONTACT_CONFIG.EMAILJS_TEMPLATE_ID, templateParams)
      .then(function(response) {
        Swal.fire({
          title: 'Inquiry Submitted!',
          text: 'Thank you! Your flight inquiry has been sent to info@nuraanworldtravel.com.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#d4af37',
          background: '#0b0e14',
          color: '#ffffff'
        });
      })
      .catch(function(error) {
        console.error('EMAILJS ERROR:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Email sending failed. Error: ' + JSON.stringify(error),
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#d4af37',
          background: '#0b0e14',
          color: '#ffffff'
        });
      });
  } else {
    Swal.fire({
      title: 'Error!',
      text: 'EmailJS SDK failed to load. Please refresh the page.',
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: '#d4af37',
      background: '#0b0e14',
      color: '#ffffff'
    });
  }
}

// --- GENERAL & VISA INQUIRY EMAIL HANDLER (FOR CONTACT PAGE) ---
function sendGeneralViaEmail() {
  const name = document.getElementById('contactName')?.value.trim();
  const email = document.getElementById('contactEmail')?.value.trim();
  const phone = document.getElementById('contactPhone')?.value.trim();
  const service = document.getElementById('serviceType')?.value || 'General Inquiry';
  const msg = document.getElementById('contactMessage')?.value.trim() || 'No details provided.';

  if (!name || !email || !phone) {
    Swal.fire({
      title: 'Missing Information',
      text: 'Please fill out your Full Name, Email Address, and Phone Number.',
      icon: 'warning',
      confirmButtonText: 'OK',
      confirmButtonColor: '#d4af37',
      background: '#0b0e14',
      color: '#ffffff'
    });
    return;
  }

  const templateParams = {
    from_name: name,
    from_email: email,
    cust_phone: phone,
    trip_type: service,
    flight_details: `Service Required: ${service}\n\nMessage Details:\n${msg}`,
    passengers: "N/A"
  };

  if (typeof emailjs !== 'undefined') {
    emailjs.send(CONTACT_CONFIG.EMAILJS_SERVICE_ID, CONTACT_CONFIG.EMAILJS_TEMPLATE_ID, templateParams)
      .then(function(response) {
    Swal.fire({
  title: 'Inquiry Submitted!',
  text: 'Thank you! Your flight inquiry has been sent to info@nuraanworldtravel.com.',
  icon: 'success',
  confirmButtonText: 'OK',
  confirmButtonColor: '#d4af37', // Gold button matching your theme
  background: '#0b0e14',        // Dark card background matching your theme
  color: '#ffffff'
});
      })
      .catch(function(error) {
        console.error('EMAILJS ERROR:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Email sending failed. Error: ' + JSON.stringify(error),
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#d4af37',
          background: '#0b0e14',
          color: '#ffffff'
        });
      });
  } else {
    Swal.fire({
      title: 'Error!',
      text: 'EmailJS SDK failed to load. Please refresh the page.',
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: '#d4af37',
      background: '#0b0e14',
      color: '#ffffff'
    });
  }
}

// --- WHATSAPP HANDLERS ---
function sendToWhatsApp() {
  const tripType = document.querySelector('input[name="tripType"]:checked')?.value || 'One Way';
  const custName = document.getElementById('custName')?.value.trim();
  const custEmail = document.getElementById('custEmail')?.value.trim();
  const custPhone = document.getElementById('custPhone')?.value.trim();

  if (!custName || !custEmail || !custPhone) {
    Swal.fire({
      title: 'Missing Information',
      text: 'Please fill out your Name, Email, and Phone Number before submitting.',
      icon: 'warning',
      confirmButtonText: 'OK',
      confirmButtonColor: '#d4af37',
      background: '#0b0e14',
      color: '#ffffff'
    });
    return;
  }

  let flightDetailsText = '';

  if (tripType === 'Multi-City') {
    const rows = document.querySelectorAll('#multiCityRows .multi-city-row');
    let multiCityLegs = [];
    rows.forEach((row, index) => {
      const origin = row.querySelector('.mc-origin')?.value.trim();
      const destination = row.querySelector('.mc-destination')?.value.trim();
      const date = row.querySelector('.mc-date')?.value.trim();
      multiCityLegs.push(`   • Flight ${index + 1}: ${origin} to ${destination} on ${date}`);
    });
    flightDetailsText = ` *Trip:* Multi-City%0A *Routes:*%0A${multiCityLegs.map(leg => encodeURIComponent(leg)).join('%0A')}`;
  } else {
    const fromCity = document.getElementById('fromCity')?.value.trim();
    const toCity = document.getElementById('toCity')?.value.trim();
    const departDate = document.getElementById('departDate')?.value.trim();
    const returnDate = document.getElementById('returnDate')?.value.trim();

    flightDetailsText = ` *Trip:* ${encodeURIComponent(tripType)}%0A` +
                        ` *From:* ${encodeURIComponent(fromCity)}%0A` +
                        ` *To:* ${encodeURIComponent(toCity)}%0A` +
                        ` *Departure:* ${encodeURIComponent(departDate)}`;

    if (tripType === 'Round Trip') {
      flightDetailsText += `%0A *Return:* ${encodeURIComponent(returnDate)}`;
    }
  }

  const passengers = document.getElementById('passengerSummaryText')?.innerText || '1 Adult';

  const message = `*NEW FLIGHT INQUIRY - NURAAN WORLD TRAVEL*%0A%0A` +
    ` *Name:* ${encodeURIComponent(custName)}%0A` +
    ` *Email:* ${encodeURIComponent(custEmail)}%0A` +
    ` *Phone:* ${encodeURIComponent(custPhone)}%0A` +
    `${flightDetailsText}%0A` +
    ` *Passengers:* ${encodeURIComponent(passengers)}`;

  window.open(`https://wa.me/${CONTACT_CONFIG.PRIMARY_WHATSAPP}?text=${message}`, '_blank');
}

function sendGeneralToWhatsApp() {
  const name = document.getElementById('contactName')?.value.trim();
  const email = document.getElementById('contactEmail')?.value.trim();
  const phone = document.getElementById('contactPhone')?.value.trim();
  const service = document.getElementById('serviceType')?.value || 'General Inquiry';
  const msg = document.getElementById('contactMessage')?.value.trim() || 'No additional details provided.';

  if (!name || !email || !phone) {
    Swal.fire({
      title: 'Missing Information',
      text: 'Please fill out your Name, Email, and Phone Number.',
      icon: 'warning',
      confirmButtonText: 'OK',
      confirmButtonColor: '#d4af37',
      background: '#0b0e14',
      color: '#ffffff'
    });
    return;
  }

  const message = `*GENERAL / VISA INQUIRY - NURAAN WORLD TRAVEL*%0A%0A` +
    ` *Name:* ${encodeURIComponent(name)}%0A` +
    ` *Email:* ${encodeURIComponent(email)}%0A` +
    ` *Phone:* ${encodeURIComponent(phone)}%0A` +
    ` *Service:* ${encodeURIComponent(service)}%0A` +
    ` *Message:* ${encodeURIComponent(msg)}`;

  window.open(`https://wa.me/${CONTACT_CONFIG.PRIMARY_WHATSAPP}?text=${message}`, '_blank');
}
function sendToWhatsApp() {
  const phoneNumber = "27649816443";
  const message = encodeURIComponent("Hello Nuraan World Travel, I would like to inquire about a flight booking.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  
  window.open(whatsappUrl, "_blank");
}