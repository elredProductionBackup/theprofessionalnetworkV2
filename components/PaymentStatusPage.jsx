'use client'
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { Check, X, ShieldCheck, Clock, Home, Loader2 } from 'lucide-react';
import { usePaymentStatus } from '@/lib/usePaymentStatus';
import ThankYouPopup from './ThankYouPopup';

function PaymentStatusContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const txnid = searchParams.get('txnid') || '—';
  const [isVisible, setIsVisible] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const { status, details } = usePaymentStatus(txnid !== '—' ? txnid : null);

  const formattedAmount = details?.amount != null
    ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: details.currency || 'INR', maximumFractionDigits: 2 }).format(details.amount)
    : null;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (status !== 'success') return;
    const timer = setTimeout(() => setShowThankYou(true), 3000);
    return () => clearTimeout(timer);
  }, [status]);

  const statusConfig = {
    pending: {
      iconBg: 'bg-amber-50',
      Icon: Loader2,
      iconClass: 'text-amber-500 w-14 h-14 animate-spin',
      title: 'Confirming payment',
      desc: "We're confirming your payment. This may take a moment.",
      statusLabel: 'Pending',
      statusClass: 'text-amber-600',
      StatusIcon: Clock,
    },
    success: {
      iconBg: 'bg-emerald-50',
      Icon: Check,
      iconClass: 'text-emerald-500 w-14 h-14 stroke-[3]',
      title: 'Payment successful',
      desc: 'Your access details are on their way to your email.',
      statusLabel: 'Verified',
      statusClass: 'text-emerald-600',
      StatusIcon: ShieldCheck,
    },
    failed: {
      iconBg: 'bg-red-50',
      Icon: X,
      iconClass: 'text-red-500 w-14 h-14 stroke-[3]',
      title: 'Payment failed',
      desc: "Your payment didn't go through. If any amount was debited, your bank normally reverses it automatically. Please try again from the course page.",
      statusLabel: 'Failed',
      statusClass: 'text-red-600',
      StatusIcon: X,
    },
  };

  const { iconBg, Icon, iconClass, title, desc, statusLabel, statusClass, StatusIcon } = statusConfig[status];

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 pb-16 pt-[110px] overflow-hidden bg-paper">
      <Toaster position="top-center" />

      {/* Background Decorative Shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-red/5 rounded-full blur-[80px] animate-[float_10s_infinite_ease-in-out_alternate]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-red/[0.03] rounded-full blur-[80px] animate-[float_10s_infinite_ease-in-out_alternate-reverse]"></div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(30px, -50px) scale(1.1); }
        }
      `}} />

      {/* Main Card */}
      <main className="w-full max-w-[440px] bg-surface rounded-[28px] ring-1 ring-line shadow-[0_40px_80px_-50px_rgba(22,23,27,0.4)] p-6 sm:p-8 relative z-10 mx-auto">

        <div className={`transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {/* Status Icon */}
          <div className="flex justify-center mb-3">
            <div className={`w-28 h-28 ${iconBg} rounded-full flex items-center justify-center relative`}>
              {status === 'success' && (
                <div className="absolute inset-0 bg-emerald-50 rounded-full animate-ping opacity-20" style={{ animationDuration: '3s' }}></div>
              )}
              <Icon className={iconClass} />
            </div>
          </div>

          {/* Status Headers */}
          <div className="text-center mb-4">
            <h1 className="heading text-[30px] sm:text-[34px] text-ink mb-2">{title}</h1>
            <p className="text-ink-2 text-[15px]">{desc}</p>
          </div>

          {/* Transaction Details (Receipt) */}
          <div className="bg-paper rounded-[18px] p-4 sm:p-5 mb-5">
            {formattedAmount && (
              <>
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-ink-3 text-xs font-medium leading-normal">{status === 'failed' ? 'Attempted Amount' : 'Amount Paid'}</span>
                  <span className="text-ink text-lg font-extrabold leading-normal">{formattedAmount}</span>
                </div>

                <div className="border-t-2 border-dashed border-line my-2.5 relative">
                  <div className="absolute -left-6 sm:-left-7 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-surface rounded-full"></div>
                  <div className="absolute -right-6 sm:-right-7 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-surface rounded-full"></div>
                </div>
              </>
            )}

            <dl className="space-y-2.5 text-xs sm:text-sm leading-normal">
              <div className="flex justify-between items-center">
                <dt className="text-ink-3 font-medium">Transaction ID</dt>
                <dd className="text-ink font-semibold break-all text-right">{txnid}</dd>
              </div>
              {details?.attendee?.email && (
                <div className="flex justify-between items-center">
                  <dt className="text-ink-3 font-medium">Email</dt>
                  <dd className="text-ink font-semibold break-all text-right">{details.attendee.email}</dd>
                </div>
              )}
              {details?.paymentMode && (
                <div className="flex justify-between items-center">
                  <dt className="text-ink-3 font-medium">Payment Method</dt>
                  <dd className="text-ink font-semibold">{details.paymentMode}</dd>
                </div>
              )}
              {status === 'failed' && details?.errorMessage && (
                <div className="flex justify-between items-center gap-3">
                  <dt className="text-ink-3 font-medium shrink-0">Reason</dt>
                  <dd className="text-ink font-semibold text-right">{details.errorMessage}</dd>
                </div>
              )}
              <div className="flex justify-between items-center">
                <dt className="text-ink-3 font-medium">Status</dt>
                <dd className={`${statusClass} font-semibold flex items-center gap-1`}>
                  <StatusIcon className={`w-3.5 h-3.5 ${status === 'pending' ? 'animate-pulse' : ''}`} />
                  {statusLabel}
                </dd>
              </div>
            </dl>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="btn btn-ink w-full"
            >
              <Home className="w-4 h-4" />
              Back to home
            </button>
          </div>
        </div>
      </main>

      <ThankYouPopup open={showThankYou} onClose={() => setShowThankYou(false)} />
    </div>
  );
}

export default function PaymentStatusPage() {
  return (
    <Suspense fallback={null}>
      <PaymentStatusContent />
    </Suspense>
  );
}
