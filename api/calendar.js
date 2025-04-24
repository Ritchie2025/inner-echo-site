// Google Calendar and Meet Integration for Inner Echo Website

// Load the Google API client library
function loadGoogleApiClient() {
  gapi.load('client:auth2', initClient);
}

// Initialize the Google API client
function initClient() {
  gapi.client.init({
    apiKey: 'YOUR_API_KEY', // Will be replaced with actual key from credentials
    clientId: '171611238189-2v186sef0viasit4mdgrjvd88j0k4s2l.apps.googleusercontent.com',
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
    scope: 'https://www.googleapis.com/auth/calendar'
  }).then(function() {
    // Listen for sign-in state changes
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    
    // Handle the initial sign-in state
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  });
}

// Update UI based on sign-in status
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    console.log('Signed in to Google Calendar API');
  } else {
    console.log('Not signed in to Google Calendar API');
  }
}

// Create a calendar event with Google Meet link
async function createCalendarEvent(bookingDetails) {
  try {
    // Format start and end times
    const startDateTime = new Date(`${bookingDetails.date}T${bookingDetails.time}`);
    const endDateTime = new Date(startDateTime.getTime());
    
    // Set end time based on service type
    switch(bookingDetails.service) {
      case 'listening-session':
        endDateTime.setHours(endDateTime.getHours() + 1); // 1 hour
        break;
      case 'deep-listening-session':
        endDateTime.setHours(endDateTime.getHours() + 1);
        endDateTime.setMinutes(endDateTime.getMinutes() + 30); // 1.5 hours
        break;
      case 'extended-support-session':
        endDateTime.setHours(endDateTime.getHours() + 3); // 3 hours
        break;
      case 'unlimited-monthly-support':
        endDateTime.setHours(endDateTime.getHours() + 1); // Initial 1 hour session
        break;
    }
    
    // Format service name for display
    const formattedService = bookingDetails.service
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    // Create event with Google Meet link
    const event = {
      summary: `Inner Echo: ${formattedService}`,
      location: 'Virtual Session via Google Meet',
      description: `Your ${formattedService} with Inner Echo has been confirmed.\n\nPlease join the session using the Google Meet link provided in this calendar invitation.\n\nCancellation Policy:\n- Cancellations within 72 hours of booking receive a full refund\n- Cancellations up to 24 hours before the session receive a 50% refund\n- Cancellations less than 24 hours in advance are non-refundable`,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'America/New_York' // Default timezone, can be adjusted
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'America/New_York'
      },
      attendees: [
        {email: bookingDetails.email},
        {email: 'lritchie.cbo@gmail.com'} // Inner Echo email
      ],
      reminders: {
        useDefault: false,
        overrides: [
          {method: 'email', minutes: 24 * 60}, // 24 hour email reminder
          {method: 'popup', minutes: 60} // 1 hour popup reminder
        ]
      },
      conferenceData: {
        createRequest: {
          requestId: bookingDetails.id,
          conferenceSolutionKey: {
            type: 'hangoutsMeet'
          }
        }
      }
    };
    
    // Insert the event to the calendar
    const request = gapi.client.calendar.events.insert({
      calendarId: 'primary', // Uses the primary calendar of lritchie.cbo@gmail.com
      resource: event,
      sendUpdates: 'all', // Send email notifications to all attendees
      conferenceDataVersion: 1 // Enable Google Meet creation
    });
    
    const response = await request;
    console.log('Event created: %s', response.result.htmlLink);
    
    // Return the event details including Meet link
    return {
      eventId: response.result.id,
      eventLink: response.result.htmlLink,
      meetLink: response.result.conferenceData?.entryPoints?.[0]?.uri || null
    };
  } catch (error) {
    console.error('Error creating calendar event:', error);
    throw error;
  }
}

