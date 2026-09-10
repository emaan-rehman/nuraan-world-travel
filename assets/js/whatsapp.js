/* assets/js/whatsapp.js */

const CONTACT_CONFIG = {
  PRIMARY_WHATSAPP: "27649816443",   
  SECONDARY_WHATSAPP: "27723526975", 
  EMAIL_ADDRESS: "nuraanworldtravel@gmail.com"
};

// --- FLIGHT FORM HANDLERS ---
function sendToWhatsApp() {
  const tripType = document.querySelector('input[name="tripType"]:checked')?.value || 'One Way';
  const custName = document.getElementById('custName')?.value.trim();
  const custEmail = document.getElementById('custEmail')?.value.trim();
  const custPhone = document.getElementById('custPhone')?.value.trim();

  // Validate Contact Information
  if (!custName || !custEmail || !custPhone) {
    alert("Please fill out your Name, Email, and Phone Number before submitting.");
    return;
  }

  let flightDetailsText = '';

  // 1. Multi-City Mode Validation & Formatting
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
      multiCityLegs.push(`   • Flight ${index + 1}: ${origin} to ${destination} on ${date}`);
    });

    if (!isValid || multiCityLegs.length === 0) {
      alert("Please complete all Origin, Destination, and Date fields for each Multi-City route.");
      return;
    }

    flightDetailsText = ` *Trip:* Multi-City%0A *Routes:*%0A${multiCityLegs.map(leg => encodeURIComponent(leg)).join('%0A')}`;

  // 2. One Way & Round Trip Validation
  } else {
    const fromCity = document.getElementById('fromCity')?.value.trim();
    const toCity = document.getElementById('toCity')?.value.trim();
    const departDate = document.getElementById('departDate')?.value.trim();
    const returnDate = document.getElementById('returnDate')?.value.trim();

    if (!fromCity || !toCity || !departDate || (tripType === 'Round Trip' && !returnDate)) {
      alert("Please fill out all required flight details.");
      return;
    }

    flightDetailsText = ` *Trip:* ${encodeURIComponent(tripType)}%0A` +
                        ` *From:* ${encodeURIComponent(fromCity)}%0A` +
                        ` *To:* ${encodeURIComponent(toCity)}%0A` +
                        ` *Departure:* ${encodeURIComponent(departDate)}`;

    if (tripType === 'Round Trip') {
      flightDetailsText += `%0A *Return:* ${encodeURIComponent(returnDate)}`;
    }
  }

  // Retrieve Passengers Summary
  const passengers = document.getElementById('passengerSummaryText')?.innerText || document.getElementById('passengers')?.value || '1 Adult';

  // Construct Final Message
  const message = `*NEW FLIGHT INQUIRY - NURAAN WORLD TRAVEL*%0A%0A` +
    ` *Name:* ${encodeURIComponent(custName)}%0A` +
    ` *Email:* ${encodeURIComponent(custEmail)}%0A` +
    ` *Phone:* ${encodeURIComponent(custPhone)}%0A` +
    `${flightDetailsText}%0A` +
    ` *Passengers:* ${encodeURIComponent(passengers)}`;

  window.open(`https://wa.me/${CONTACT_CONFIG.PRIMARY_WHATSAPP}?text=${message}`, '_blank');
}

