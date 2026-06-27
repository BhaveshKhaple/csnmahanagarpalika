import Link from 'next/link';

import { Card, CardBody } from '@/components/ui/card';
import { ROUTES } from '@/lib/constants/routes';

const notifications = [
  {
    title: 'मालमत्ता कर सवलत अंतिम आठवडा',
    detail: '25 जूनपूर्वी पेमेंट केल्यास सवलतीचा लाभ घ्या.',
    time: '2 तासांपूर्वी',
  },
  {
    title: 'पाणीपुरवठा वेळापत्रक अपडेट',
    detail: 'वार्ड 4 आणि 7 मध्ये उद्या सकाळी देखभाल कामे.',
    time: 'आज, 10:30 AM',
  },
  {
    title: 'नवीन तक्रार स्थिती उपलब्ध',
    detail: 'आपली ड्रेनेज तक्रार विभागाकडे नियुक्त झाली आहे.',
    time: 'आज, 9:05 AM',
  },
];

const quickPrompts = [
  'माझी तक्रार कशी ट्रॅक करू?',
  'मालमत्ता कर भरण्याची पद्धत काय आहे?',
  'जन्म प्रमाणपत्रासाठी काय लागते?',
];

export default function AssistantNotificationsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-semibold tracking-[0.25em] text-primary-700 uppercase mb-3">
              AI Assistant + Notifications
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">त्वरित मदत आणि महत्वाच्या सूचना</h2>
            <p className="text-gray-600 max-w-2xl">
              नागरिकांना साधे प्रश्न विचारता येतील आणि ताज्या महत्त्वाच्या सूचना लगेच दिसतील.
            </p>
          </div>
          <Link href={ROUTES.AI_ASSISTANT} className="btn-outline inline-flex self-start md:self-auto">
            AI Assistant उघडा
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6">
          <Card className="border border-gray-100 shadow-sm">
            <CardBody className="space-y-5">
              <div className="rounded-3xl bg-slate-950 p-5 text-white">
                <div className="text-sm text-white/60 mb-2">Smart Helper</div>
                <div className="text-2xl font-bold mb-3">नमस्कार! मी तुमचा नगर सहाय्यक आहे.</div>
                <p className="text-white/75 leading-7">
                  तक्रारी, कर, प्रमाणपत्रे, वेळापत्रक आणि मूलभूत सेवा माहितीमध्ये मी मदत करू शकतो.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">सामान्य प्रश्न</h3>
                <div className="space-y-3">
                  {quickPrompts.map((prompt) => (
                    <div key={prompt} className="rounded-2xl bg-gray-50 px-4 py-3 text-gray-700">
                      {prompt}
                    </div>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="border border-gray-100 shadow-sm">
            <CardBody>
              <div className="flex items-center justify-between gap-3 mb-5">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">सूचना केंद्र</h3>
                  <p className="text-sm text-gray-600">अद्ययावत, इशारे आणि सेवा नोटिफिकेशन्स</p>
                </div>
                <Link href={ROUTES.CITIZEN.NOTIFICATIONS} className="text-sm font-medium text-primary-700 hover:text-primary-800">
                  सर्व पहा
                </Link>
              </div>

              <div className="space-y-3">
                {notifications.map((item) => (
                  <div key={item.title} className="rounded-2xl bg-gray-50 p-4">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <span className="text-xs text-gray-500 whitespace-nowrap">{item.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-6">{item.detail}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}