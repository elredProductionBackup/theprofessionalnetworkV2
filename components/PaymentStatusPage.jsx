'use client'
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Check, X, ShieldCheck, Clock, Home, Download, RefreshCw, Loader2 } from 'lucide-react';
import { usePaymentStatus } from '@/lib/usePaymentStatus';

function PaymentStatusContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const txnid = searchParams.get('txnid') || '—';
  const [isVisible, setIsVisible] = useState(false);
  const { status, details } = usePaymentStatus(txnid !== '—' ? txnid : null);

  const formattedAmount = details?.amount != null
    ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: details.currency || 'INR', maximumFractionDigits: 2 }).format(details.amount)
    : null;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const statusConfig = {
    pending: {
      iconBg: 'bg-amber-50',
      Icon: Loader2,
      iconClass: 'text-amber-500 w-14 h-14 animate-spin',
      title: 'Payment Pending',
      desc: "We're confirming your payment. This may take a moment.",
      statusLabel: 'Pending',
      statusClass: 'text-amber-600',
      StatusIcon: Clock,
    },
    success: {
      iconBg: 'bg-emerald-50',
      Icon: Check,
      iconClass: 'text-emerald-500 w-14 h-14 stroke-[3]',
      title: 'Payment Successful',
      desc: 'Your transaction has been processed securely.',
      statusLabel: 'Verified',
      statusClass: 'text-emerald-600',
      StatusIcon: ShieldCheck,
    },
    failed: {
      iconBg: 'bg-red-50',
      Icon: X,
      iconClass: 'text-red-500 w-14 h-14 stroke-[3]',
      title: 'Payment Failed',
      desc: "We couldn't process your payment. Please try again.",
      statusLabel: 'Failed',
      statusClass: 'text-red-600',
      StatusIcon: X,
    },
  };

  const { iconBg, Icon, iconClass, title, desc, statusLabel, statusClass, StatusIcon } = statusConfig[status];

  return (
    <div className="min-h-screen relative flex items-center justify-center p-3 sm:p-4 overflow-hidden bg-[#FAFAFA] font-sans selection:bg-[#E72D38]/20">

      {/* Background Decorative Shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#E72D38]/5 rounded-full blur-[80px] animate-[float_10s_infinite_ease-in-out_alternate]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[#E72D38]/[0.03] rounded-full blur-[80px] animate-[float_10s_infinite_ease-in-out_alternate-reverse]"></div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(30px, -50px) scale(1.1); }
        }
      `}} />

      {/* Main Card */}
      <main className="w-full max-w-[420px] max-h-full overflow-y-auto bg-white rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05),_0_1px_3px_rgba(0,0,0,0.02)] border border-gray-100/50 p-4 sm:p-6 relative z-10 mx-auto mt-[100px] lg:mt-0">

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
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-1 font-sans tracking-tight">{title}</h1>
            <p className="text-gray-500 font-medium text-xs sm:text-sm">{desc}</p>
          </div>

          {/* Transaction Details (Receipt) */}
          <div className="bg-gray-50 rounded-xl p-3.5 sm:p-4 mb-4 border border-gray-100/80">
            {formattedAmount && (
              <>
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-gray-500 text-xs font-medium leading-normal">{status === 'failed' ? 'Attempted Amount' : 'Amount Paid'}</span>
                  <span className="text-gray-900 text-lg font-extrabold leading-normal">{formattedAmount}</span>
                </div>

                <div className="border-t-2 border-dashed border-gray-200 my-2.5 relative">
                  <div className="absolute -left-6 sm:-left-7 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full"></div>
                  <div className="absolute -right-6 sm:-right-7 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full"></div>
                </div>
              </>
            )}

            <dl className="space-y-2.5 text-xs sm:text-sm leading-normal">
              <div className="flex justify-between items-center">
                <dt className="text-gray-500 font-medium">Transaction ID</dt>
                <dd className="text-gray-900 font-semibold break-all text-right">{txnid}</dd>
              </div>
              {details?.paymentMode && (
                <div className="flex justify-between items-center">
                  <dt className="text-gray-500 font-medium">Payment Method</dt>
                  <dd className="text-gray-900 font-semibold">{details.paymentMode}</dd>
                </div>
              )}
              {status === 'failed' && details?.errorMessage && (
                <div className="flex justify-between items-center gap-3">
                  <dt className="text-gray-500 font-medium shrink-0">Reason</dt>
                  <dd className="text-gray-900 font-semibold text-right">{details.errorMessage}</dd>
                </div>
              )}
              <div className="flex justify-between items-center">
                <dt className="text-gray-500 font-medium">Status</dt>
                <dd className={`${statusClass} font-semibold flex items-center gap-1`}>
                  <StatusIcon className={`w-3.5 h-3.5 ${status === 'pending' ? 'animate-pulse' : ''}`} />
                  {statusLabel}
                </dd>
              </div>
            </dl>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            {status === 'failed' && (
              <button
                type="button"
                className="w-full bg-[#E72D38] hover:bg-[#C8212B] text-white font-semibold py-2.5 px-4 rounded-xl shadow-[0_8px_20px_-6px_rgba(231,45,56,0.3)] transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
            )}
            <button
              type="button"
              onClick={() => router.push('/')}
              className="w-full bg-[#E72D38] hover:bg-[#C8212B] text-white font-semibold py-2.5 px-4 rounded-xl shadow-[0_8px_20px_-6px_rgba(231,45,56,0.3)] transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm"
            >
              <Home className="w-4 h-4" />
              Return to Home
            </button>
            {status === 'success' && (
              <button className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2.5 px-4 rounded-xl border border-gray-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm">
                <Download className="w-4 h-4" />
                Download Receipt
              </button>
            )}
          </div>
        </div>
      </main>
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
