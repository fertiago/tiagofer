import React from 'react';
import ContactForm from '../components/contact/ContactForm';

const Contact = () => {
  return (
    <div id="app">
      <header id="header">
        <div id="navigation"></div>
        <div id="theme"></div>
      </header>
      
      <main id="main">
        <ContactForm />
      </main>
      
      <footer id="footer"></footer>
    </div>
  );
};

export default Contact;