// Server-side implementation (Node.js with Express and googleapis)
/*
const express = require('express');
const { google } = require('googleapis');
const app = express();

app.use(express.json());

// Configure JWT client with service account
function getCalendarServiceClient() {
  const serviceAccountKey = require('./in-echo-calendar-integration-809b6a8921d9.json');
  
  const jwtClient = new google.auth.JWT(
    serviceAccountKey.client_email,
    null,
    serviceAccountKey.private_key,
    ['https://www.googleapis.com/auth/calendar'],
    'lritchie.cbo@gmail.com' // User to impersonate
  );
  
  return google.calendar({ version: 'v3', auth: jwtClient });
}

// Create calendar event with Google Meet link
app.post('/api/create-calendar-event', async (req, res) => {
  try {
    const { service, date, time, email, name, bookingId } = req.body;
    
    // Format start and end times
    const startDateTime = new Date(`${date}T${time}`);
    const endDateTime = new Date(startDateTime.getTime());
    
    // Set end time based on service type
    switch(service) {
      case 'listening-session':
        endDateTime.setHours(endDateTime.getHours() + 1); // 1 hour
        break;
      case 'deep-listening-session':
        endDateTime.setHours(endDateTime.getHours() + 1);
        endDateTime.setMinutes(endDateTime.getMinutes() + 30); // 1.5 hours
        break;
      case 'extended-support-session':
        endDateTime.setHours(endDateTime.getHours() + 3); // 3 hours
        break;
      case 'unlimited-monthly-support':
        endDateTime.setHours(endDateTime.getHours() + 1); // Initial 1 hour session
        break;
    }
    
    // Format service name for display
    const formattedService = service
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    // Create event with Google Meet link
    const calendar = getCalendarServiceClient();
    const event = {
      summary: `Inner Echo: ${formattedService}`,
      location: 'Virtual Session via Google Meet',
      description: `Your ${formattedService} with Inner Echo has been confirmed.\n\nPlease join the session using the Google Meet link provided in this calendar invitation.\n\nCancellation Policy:\n- Cancellations within 72 hours of booking receive a full refund\n- Cancellations up to 24 hours before the session receive a 50% refund\n- Cancellations less than 24 hours in advance are non-refundable`,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'America/New_York'
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'America/New_York'
      },
      attendees: [
        {email: email},
        {email: 'lritchie.cbo@gmail.com'}
      ],
      reminders: {
        useDefault: false,
        overrides: [
          {method: 'email', minutes: 24 * 60},
          {method: 'popup', minutes: 60}
        ]
      },
      conferenceData: {
        createRequest: {
          requestId: bookingId,
          conferenceSolutionKey: {
            type: 'hangoutsMeet'
          }
        }
      }
    };
    
    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      sendUpdates: 'all',
      conferenceDataVersion: 1
    });
    
    res.json({
      success: true,
      eventId: response.data.id,
      eventLink: response.data.htmlLink,
      meetLink: response.data.conferenceData?.entryPoints?.[0]?.uri || null
    });
  } catch (error) {
    console.error('Error creating calendar event:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.listen(3001, () => console.log('Calendar API server running on port 3001'));
*/

// Connect booking form submission with calendar creation
document.addEventListener('DOMContentLoaded', function() {
  const bookingForm = document.getElementById('booking-form');
  
  if (bookingForm) {
    // This will be called after successful payment
    window.createBookingCalendarEvent = async function(bookingDetails) {
      try {
        // First ensure Google API is loaded and authenticated
        if (!gapi.auth2?.getAuthInstance()?.isSignedIn.get()) {
          await gapi.auth2.getAuthInstance().signIn();
        }
        
        // Create the calendar event
        const eventDetails = await createCalendarEvent(bookingDetails);
        
        // Update the confirmation page with event details
        const meetLinkElement = document.getElementById('meet-link');
        if (meetLinkElement && eventDetails.meetLink) {
          meetLinkElement.href = eventDetails.meetLink;
          meetLinkElement.textContent = 'Join Google Meet Session';
        }
        
        return eventDetails;
      } catch (error) {
        console.error('Failed to create calendar event:', error);
        alert('Your booking was successful, but we encountered an issue creating your calendar event. Our team will contact you with the session details.');
      }
    };
  }
  
  // Load Google API when page loads
  const script = document.createElement('script');
  script.src = 'https://apis.google.com/js/api.js';
  script.onload = loadGoogleApiClient;
  document.body.appendChild(script);
});
