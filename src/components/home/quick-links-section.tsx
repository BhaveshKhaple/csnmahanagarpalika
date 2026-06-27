import {
  Building2,
  ExternalLink,
  Factory,
  Globe,
  HandCoins,
  Landmark,
  ListChecks,
  Play,
  Smartphone,
  Users,
} from 'lucide-react';

const governmentLinks = [
  { name: 'Digital India', url: 'https://dic.gov.in/', Icon: Globe },
  { name: 'India Services', url: 'https://services.india.gov.in/', Icon: Landmark },
  { name: 'IGOD', url: 'https://igod.gov.in/', Icon: Smartphone },
  { name: 'Make in India', url: 'https://www.makeinindia.com/', Icon: Factory },
  { name: 'Incredible India', url: 'https://www.incredibleindia.gov.in/en', Icon: Building2 },
  { name: 'PMO India', url: 'https://www.pmindia.gov.in/en/', Icon: Building2 },
  { name: 'MyGov', url: 'https://www.mygov.in/', Icon: Users },
  { name: 'PMNRF', url: 'https://pmnrf.gov.in/en/', Icon: HandCoins },
  { name: 'Aaple Sarkar', url: 'https://aaplesarkar.mahaonline.gov.in/en', Icon: ListChecks },
];

export default function QuickLinksSection() {
  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <h3 className="text-center text-xl font-bold text-gray-900 mb-8">
          महत्वाचे शासकीय पोर्टल
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {governmentLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-gray-200 rounded-full hover:border-orange-500 hover:bg-orange-50 transition-all duration-300 hover:shadow-md hover:scale-105"
            >
              <link.Icon size={18} className="text-gray-600 group-hover:text-orange-600" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600">
                {link.name}
              </span>
              <ExternalLink size={14} className="text-gray-400 group-hover:text-orange-500 opacity-0 group-hover:opacity-100 transition" />
            </a>
          ))}
        </div>

        {/* Download Apps Section */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 text-white">
            <h4 className="text-2xl font-bold mb-4">माय स्मार्ट नागरिक अ‍ॅप</h4>
            <p className="mb-6 text-white/90">सर्व सेवा आता आपल्या मोबाइलवर</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-xl hover:bg-gray-100 transition font-medium"
              >
                <Smartphone size={24} className="text-orange-600" />
                <div className="text-left">
                  <div className="text-xs text-gray-600">Download on</div>
                  <div className="text-sm font-bold">App Store</div>
                </div>
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-xl hover:bg-gray-100 transition font-medium"
              >
                <Play size={24} className="text-green-600" />
                <div className="text-left">
                  <div className="text-xs text-gray-600">Get it on</div>
                  <div className="text-sm font-bold">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
