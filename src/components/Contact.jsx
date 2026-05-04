import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import PropTypes from "prop-types";
import emailjs from "@emailjs/browser";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
  FaTimes,
} from "react-icons/fa";

const EMAIL = "imuhammadraza53@gmail.com";
const PHONE = "0306-0962761";
const LOCATION = "Islamabad";

/* ---------------- TOAST ---------------- */
function Toast({ toasts, removeToast }) {
  const icons = {
    success: <FaCheckCircle className="text-green-400 text-sm" />,
    error: <FaTimesCircle className="text-red-400 text-sm" />,
    warning: <FaExclamationCircle className="text-yellow-400 text-sm" />,
  };

  const bars = {
    success: "bg-green-400",
    error: "bg-red-400",
    warning: "bg-yellow-400",
  };

  return (
    <div className="fixed bottom-6 left-6 z-[9999] flex flex-col gap-2 w-64 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative pointer-events-auto overflow-hidden rounded-xl bg-[#1a1a2e] border border-white/10 shadow-lg backdrop-blur-md"
          >
            <div className="flex items-start gap-2 p-3 pr-8">
              {icons[t.type]}

              <div className="flex flex-col">
                <p className="text-white text-xs font-semibold">
                  {t.title}
                </p>
                {t.message && (
                  <p className="text-white/60 text-[10px]">
                    {t.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => removeToast(t.id)}
              className="absolute top-2 right-2 text-white/40"
            >
              <FaTimes className="text-[10px]" />
            </button>

            <motion.div
              className={`absolute bottom-0 left-0 h-[2px] ${bars[t.type]}`}
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 5, ease: "linear" }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- PROP TYPES FIX ---------------- */
Toast.propTypes = {
  toasts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.oneOf(["success", "error", "warning"]).isRequired,
      title: PropTypes.string.isRequired,
      message: PropTypes.string,
    })
  ).isRequired,
  removeToast: PropTypes.func.isRequired,
};

/* ---------------- MAIN COMPONENT ---------------- */
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

  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ type, title, message }) => {
    const id = Date.now();

    setToasts((prev) => [...prev, { id, type, title, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      addToast({
        type: "warning",
        title: "Missing Fields",
        message: "Please fill all fields",
      });
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
        addToast({
          type: "success",
          title: "Message Sent",
          message: "Successfully delivered",
        });

        setName("");
        setEmail("");
        setMessage("");
        setLoading(false);
      })
      .catch(() => {
        addToast({
          type: "error",
          title: "Failed",
          message: "Try again later",
        });

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
      <Toast toasts={toasts} removeToast={removeToast} />

      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-10">
          Contact <span className="text-primary">Me</span>
        </h2>

        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md mb-8">
          <p className="text-white/70 text-lg mb-6">
            Reach out via email or call me directly.
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

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-5">
            <h3 className="text-2xl font-bold text-white">Send Message</h3>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full p-4 rounded-2xl bg-black/20 text-white border border-white/10"
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="w-full p-4 rounded-2xl bg-black/20 text-white border border-white/10"
            />

            <textarea
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Message"
              className="w-full p-4 rounded-2xl bg-black/20 text-white border border-white/10"
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-primary text-white font-semibold"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>

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