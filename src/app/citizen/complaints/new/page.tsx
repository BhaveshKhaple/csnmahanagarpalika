'use client';

import { ComplaintForm } from '@/components/forms/complaint-form';

export default function NewComplaintPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ComplaintForm guestMode={false} />
    </div>
  );
}
