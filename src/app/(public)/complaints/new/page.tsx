'use client';

import { ComplaintForm } from '@/components/forms/complaint-form';
import { Breadcrumb } from '@/components/shared/breadcrumb';

export default function PublicNewComplaintPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-4">
          <Breadcrumb />
        </div>
      </div>
      <ComplaintForm guestMode={true} />
    </div>
  );
}
