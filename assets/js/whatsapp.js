/* assets/js/whatsapp.js */

const CONTACT_CONFIG = {
  PRIMARY_WHATSAPP: "27649816443",   // First South Africa number
  SECONDARY_WHATSAPP: "27723526975", // Second South Africa number
  EMAIL_ADDRESS: "nuraanworldtravel@gmail.com"
};

function sendToWhatsApp() {
  const form = document.getElementById('flightForm');
  
  if (!form) {
    // Default chat redirect if triggered from nav or hero
    window.open(`https://wa.me/${CONTACT_CONFIG.PRIMARY_WHATSAPP}`, '_blank');
    return;
  }

  const fromCity = document.getElementById('fromCity')?.value.trim();
  const toCity = document.getElementById('toCity')?.value.trim();
  const departDate = document.getElementById('departDate')?.value;
  const returnDate = document.getElementById('returnDate')?.value || 'N/A';
  const passengers = document.getElementById('passengers')?.value || '1 Adult';
  const custName = document.getElementById('custName')?.value.trim();
  const custPhone = document.getElementById('custPhone')?.value.trim();
  const tripType = document.querySelector('input[name="tripType"]:checked')?.value || 'Round Trip';

  if (!fromCity || !toCity || !departDate || !custName || !custPhone) {
    alert("Please fill out all required fields before submitting your inquiry.");
    return;
  }

  const message = `*NEW FLIGHT INQUIRY - NURAAN WORLD TRAVEL*%0A%0A` +
    `👤 *Name:* ${encodeURIComponent(custName)}%0A` +
    `📞 *Phone:* ${encodeURIComponent(custPhone)}%0A` +
    `✈️ *Trip:* ${encodeURIComponent(tripType)}%0A` +
    `🛫 *From:* ${encodeURIComponent(fromCity)}%0A` +
    `🛬 *To:* ${encodeURIComponent(toCity)}%0A` +
    `📅 *Departure:* ${encodeURIComponent(departDate)}%0A` +
    `📅 *Return:* ${encodeURIComponent(returnDate)}%0A` +
    `👥 *Passengers:* ${encodeURIComponent(passengers)}`;

  window.open(`https://wa.me/${CONTACT_CONFIG.PRIMARY_WHATSAPP}?text=${message}`, '_blank');
}

function sendViaEmail() {
  const fromCity = document.getElementById('fromCity')?.value.trim();
  const toCity = document.getElementById('toCity')?.value.trim();
  const departDate = document.getElementById('departDate')?.value;
  const returnDate = document.getElementById('returnDate')?.value || 'N/A';
  const passengers = document.getElementById('passengers')?.value || '1 Adult';
  const custName = document.getElementById('custName')?.value.trim();
  const custPhone = document.getElementById('custPhone')?.value.trim();
  const tripType = document.querySelector('input[name="tripType"]:checked')?.value || 'Round Trip';

  if (!fromCity || !toCity || !departDate || !custName || !custPhone) {
    alert("Please fill out all required fields before submitting your inquiry.");
    return;
  }

  const subject = encodeURIComponent(`Flight Inquiry from ${custName}`);
  const body = encodeURIComponent(
    `Flight Inquiry Details:\n\n` +
    `Name: ${custName}\n` +
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