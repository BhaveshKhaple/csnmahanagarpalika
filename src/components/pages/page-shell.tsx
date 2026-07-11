import type { ReactNode } from 'react';

import { Card, CardBody } from '@/components/ui/card';

interface PageShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}

export default function PageShell({ eyebrow, title, description, children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <section className="py-16 md:py-20">
        <div className="container-custom">
          <div className="max-w-3xl mb-10">
            <p className="text-sm font-semibold tracking-[0.3em] text-primary-700 uppercase mb-3">
              {eyebrow}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h1>
            <p className="text-lg text-gray-600">{description}</p>
          </div>

          <Card className="border border-gray-100 shadow-sm">
            <CardBody>{children}</CardBody>
          </Card>
        </div>
      </section>
    </div>
  );
}