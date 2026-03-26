import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Company Info */}
          <div className="text-center md:text-left">
            <h2 className="text-lg sm:text-xl font-semibold text-red-600 mb-3">
              TastyHub
            </h2>

            <p className="text-xs sm:text-sm text-gray-600 max-w-sm mx-auto md:mx-0">
              Your favorite food, delivered fast and fresh to your doorstep.
            </p>

            {/* Social Icons */}
            <div className="flex justify-center md:justify-start gap-4 mt-4">
              <a href="#" className="text-gray-500 hover:text-red-600 transition">
                <Facebook size={18} />
              </a>

              <a href="#" className="text-gray-500 hover:text-red-600 transition">
                <Instagram size={18} />
              </a>

              <a href="#" className="text-gray-500 hover:text-red-600 transition">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-gray-800 font-medium mb-3 text-sm sm:text-base">
              Quick Links
            </h3>

            <ul className="space-y-2 text-xs sm:text-sm text-gray-600">

              <li>
                <Link
                  to="/menu"
                  className="hover:text-red-600 transition duration-200"
                >
                  Our Menu
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="hover:text-red-600 transition duration-200"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="hover:text-red-600 transition duration-200"
                >
                  About Us
                </Link>
              </li>

            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-gray-800 font-medium mb-3 text-sm sm:text-base">
              Contact Us
            </h3>

            <ul className="space-y-3 text-xs sm:text-sm text-gray-600">

              <li className="flex items-center justify-center md:justify-start gap-2">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>Kolkata, West Bengal</span>
              </li>

              <li className="flex items-center justify-center md:justify-start gap-2">
                <Phone className="w-4 h-4 text-red-500" />

                <a
                  href="tel:+919876543210"
                  className="hover:text-red-600 transition"
                >
                  +91 98765 43210
                </a>
              </li>

              <li className="flex items-center justify-center md:justify-start gap-2">
                <Mail className="w-4 h-4 text-red-500" />

                <a
                  href="mailto:support@tastyhub.com"
                  className="hover:text-red-600 transition"
                >
                  support@tastyhub.com
                </a>
              </li>

            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-6 pt-4 text-center text-xs sm:text-sm text-gray-500">

          © {year} TastyHub. All rights reserved.

        </div>

      </div>
    </footer>
  );
};

export default Footer;