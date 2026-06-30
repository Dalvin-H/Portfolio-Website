const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');

const submissionEndpoint = 'https://formsubmit.co/ajax/dalvin.heyninck1@gmail.com';

if (contactForm && contactStatus) {
  contactForm.addEventListener('submit', async event => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      contactStatus.textContent = 'Please fill in all fields before sending.';
      contactStatus.className = 'contact-status error';
      return;
    }

    const formData = new FormData(contactForm);
    const payload = {
      name: formData.get('name').trim(),
      email: formData.get('email').trim(),
      subject: formData.get('subject').trim(),
      message: formData.get('message').trim(),
      _captcha: 'false',
      _template: 'table',
      _replyto: formData.get('email').trim()
    };

    const submitButton = contactForm.querySelector('button[type="submit"]');

    try {
      if (submitButton) {
        submitButton.disabled = true;
      }

      contactStatus.textContent = 'Sending message...';
      contactStatus.className = 'contact-status';

      const response = await fetch(submissionEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      contactForm.reset();
      contactStatus.textContent = 'Message sent successfully. Thank you! I will get back to you soon.';
      contactStatus.className = 'contact-status success';
    } catch (error) {
      contactStatus.textContent = 'Something went wrong while sending the message. Please try again.';
      contactStatus.className = 'contact-status error';
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
}
