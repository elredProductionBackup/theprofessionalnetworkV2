'use client'
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Check, ShieldCheck, Home, Download } from 'lucide-react';

function SuccessContent() {
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
            <div className="w-28 h-28 bg-emerald-50 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-0 bg-emerald-50 rounded-full animate-ping opacity-20" style={{ animationDuration: '3s' }}></div>
              <Check className="text-emerald-500 w-14 h-14 stroke-[3]" />
            </div>
          </div>

          {/* Status Headers */}
          <div className="text-center mb-4">
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-1 font-sans tracking-tight">Payment Successful</h1>
            <p className="text-gray-500 font-medium text-xs sm:text-sm">Your transaction has been processed securely.</p>
          </div>

          {/* Transaction Details (Receipt) */}
          <div className="bg-gray-50 rounded-xl p-3.5 sm:p-4 mb-4 border border-gray-100/80">
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-gray-500 text-xs font-medium leading-normal">Amount Paid</span>
              <span className="text-gray-900 text-lg font-extrabold leading-normal">₹ 4,500.00</span>
            </div>

            <div className="border-t-2 border-dashed border-gray-200 my-2.5 relative">
              <div className="absolute -left-6 sm:-left-7 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full"></div>
              <div className="absolute -right-6 sm:-right-7 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full"></div>
            </div>

            <dl className="space-y-2.5 text-xs sm:text-sm leading-normal">
              <div className="flex justify-between items-center">
                <dt className="text-gray-500 font-medium">Transaction ID</dt>
                <dd className="text-gray-900 font-semibold break-all text-right">{txnid}</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-gray-500 font-medium">Status</dt>
                <dd className="text-emerald-600 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified
                </dd>
              </div>
            </dl>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="w-full bg-[#E72D38] hover:bg-[#C8212B] text-white font-semibold py-2.5 px-4 rounded-xl shadow-[0_8px_20px_-6px_rgba(231,45,56,0.3)] transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm"
            >
              <Home className="w-4 h-4" />
              Return to Home
            </button>
            <button className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2.5 px-4 rounded-xl border border-gray-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm">
              <Download className="w-4 h-4" />
              Download Receipt
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
      <SuccessContent />
    </Suspense>
  );
}
