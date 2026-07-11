'use client';

import { CheckCircle2, Copy, Share2, Download } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils/cn';

interface ConfirmationReceiptProps {
  /** The complaint reference ID — shown prominently */
  complaintId: string;
  /** Timestamp of submission */
  submittedAt: string;
  /** Category label in Marathi */
  categoryMr: string;
  /** Optional short description preview */
  descriptionPreview?: string;
  className?: string;
}

/**
 * ConfirmationReceipt — shown after successful guest complaint submission.
 *
 * Spec: "On submit: show a complaint ID clearly, with instructions in Marathi on
 * how to check status later, and an option to save/screenshot it."
 * — csmc-website-redesign-spec.md §5.3
 * — csmc-adaptation-instructions.md §3
 *
 * Cross-device continuity: the complaint ID is the user's handle to resume
 * from any device. The "Copy" affordance makes it trivial to save.
 * — csmc-website-redesign-spec.md §8.6 / REQ-DEV-06
 *
 * This is a 'use client' component — it needs clipboard access.
 */
export function ConfirmationReceipt({
  complaintId,
  submittedAt,
  categoryMr,
  descriptionPreview,
  className,
}: ConfirmationReceiptProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(complaintId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback: select text manually
      const el = document.getElementById('complaint-id-text');
      if (el) {
        const range = document.createRange();
        range.selectNodeContents(el);
        window.getSelection()?.removeAllRanges();
        window.getSelection()?.addRange(range);
      }
    }
  }

  const formattedDate = (() => {
    try {
      const d = new Date(submittedAt);
      return d.toLocaleString('mr-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return submittedAt;
    }
  })();

  return (
    <div
      className={cn(
        'rounded-2xl border-2 border-green-200 bg-green-50 p-6 shadow-sm',
        className
      )}
      role="region"
      aria-label="तक्रार नोंदणी पावती"
    >
      {/* Success header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 size={22} className="text-green-600" aria-hidden />
        </div>
        <div>
          <h2 className="text-base font-bold text-green-800">तक्रार यशस्वीरीत्या नोंदवली गेली!</h2>
          <p className="text-xs text-green-600">Complaint registered successfully</p>
        </div>
      </div>

      {/* Complaint ID — the most important element */}
      <div className="mb-5 rounded-xl bg-white border border-green-200 p-4">
        <p className="text-xs font-medium text-gray-500 mb-1">तक्रार क्रमांक (Complaint ID)</p>
        <div className="flex items-center gap-3">
          <span
            id="complaint-id-text"
            className="flex-1 font-mono text-xl font-bold tracking-wider text-gray-900 select-all"
            aria-label={`तक्रार क्रमांक: ${complaintId}`}
          >
            {complaintId}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className={cn(
              'flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-lg px-3 text-sm font-medium transition-all',
              copied
                ? 'bg-green-100 text-green-700'
                : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
            )}
            aria-label={copied ? 'क्रमांक कॉपी केला' : 'क्रमांक कॉपी करा'}
          >
            {copied ? (
              <>
                <CheckCircle2 size={14} aria-hidden />
                <span>कॉपी</span>
              </>
            ) : (
              <>
                <Copy size={14} aria-hidden />
                <span>कॉपी करा</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Details */}
      <dl className="grid grid-cols-2 gap-3 text-sm mb-5">
        <div>
          <dt className="text-xs text-gray-500">प्रकार</dt>
          <dd className="font-medium text-gray-900">{categoryMr}</dd>
        </div>
        <div>
          <dt className="text-xs text-gray-500">नोंदणी वेळ</dt>
          <dd className="font-medium text-gray-900">{formattedDate}</dd>
        </div>
        {descriptionPreview && (
          <div className="col-span-2">
            <dt className="text-xs text-gray-500">विवरण</dt>
            <dd className="text-gray-700 line-clamp-2">{descriptionPreview}</dd>
          </div>
        )}
      </dl>

      {/* Instructions in Marathi */}
      <div className="rounded-lg bg-white/60 border border-green-100 p-3 mb-4">
        <p className="text-sm font-medium text-gray-800 mb-1">स्थिती तपासण्यासाठी:</p>
        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700 ml-1">
          <li>वरील क्रमांक सुरक्षित ठेवा (स्क्रीनशॉट घ्या किंवा लिहून घ्या).</li>
          <li>
            <span className="font-medium">तक्रार स्थिती</span> पानावर हा क्रमांक किंवा मोबाइल नंबर टाका.
          </li>
          <li>कोणत्याही उपकरणावरून (मोबाइल, संगणक) स्थिती तपासता येईल.</li>
        </ol>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => window.print()}
          className="flex min-h-[44px] items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Download size={14} aria-hidden />
          प्रिंट / सेव्ह करा
        </button>
        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <button
            type="button"
            onClick={() =>
              navigator.share?.({
                title: 'CSMC तक्रार क्रमांक',
                text: `माझा तक्रार क्रमांक: ${complaintId}`,
              })
            }
            className="flex min-h-[44px] items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Share2 size={14} aria-hidden />
            शेअर करा
          </button>
        )}
      </div>
    </div>
  );
}
