/* assets/js/whatsapp.js */

const CONTACT_CONFIG = {
  PRIMARY_WHATSAPP: "27649816443",   
  SECONDARY_WHATSAPP: "27723526975", 
  EMAIL_ADDRESS: "nuraanworldtravel@gmail.com"
};

// --- FLIGHT FORM HANDLERS ---
function sendToWhatsApp() {
  const fromCity = document.getElementById('fromCity')?.value.trim();
  const toCity = document.getElementById('toCity')?.value.trim();
  const departDate = document.getElementById('departDate')?.value;
  const returnDate = document.getElementById('returnDate')?.value || 'N/A';
  const passengers = document.getElementById('passengers')?.value || '1 Adult';
  const custName = document.getElementById('custName')?.value.trim();
  const custEmail = document.getElementById('custEmail')?.value.trim();
  const custPhone = document.getElementById('custPhone')?.value.trim();
  const tripType = document.querySelector('input[name="tripType"]:checked')?.value || 'Round Trip';

  if (!fromCity || !toCity || !departDate || !custName || !custEmail || !custPhone) {
    alert("Please fill out all required fields before submitting your flight inquiry.");
    return;
  }

  const message = `*NEW FLIGHT INQUIRY - NURAAN WORLD TRAVEL*%0A%0A` +
    ` *Name:* ${encodeURIComponent(custName)}%0A` +
    ` *Email:* ${encodeURIComponent(custEmail)}%0A` +
    ` *Phone:* ${encodeURIComponent(custPhone)}%0A` +
    ` *Trip:* ${encodeURIComponent(tripType)}%0A` +
    ` *From:* ${encodeURIComponent(fromCity)}%0A` +
    ` *To:* ${encodeURIComponent(toCity)}%0A` +
    ` *Departure:* ${encodeURIComponent(departDate)}%0A` +
    ` *Return:* ${encodeURIComponent(returnDate)}%0A` +
    ` *Passengers:* ${encodeURIComponent(passengers)}`;

  window.open(`https://wa.me/${CONTACT_CONFIG.PRIMARY_WHATSAPP}?text=${message}`, '_blank');
}

function sendViaEmail() {
  const fromCity = document.getElementById('fromCity')?.value.trim();
  const toCity = document.getElementById('toCity')?.value.trim();
  const departDate = document.getElementById('departDate')?.value;
  const returnDate = document.getElementById('returnDate')?.value || 'N/A';
  const passengers = document.getElementById('passengers')?.value || '1 Adult';
  const custName = document.getElementById('custName')?.value.trim();
  const custEmail = document.getElementById('custEmail')?.value.trim();
  const custPhone = document.getElementById('custPhone')?.value.trim();
  const tripType = document.querySelector('input[name="tripType"]:checked')?.value || 'Round Trip';

  if (!fromCity || !toCity || !departDate || !custName || !custEmail || !custPhone) {
    alert("Please fill out all required fields before submitting your flight inquiry.");
    return;
  }

  const subject = encodeURIComponent(`Flight Inquiry from ${custName}`);
  const body = encodeURIComponent(
    `Flight Inquiry Details:\n\n` +
    `Name: ${custName}\n` +
    `Customer Email: ${custEmail}\n` +
    `Phone: ${custPhone}\n` +
    `Trip Type: ${tripType}\n` +
    `From: ${fromCity}\n` +
    `To: ${toCity}\n` +
    `Departure Date: ${departDate}\n` +
    `Return Date: ${returnDate}\n` +
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