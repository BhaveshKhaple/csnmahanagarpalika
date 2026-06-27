import PageShell from '@/components/pages/page-shell';

export default function GisMapPage() {
  return (
    <PageShell eyebrow="GIS Map" title="GIS नकाशा" description="भौगोलिक तक्रार, मालमत्ता आणि विभागीय overlays.">
      <div className="rounded-3xl bg-gradient-to-br from-primary-100 to-slate-200 p-8 text-center text-gray-700">
        <div className="text-2xl font-bold text-gray-900 mb-2">Interactive Map Placeholder</div>
        <p>मॅप, pins, complaint clusters आणि ward overlays पुढील टप्प्यात एकत्र केले जातील.</p>
      </div>
    </PageShell>
  );
}