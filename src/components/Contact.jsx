import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

const EMAIL = "imuhammadraza53@gmail.com";
const PHONE = "0306-0962761";
const LOCATION = "Islamabad";

export default function Contact() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    emailjs
      .send(
        "service_uw3vdyl",
        "template_z3f96ia",
        {
          from_name: name,
          from_email: email,
          message,
        },
        "I3kmaWk4nlrKIj1RS"
      )
      .then(() => {
        alert("Message Sent Successfully!");
        setName("");
        setEmail("");
        setMessage("");
        setLoading(false);
      })
      .catch(() => {
        alert("Failed To Send");
        setLoading(false);
      });
  };

  return (
    <motion.section
      ref={ref}
      id="contact"
      style={{ y }}
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* HEADING */}
        <h2 className="text-4xl font-bold text-white mb-10">
          Contact <span className="text-primary">Me</span>
        </h2>

        {/* TOP */}
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md mb-8">
          <p className="text-white/70 text-lg mb-6">
            Reach out via email or give me a call.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-primary text-white font-semibold"
            >
              <FaEnvelope />
              Email Me
            </a>

            <a
              href={`tel:${PHONE}`}
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border border-white/20 text-white font-semibold"
            >
              <FaPhoneAlt />
              Call Me
            </a>
          </div>
        </div>

        {/* MAIN */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-5"
          >
            <h3 className="text-2xl font-bold text-white">
              Send Message
            </h3>

            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 rounded-2xl bg-black/20 border border-white/10 text-white"
            />

            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-2xl bg-black/20 border border-white/10 text-white"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-4 rounded-2xl bg-black/20 border border-white/10 text-white"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-primary text-white font-semibold"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* RIGHT */}
          <div className="space-y-8">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
              <h3 className="text-2xl font-bold text-white mb-6">
                Contact Details
              </h3>

              <div className="space-y-4 text-white/80">
                <p className="flex gap-3 items-center">
                  <FaEnvelope className="text-primary" />
                  {EMAIL}
                </p>

                <p className="flex gap-3 items-center">
                  <FaPhoneAlt className="text-primary" />
                  {PHONE}
                </p>

                <p className="flex gap-3 items-center">
                  <FaMapMarkerAlt className="text-primary" />
                  {LOCATION}
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
              <h3 className="text-2xl font-bold text-white mb-6">
                Connect With Me
              </h3>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://github.com/muhammadraza9"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border border-white/10 text-white"
                >
                  <FaGithub />
                  GitHub
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border border-white/10 text-white"
                >
                  <FaLinkedin />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}