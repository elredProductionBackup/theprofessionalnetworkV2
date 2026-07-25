'use client'
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { X, AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';

function FailedContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const txnid = searchParams.get('txnid') || '—';
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

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
            <div className="w-28 h-28 bg-red-50 rounded-full flex items-center justify-center">
              <X className="text-red-500 w-14 h-14 stroke-[3]" />
            </div>
          </div>

          {/* Status Headers */}
          <div className="text-center mb-4">
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-1 tracking-tight">Payment Failed</h1>
            <p className="text-gray-500 font-medium text-xs sm:text-sm px-2 leading-normal">We couldn't process your payment. No charges were made to your account.</p>
          </div>

          {/* Error Details */}
          <div className="bg-red-50 rounded-xl p-3 sm:p-3.5 mb-4 border border-red-100 flex items-start gap-2.5">
            <AlertCircle className="text-red-500 w-4 h-4 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-red-700 font-bold text-xs mb-1 leading-normal">Bank Server Timeout</h4>
              <p className="text-red-800/80 text-xs font-medium leading-relaxed">The bank took too long to respond. Please check your internet connection or try a different payment method.</p>
            </div>
          </div>

          {/* Transaction Details (Truncated) */}
          <div className="bg-gray-50 rounded-xl p-3.5 sm:p-4 mb-4 border border-gray-100/80">
            <dl className="space-y-2.5 text-xs sm:text-sm leading-normal">
              <div className="flex justify-between items-center pb-2.5 border-b border-gray-200">
                <dt className="text-gray-500 font-medium">Attempted Amount</dt>
                <dd className="text-gray-900 font-bold text-sm sm:text-base leading-normal">₹ 4,500.00</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-gray-500 font-medium">Transaction ID</dt>
                <dd className="text-gray-900 font-semibold break-all text-right">{txnid}</dd>
              </div>
            </dl>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button className="w-full bg-[#E72D38] hover:bg-[#C8212B] text-white font-semibold py-2.5 px-4 rounded-xl shadow-[0_8px_20px_-6px_rgba(231,45,56,0.3)] transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm">
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
            <button
              type="button"
              onClick={() => router.push('/')}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2.5 px-4 rounded-xl border border-gray-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Home
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <FailedContent />
    </Suspense>
  );
}
