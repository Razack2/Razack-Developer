'use client';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';



const Contact = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<'success' | 'error' | null>(null);

 const router = useRouter();
 const [loading, setLoading] = useState(false);

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true); // Start spinner

  if (!formRef.current) {
    console.error("❌ formRef.current is null");
    setLoading(false);
    return;
  }

  const formData = new FormData(formRef.current);

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      setStatus('Message sent successfully!');
      setStatusType('success');
      formRef.current.reset();
      router.push('/page'); // ✅ redirect

    } 
   
    else {
      const error = await res.text();
      console.error('❌ Error:', error);
      setStatus('Something went wrong!');
      setStatusType('error');
    }
  } catch (err) {
    console.error('❌ Submission failed:', err);
    setStatus('Submission failed!');
    setStatusType('error');
  }

  setLoading(false); // Stop spinner
};

  return (
    <section id="contact">
      <div>
        <h1 className="text-gray-800 text-3xl mt-8 font-bold text-center">Get in Touch</h1>
        <p className="text-gray-600 text-center mt-4">Feel free to reach out to us directly at:</p>
        <p className="text-gray-800 text-center mt-2 font-semibold">
          Phone: <a href="tel:+265234567890" className="text-blue-600 hover:underline">0996436746</a>
        </p>
        <p className="text-gray-800 text-center mt-2 font-semibold">
          Email: <a href="mailto:DeveloperRazack@gmail.com" className="text-blue-600 hover:underline">DeveloperRazack@gmail.com</a>
        </p>

        <div className="mt-8 px-6">
          <h2 className="text-gray-800 text-center text-2xl font-bold">Contact Us</h2>
          <p className="text-gray-600 text-center mt-1">Your email address will not be published. Required fields are marked *</p>

        <form ref={formRef} onSubmit={handleSubmit} className="max-w-md mx-auto mb-12 mt-6 px-6 rounded-lg">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">Name:</label>
                <input type="text" name="name" id="name" required className="w-full px-3 py-2 border border-gray-300 rounded" />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">Email:</label>
                <input type="email" name="email" id="email" required className="w-full px-3 py-2 border border-gray-300 rounded" />
              </div>

              <div>
                <label htmlFor="subject" className="block text-gray-700 mb-2">Subject:</label>
                <input type="text" name="subject" id="subject" required className="w-full px-3 py-2 border border-gray-300 rounded" />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">Message:</label>
                <textarea name="message" id="message" rows={4} required className="w-full px-3 py-2 border border-gray-300 rounded"></textarea>
              </div>
            <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 rounded text-white ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                }`}
            >
                 {loading ? 'Sending...' : 'Send Message ➤'}
            </button>
             
            
            </div>
            {status && (
            <p className={`text-sm mt-2 ${statusType === 'error' ? 'text-red-500' : 'text-green-600'}`}>
            {status}
          </p>
        )}

          </form>
        </div>
      </div>
    </section>
  );
};
export default Contact;