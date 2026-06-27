'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Bus,
  Calendar,
  Droplets,
  Eye,
  HardHat,
  MonitorSmartphone,
  Route,
  Trees,
  Trash2,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const newsItems = [
  {
    id: 1,
    title: 'छत्रपती संभाजीनगर स्मार्ट सिटी प्रकल्पात नवीन विकास',
    date: '20 जून 2026',
    category: 'स्मार्ट सिटी',
    views: 3250,
    Icon: HardHat,
    description: 'स्मार्ट सिटी प्रकल्पांतर्गत नवीन CCTV कॅमेरे आणि स्मार्ट स्ट्रीट लाइट्स बसवण्यात येणार',
  },
  {
    id: 2,
    title: 'महानगरपालिकेच्या ऑनलाइन सेवा सुरू',
    date: '18 जून 2026',
    category: 'डिजिटल',
    views: 4300,
    Icon: MonitorSmartphone,
    description: 'नागरिक आता घरबसल्या मालमत्ता कर, पाणीपट्टी आणि इतर सेवांसाठी ऑनलाइन अर्ज करू शकतात',
  },
  {
    id: 3,
    title: 'स्वच्छता अभियान अंतर्गत ५००० टन कचरा प्रक्रिया',
    date: '15 जून 2026',
    category: 'स्वच्छता',
    views: 2850,
    Icon: Trash2,
    description: 'शहरातील सर्व प्रभागांमध्ये स्वच्छता मोहीम राबवून कचरा व्यवस्थापनात सुधारणा',
  },
  {
    id: 4,
    title: 'सिडको येथे नवीन मनोरंजन पार्क उद्घाटन',
    date: '12 जून 2026',
    category: 'सुविधा',
    views: 1980,
    Icon: Trees,
    description: 'नागरिकांसाठी १० एकर क्षेत्रावर आधुनिक सुविधांसह मनोरंजन पार्क तयार',
  },
  {
    id: 5,
    title: 'शहरातील ५० किमी रस्ते डांबरीकरण पूर्ण',
    date: '10 जून 2026',
    category: 'पायाभूत',
    views: 2560,
    Icon: Route,
    description: 'प्रमुख रस्त्यांचे डांबरीकरण पूर्ण, नागरिकांना सुखावह प्रवास',
  },
  {
    id: 6,
    title: '२४×७ पाणीपुरवठा योजना सुरू',
    date: '8 जून 2026',
    category: 'पाणी',
    views: 3100,
    Icon: Droplets,
    description: 'शहरातील सर्व भागात २४ तास पाणी पुरवठा सुरू करण्यात येणार',
  },
  {
    id: 7,
    title: 'महापौरांनी केली नागरिकांशी संवाद सभा',
    date: '5 जून 2026',
    category: 'प्रशासन',
    views: 1750,
    Icon: Users,
    description: 'नागरिकांच्या समस्या ऐकून त्वरित निराकरणाचे आश्वासन',
  },
  {
    id: 8,
    title: 'शहरात नवीन ५० इलेक्ट्रिक बस सेवा',
    date: '1 जून 2026',
    category: 'परिवहन',
    views: 2890,
    Icon: Bus,
    description: 'पर्यावरणपूरक वाहतूक व्यवस्था सुरू, नागरिकांना सवलत दरात प्रवास',
  },
];

export default function NewsSection() {
  const [showAll, setShowAll] = useState(false);
  const displayedNews = showAll ? newsItems : newsItems.slice(0, 6);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            ताज्या बातम्या
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            बातम्या आणि अद्यावत घडामोडी
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            महानगरपालिकेच्या सर्व महत्वाच्या घडामोडी आणि अपडेट्स
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayedNews.map((news) => (
            <Link key={news.id} href={`/news/${news.id}`} className="group">
              <Card hover className="overflow-hidden h-full">
                {/* Image */}
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-blue-700 group-hover:scale-110 transition-transform duration-300">
                    <news.Icon size={68} strokeWidth={1.5} />
                  </div>
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold px-3 py-1 rounded-full">
                      {news.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {news.title}
                  </h3>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{news.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye size={14} />
                      <span>{news.views}</span>
                    </div>
                  </div>

                  {/* Read More Link */}
                  <div className="mt-4 flex items-center text-orange-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>अधिक वाचा</span>
                    <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button 
            size="lg"
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="group"
          >
            {showAll ? 'कमी बातम्या दाखवा' : 'सर्व बातम्या पहा'}
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">500+</div>
            <div className="text-gray-600">प्रकाशित बातम्या</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
            <div className="text-gray-600">वाचक</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
            <div className="text-gray-600">अपडेट्स</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">10+</div>
            <div className="text-gray-600">विभाग</div>
          </div>
        </div>
      </div>
    </section>
  );
}