function sendViaEmail() {
  const tripType = document.querySelector('input[name="tripType"]:checked')?.value || 'One Way';
  const custName = document.getElementById('custName')?.value.trim();
  const custEmail = document.getElementById('custEmail')?.value.trim();
  const custPhone = document.getElementById('custPhone')?.value.trim();

  // Validate Contact Information
  if (!custName || !custEmail || !custPhone) {
    alert("Please fill out your Name, Email, and Phone Number before submitting.");
    return;
  }

  let flightDetailsText = '';

  // 1. Multi-City Mode Validation
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
      multiCityLegs.push(`Flight ${index + 1}: ${origin} to ${destination} on ${date}`);
    });

    if (!isValid || multiCityLegs.length === 0) {
      alert("Please complete all Origin, Destination, and Date fields for each Multi-City route.");
      return;
    }

    flightDetailsText = `Trip Type: Multi-City\nRoutes:\n${multiCityLegs.join('\n')}`;

  // 2. One Way & Round Trip Mode Validation
  } else {
    const fromCity = document.getElementById('fromCity')?.value.trim();
    const toCity = document.getElementById('toCity')?.value.trim();
    const departDate = document.getElementById('departDate')?.value.trim();
    const returnDate = document.getElementById('returnDate')?.value.trim();

    if (!fromCity || !toCity || !departDate || (tripType === 'Round Trip' && !returnDate)) {
      alert("Please fill out all required flight details.");
      return;
    }

    flightDetailsText = `Trip Type: ${tripType}\nFrom: ${fromCity}\nTo: ${toCity}\nDeparture Date: ${departDate}`;
    if (tripType === 'Round Trip') {
      flightDetailsText += `\nReturn Date: ${returnDate}`;
    }
  }

  // Passengers Summary
  const passengers = document.getElementById('passengerSummaryText')?.innerText || document.getElementById('passengers')?.value || '1 Adult';

  const subject = encodeURIComponent(`Flight Inquiry from ${custName}`);
  const body = encodeURIComponent(
    `FLIGHT INQUIRY DETAILS:\n\n` +
    `Name: ${custName}\n` +
    `Customer Email: ${custEmail}\n` +
    `Phone: ${custPhone}\n\n` +
    `${flightDetailsText}\n` +
    `Passengers: ${passengers}`
  );

  window.location.href = `mailto:${CONTACT_CONFIG.EMAIL_ADDRESS}?subject=${subject}&body=${body}`;
}

// --- GENERAL CONTACT FORM HANDLERS ---
function sendGeneralToWhatsApp() {
  const name = document.getElementById('contactName')?.value.trim();
  const email = document.getElementById('contactEmail')?.value.trim();
  const phone = document.getElementById('contactPhone')?.value.trim();
  const service = document.getElementById('serviceType')?.value;
  const msg = document.getElementById('contactMessage')?.value.trim() || 'No additional details provided.';

  if (!name || !email || !phone) {
    alert("Please fill out your name, email, and phone number.");
    return;
  }

  const message = `*GENERAL INQUIRY - NURAAN WORLD TRAVEL*%0A%0A` +
    ` *Name:* ${encodeURIComponent(name)}%0A` +
    ` *Email:* ${encodeURIComponent(email)}%0A` +
    ` *Phone:* ${encodeURIComponent(phone)}%0A` +
    ` *Service:* ${encodeURIComponent(service)}%0A` +
    ` *Message:* ${encodeURIComponent(msg)}`;

  window.open(`https://wa.me/${CONTACT_CONFIG.PRIMARY_WHATSAPP}?text=${message}`, '_blank');
}

function sendGeneralViaEmail() {
  const name = document.getElementById('contactName')?.value.trim();
  const email = document.getElementById('contactEmail')?.value.trim();
  const phone = document.getElementById('contactPhone')?.value.trim();
  const service = document.getElementById('serviceType')?.value;
  const msg = document.getElementById('contactMessage')?.value.trim() || 'No additional details provided.';

  if (!name || !email || !phone) {
    alert("Please fill out your name, email, and phone number.");
    return;
  }

  const subject = encodeURIComponent(`${service} Inquiry from ${name}`);
  const body = encodeURIComponent(
    `General Service Inquiry:\n\n` +
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Phone: ${phone}\n` +
    `Requested Service: ${service}\n\n` +
    `Message:\n${msg}`
  );

  window.location.href = `mailto:${CONTACT_CONFIG.EMAIL_ADDRESS}?subject=${subject}&body=${body}`;
}