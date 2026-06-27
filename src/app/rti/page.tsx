import PageShell from '@/components/pages/page-shell';

const rtiItems = [
  'माहितीचा अधिकार कायद्याशी संबंधित अर्ज प्रवाह',
  'विभागीय संपर्क आणि जबाबदार अधिकारी',
  'अर्ज शुल्क, कालमर्यादा आणि उत्तर प्रक्रिया',
];

export default function RtiPage() {
  return (
    <PageShell
      eyebrow="RTI"
      title="माहितीचा अधिकार"
      description="माहिती मागणी, अर्ज प्रक्रिया आणि संदर्भ माहिती एकत्र."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">मुख्य मुद्दे</h2>
          <ul className="space-y-3">
            {rtiItems.map((item) => (
              <li key={item} className="rounded-2xl bg-gray-50 p-4 text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-primary-50 p-6">
          <p className="text-gray-700 leading-7">
            पुढील टप्प्यात येथे RTI अर्ज सबमिशन, डाउनलोड करण्यायोग्य फॉर्म आणि ट्रॅकिंग सुविधा जोडता येतील.
          </p>
        </div>
      </div>
    </PageShell>
  );
}