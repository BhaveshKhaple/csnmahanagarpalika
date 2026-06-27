import PageShell from '@/components/pages/page-shell';

const transactions = [
  { label: 'मालमत्ता कर', amount: '₹2,400', status: 'यशस्वी' },
  { label: 'पाणीपट्टी', amount: '₹860', status: 'प्रलंबित' },
  { label: 'परवाना शुल्क', amount: '₹1,500', status: 'यशस्वी' },
];

export default function PaymentsPage() {
  return (
    <PageShell
      eyebrow="Payments"
      title="पेमेंट केंद्र"
      description="नागरिक सेवांशी संबंधित सर्व शुल्क आणि व्यवहारांचा एकत्रित आढावा."
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-8 items-start">
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.label} className="rounded-3xl border border-gray-200 bg-gray-50 p-5 flex items-center justify-between gap-4">
              <div>
                <div className="text-lg font-semibold text-gray-900">{transaction.label}</div>
                <div className="text-sm text-gray-600">एकत्रित व्यवहार सारांश</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-gray-900">{transaction.amount}</div>
                <div className="text-sm text-primary-700">{transaction.status}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-slate-950 p-5 text-white space-y-4">
          <h2 className="text-2xl font-bold">पेमेंट पर्याय</h2>
          <div className="space-y-2 text-white/80">
            <div>• UPI</div>
            <div>• कार्ड</div>
            <div>• नेट बँकिंग</div>
            <div>• वॉलेट</div>
          </div>
          <button type="button" className="btn-primary">
            नवीन पेमेंट करा
          </button>
        </div>
      </div>
    </PageShell>
  );
}