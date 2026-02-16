import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:justify-between gap-8">

          {/* Company Info */}
          <div className="text-center md:text-left">
            <h2 className="text-lg sm:text-xl font-semibold text-red-600 mb-3">
              TastyHub
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-sm mx-auto md:mx-0">
              Your favorite food, delivered fast and fresh to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-gray-800 font-medium mb-3 text-sm sm:text-base">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
              <li>
                <Link to="/menu" className="hover:text-red-600 transition">
                  Our Menu
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-red-600 transition">
                  Contact
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
          © 2026 TastyHub. All rights reserved.
        </div>

      </div>
    </footer>



  );
};

export default Footer;
