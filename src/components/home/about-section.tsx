import { Card, CardBody } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2, Users, Award, TrendingUp, Landmark } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            आमच्याबद्दल
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            आपल्या महानगरपालिकेविषयी
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            छत्रपती संभाजी महाराजांच्या नावावर असलेली ही ऐतिहासिक शहरी संस्था
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
          {/* Left - Image */}
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-orange-200 to-red-200 rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <Landmark className="text-orange-700" size={110} strokeWidth={1.6} />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-orange-600 text-white p-6 rounded-xl shadow-lg animate-bounce-slow">
              <div className="text-3xl font-bold">1936</div>
              <div className="text-sm">स्थापना वर्ष</div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-6">
            <Card className="border-l-4 border-orange-600">
              <CardBody>
                <p className="text-lg text-gray-700 leading-relaxed">
                  छत्रपती संभाजीनगर महानगरपालिका (CSMC) ही महाराष्ट्रातील ऐतिहासिक आणि 
                  सांस्कृतिकदृष्ट्या समृद्ध शहर छत्रपती संभाजीनगरच्या प्रशासन आणि विकासासाठी 
                  जबाबदार असलेली प्रशासकीय संस्था आहे.
                </p>
              </CardBody>
            </Card>

            <Card className="border-l-4 border-blue-600">
              <CardBody>
                <p className="text-lg text-gray-700 leading-relaxed">
                  छत्रपती संभाजी महाराजांच्या सन्मानार्थ हे नाव देण्यात आलेले आहे, हे शहर 
                  वारसा, शिक्षण, उद्योग आणि आधुनिकतेच्या अद्वितीय संगमासाठी ओळखले जाते.
                </p>
              </CardBody>
            </Card>

            <Button className="bg-orange-600 hover:bg-orange-700 group">
              अधिक वाचा
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition" size={18} />
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <Card hover className="text-center border-t-4 border-orange-600">
            <CardBody>
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Building2 className="text-orange-600" size={32} />
              </div>
              <h3 className="font-bold text-xl mb-2">437 km²</h3>
              <p className="text-gray-600 text-sm">एकूण क्षेत्र</p>
            </CardBody>
          </Card>

          <Card hover className="text-center border-t-4 border-blue-600">
            <CardBody>
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="text-blue-600" size={32} />
              </div>
              <h3 className="font-bold text-xl mb-2">12 लाख+</h3>
              <p className="text-gray-600 text-sm">लोकसंख्या</p>
            </CardBody>
          </Card>

          <Card hover className="text-center border-t-4 border-green-600">
            <CardBody>
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="text-green-600" size={32} />
              </div>
              <h3 className="font-bold text-xl mb-2">115</h3>
              <p className="text-gray-600 text-sm">प्रभाग</p>
            </CardBody>
          </Card>

          <Card hover className="text-center border-t-4 border-purple-600">
            <CardBody>
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-purple-600" size={32} />
              </div>
              <h3 className="font-bold text-xl mb-2">50+</h3>
              <p className="text-gray-600 text-sm">ऑनलाइन सेवा</p>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}
