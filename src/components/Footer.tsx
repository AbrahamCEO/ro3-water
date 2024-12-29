import { Phone, Mail, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span>0861 - 762 - 747</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <a href="mailto:frontdesk@ro3water.co.na" className="hover:text-blue-300 transition">
                  frontdesk@ro3water.co.na
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-300 transition">Water</a></li>
              <li><a href="#" className="hover:text-blue-300 transition">Products</a></li>
              <li><a href="#" className="hover:text-blue-300 transition">About RO3 Water</a></li>
              <li><a href="#" className="hover:text-blue-300 transition">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Useful links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-300 transition">Store Locator</a></li>
              <li><a href="#" className="hover:text-blue-300 transition">Legal</a></li>
              <li><a href="#" className="hover:text-blue-300 transition">Assets</a></li>
              <li><a href="#" className="hover:text-blue-300 transition">Consent Preferences</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Social links</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-300 transition">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-blue-300 transition">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-12 pt-8 text-center text-sm">
          <p>Copyright © RO3 Water (Pty) Ltd 2024 | All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}