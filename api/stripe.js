// Stripe Integration Implementation for Inner Echo Website

// Initialize Stripe with the provided API key
const stripe = Stripe('pk_test_51RDuO5JAuTSxldsIkEC2diuiZqzTxzv3gy4I0q90tf1ZRo8D0Lfnnt2PkYkLa4fwpHCToCSCIiBnQ5zx0X5lI3Kf00Lvsbn9j7');

// Create booking form handler
document.addEventListener('DOMContentLoaded', function() {
  const bookingForm = document.getElementById('booking-form');
  
  if (bookingForm) {
    bookingForm.addEventListener('submit', async function(event) {
      event.preventDefault();
      
      // Validate form data
      const serviceType = document.getElementById('service-type').value;
      const bookingDate = document.getElementById('booking-date').value;
      const bookingTime = document.getElementById('booking-time').value;
      
      // Validate minimum 24-hour advance notice
      const selectedDateTime = new Date(`${bookingDate}T${bookingTime}`);
      const now = new Date();
      const hoursDifference = (selectedDateTime - now) / (1000 * 60 * 60);
      
      if (hoursDifference < 24) {
        showError('Bookings must be made at least 24 hours in advance.');
        return;
      }
      
      // Get service price based on selection
      const prices = {
        'listening-session': 9000, // $90.00
        'deep-listening-session': 13000, // $130.00
        'extended-support-session': 25000, // $250.00
        'unlimited-monthly-support': 50000 // $500.00
      };
      
      const price = prices[serviceType];
      
      try {
        // Create payment intent on the server
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            service: serviceType,
            price: price,
            date: bookingDate,
            time: bookingTime,
            email: document.getElementById('email').value,
            name: document.getElementById('name').value
          }),
        });
        
        const data = await response.json();
        
        if (data.error) {
          showError(data.error);
          return;
        }
        
        // Handle the payment with Stripe Elements
        const { clientSecret } = data;
        
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement('card'),
            billing_details: {
              name: document.getElementById('name').value,
              email: document.getElementById('email').value,
            },
          },
          receipt_email: document.getElementById('email').value,
        });
        
        if (result.error) {
          showError(result.error.message);
        } else {
          // Payment successful
          if (result.paymentIntent.status === 'succeeded') {
            // Show success message and redirect to confirmation page
            window.location.href = '/booking-confirmation?session=' + result.paymentIntent.id;
          }
        }
      } catch (error) {
        showError('An unexpected error occurred. Please try again.');
        console.error(error);
      }
    });
  }
  
  // Initialize Stripe Elements
  const elements = stripe.elements();
  const cardElement = elements.create('card');
  cardElement.mount('#card-element');
  
  // Handle real-time validation errors
  cardElement.on('change', function(event) {
    const displayError = document.getElementById('card-errors');
    if (event.error) {
      displayError.textContent = event.error.message;
    } else {
      displayError.textContent = '';
    }
  });
  
  // Display error message
  function showError(message) {
    const errorElement = document.getElementById('payment-errors');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    // Scroll to error message
    errorElement.scrollIntoView({ behavior: 'smooth' });
  }
  
  // Display cancellation policy
  const cancellationPolicy = document.getElementById('cancellation-policy');
  if (cancellationPolicy) {
    cancellationPolicy.innerHTML = `
      <h4>Cancellation Policy</h4>
      <ul>
        <li>Clients may cancel within 72 hours of booking their session to receive a full refund.</li>
        <li>Cancellations made up to 24 hours before the session will receive a 50% refund.</li>
        <li>Cancellations made less than 24 hours in advance, or failure to attend (no-shows), are non-refundable.</li>
      </ul>
    `;
  }
});

// Server-side implementation (Node.js with Express)
/*
const express = require('express');
const app = express();
const stripe = require('stripe')('REMOVED_FOR_GITHUB_SECURITY51RDuO5JAuTSxldsISdfO3JgszlUP9G6prByeqEdWNlO9euB1Ax4jwnX9qfGHDgx0VX77OKYtwvio4AGTqVn7LX1V00ONFfimnz');

app.use(express.json());

app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { service, price, date, time, email, name } = req.body;
    
    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: price,
      currency: 'usd',
      payment_method_types: ['card'],
      receipt_email: email,
      metadata: {
        service: service,
        date: date,
        time: time,
        customer_name: name,
        customer_email: email
      },
      description: `Inner Echo: ${service.replace('-', ' ')} on ${date} at ${time}`
    });
    
    // Return the client secret
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
*/
