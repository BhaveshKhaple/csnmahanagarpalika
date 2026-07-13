'use client';

import React from 'react';
import { Card, CardBody } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/i18n/LanguageContext';

interface ConfirmationReceiptProps {
  complaintNumber: string;
  guestMode?: boolean;
}

export function ConfirmationReceipt({ complaintNumber, guestMode }: ConfirmationReceiptProps) {
  const router = useRouter();
  const { locale } = useTranslation();

  const trackPath = guestMode ? '/complaints/track' : '/citizen/complaints/track';

  const texts = {
    success: locale === 'mr' ? 'तक्रार यशस्वीरित्या नोंदवली!' : 'Complaint Registered Successfully!',
    numberLabel: locale === 'mr' ? 'तुमची तक्रार क्रमांक:' : 'Your Complaint Number:',
    description: locale === 'mr' 
      ? 'तुमची तक्रार संबंधित विभागाकडे पाठवण्यात आली आहे. तुम्हाला SMS आणि Email द्वारे अपडेट मिळेल.' 
      : 'Your complaint has been forwarded to the concerned department. You will receive updates via SMS and Email.',
    trackBtn: locale === 'mr' ? 'तक्रार ट्रॅक करा' : 'Track Complaint',
    newBtn: locale === 'mr' ? 'नवीन तक्रार नोंदवा' : 'File New Complaint'
  };

  return (
    <div className="min-h-[50vh] bg-gray-50 py-8 flex items-center justify-center">
      <div className="container-custom max-w-2xl">
        <Card className="text-center">
          <CardBody className="py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-600" size={48} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {texts.success}
            </h2>
            <p className="text-gray-600 mb-2">{texts.numberLabel}</p>
            <p className="text-3xl font-bold text-orange-600 mb-6">{complaintNumber}</p>
            <p className="text-gray-600 mb-8">
              {texts.description}
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => router.push(trackPath)}
                className="bg-orange-600 hover:bg-orange-700"
              >
                {texts.trackBtn}
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.reload()}
              >
                {texts.newBtn}
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
