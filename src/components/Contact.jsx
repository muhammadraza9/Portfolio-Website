import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const EMAIL = 'imuhammadraza53@gmail.com';
const PHONE = '0306-0962761';
const LOCATION = 'Islamabad';

const SOCIAL = [
  { label: 'GitHub', href: 'https://github.com/muhammadraza9' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/muhammadraza9' },
];

export default function Contact() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 0.5], [24, -24]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);

    emailjs
      .send(
        'service_uw3vdyl',
        'template_z3f96ia',
        {
          from_name: name,
          from_email: email,
          message,
        },
        'I3kmaWk4nlrKIj1RS'
      )
      .then(() => {
        alert('Message sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
        setLoading(false);
      })
      .catch(() => {
        alert('Failed to send message');
        setLoading(false);
      });
  };

  return (
    <motion.section
      ref={ref}
      id="contact"
      style={{ y }}
      className="relative py-24 px-6 z-10"
    >
      <div className="max-w-5xl mx-auto">

        {/* HEADING */}
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-white mb-10 text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Contact <span className="text-primary">Me</span>
        </motion.h2>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">

          {/* FORM */}
          <motion.form
            onSubmit={handleSubmit}
            className="glass-card p-6 space-y-4 md:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white">
              Send Message
            </h3>

            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-primary"
            />

            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-primary"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-primary"
            />

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium transition-colors w-full"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </motion.form>

          {/* RIGHT SIDE */}
          <motion.div
            className="glass-card p-6 text-white/80 flex flex-col justify-between"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Get in Touch
              </h3>

              <p className="text-white/70 mb-4">
                Feel free to reach out for projects or collaboration.
              </p>

              <div className="space-y-1 text-white/70">
                <p><span className="text-primary">Email:</span> {EMAIL}</p>
                <p><span className="text-primary">Phone:</span> {PHONE}</p>
                <p><span className="text-primary">Location:</span> {LOCATION}</p>
              </div>
            </div>

            {/* SOCIAL BUTTONS (same style as Get in Touch) */}
            <div className="pt-6 flex justify-center gap-6">
              {SOCIAL.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium transition-colors text-center"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}