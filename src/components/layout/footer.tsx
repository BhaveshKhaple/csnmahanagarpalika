import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { ROUTES } from '@/lib/constants/routes';

const footerLinks = {
  services: [
    { label: 'मालमत्ता कर', href: ROUTES.CITIZEN.PROPERTY_TAX },
    { label: 'पाणीपट्टी', href: ROUTES.CITIZEN.WATER_BILLS },
    { label: 'तक्रार नोंदवा', href: ROUTES.PUBLIC.COMPLAINTS.NEW },
    { label: 'तक्रार स्थिती तपासा', href: ROUTES.PUBLIC.COMPLAINTS.TRACK },
  ],
  quickLinks: [
    { label: 'मुख्यपृष्ठ', href: ROUTES.PUBLIC.HOME },
    { label: 'आमच्याबद्दल', href: ROUTES.PUBLIC.ABOUT.BASE },
    { label: 'सेवा', href: ROUTES.PUBLIC.SERVICES.BASE },
    { label: 'संपर्क', href: ROUTES.PUBLIC.CONTACT },
  ],
  information: [
    { label: 'RTI', href: ROUTES.RTI },
    { label: 'FAQ', href: ROUTES.FAQ },
    { label: 'गोपनीयता धोरण', href: '/privacy' },
    { label: 'अस्वीकरण', href: '/disclaimer' },
  ],
  government: [
    { label: 'Digital India', href: 'https://dic.gov.in/' },
    { label: 'Make in India', href: 'https://www.makeinindia.com/' },
    { label: 'MyGov', href: 'https://www.mygov.in/' },
    { label: 'Aaple Sarkar', href: 'https://aaplesarkar.mahaonline.gov.in/en' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white mt-auto">
      {/* Main Footer */}
      <div className="container-custom py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* About Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">CSMC</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">छत्रपती संभाजीनगर</h3>
                <p className="text-sm text-gray-400">महानगरपालिका</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              छत्रपती संभाजीनगर महानगरपालिका आपल्या शहराच्या विकासासाठी आणि नागरिकांच्या सेवेसाठी कार्यरत आहे.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <MapPin size={18} className="text-orange-500 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  मुख्य इमारत, टाऊन हॉल,<br />
                  हेड पोस्ट ऑफिसच्या मागे,<br />
                  छत्रपती संभाजी नगर, ४३१००१
                </span>
              </div>
              <a href="tel:+911234567890" className="flex items-center gap-3 text-sm hover:text-orange-500 transition">
                <Phone size={18} className="text-orange-500 flex-shrink-0" />
                <span>+91-1234567890</span>
              </a>
              <a href="mailto:info@chhsambhajinagarmc.org" className="flex items-center gap-3 text-sm hover:text-orange-500 transition">
                <Mail size={18} className="text-orange-500 flex-shrink-0" />
                <span>info@chhsambhajinagarmc.org</span>
              </a>
            </div>

            {/* Social Media */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.facebook.com/commr.abdmahapalika"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/csmcmahapalika/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-sky-500 rounded-full flex items-center justify-center transition-all hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://www.youtube.com/channel/UCfty7aRYvcL3evtdIVytYUg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-red-600 rounded-full flex items-center justify-center transition-all hover:scale-110"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-lg font-bold mb-4">सेवा</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-400 hover:text-orange-500 transition text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-bold mb-4">द्रुत लिंक</h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-400 hover:text-orange-500 transition text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-lg font-bold mb-4 mt-6">माहिती</h3>
            <ul className="space-y-2">
              {footerLinks.information.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-400 hover:text-orange-500 transition text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Government Links Column */}
          <div>
            <h3 className="text-lg font-bold mb-4">शासकीय लिंक्स</h3>
            <ul className="space-y-2">
              {footerLinks.government.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-orange-500 transition text-sm flex items-center gap-1 group"
                  >
                    {link.label}
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Visitor Counter */}
            <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="text-xs text-gray-400 mb-1">एकूण भेटी</div>
              <div className="text-2xl font-bold text-orange-500">1,50,448</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; 2026 छत्रपती संभाजीनगर महानगरपालिका. सर्व हक्क राखीव.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-orange-500 transition">
                गोपनीयता धोरण
              </Link>
              <Link href="/terms" className="hover:text-orange-500 transition">
                अटी व शर्ती
              </Link>
              <Link href="/sitemap" className="hover:text-orange-500 transition">
                साइटमॅप
              </Link>
            </div>
          </div>
          <div className="text-center mt-4 text-xs text-gray-500">
            Designed & Developed with ❤️ for Smart Cities
          </div>
        </div>
      </div>
    </footer>
  );
}
