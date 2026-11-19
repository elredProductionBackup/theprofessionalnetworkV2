'use client'
import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';

const PAYMENT_BASE_URL = process.env.NEXT_PUBLIC_PAYMENT_BASE_URL;
const POLL_INTERVAL_MS = 5000;

// Polls /tpnEvent/payment/getStatus for a txnid until the status settles.
// Returns { status: 'pending' | 'success' | 'failed', details } — status stays
// 'pending' until the first response arrives, details is the raw result row
// (registrationCode, eventDetails, ticketDetails, attendee, lmsAccess, invoice…).
// refresh() fetches it once more, e.g. after an invoice is requested.
export function usePaymentStatus(txnid) {
  const [status, setStatus] = useState('pending');
  const [details, setDetails] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!txnid) return;
    let cancelled = false;

    const checkStatus = async () => {
      try {
        const res = await axios.get(`${PAYMENT_BASE_URL}/tpnEvent/payment/getStatus`, {
          params: { txnid },
        });
        if (cancelled) return;

        const result = res.data?.result?.[0];
        const nextStatus = String(result?.status || '').toLowerCase();

        setDetails(result || null);

        if (nextStatus === 'success') {
          setStatus('success');
        } else if (nextStatus === 'failed' || nextStatus === 'failure') {
          setStatus('failed');
        } else {
          setStatus('pending');
          timeoutRef.current = setTimeout(checkStatus, POLL_INTERVAL_MS);
        }
      } catch (err) {
        console.warn('Payment status check failed:', err?.message);
      }
    };

    checkStatus();

    return () => {
      cancelled = true;
      clearTimeout(timeoutRef.current);
    };
  }, [txnid]);

  const refresh = useCallback(async () => {
    if (!txnid) return null;
    try {
      const res = await axios.get(`${PAYMENT_BASE_URL}/tpnEvent/payment/getStatus`, { params: { txnid } });
      const result = res.data?.result?.[0] || null;
      if (result) setDetails(result);
      return result;
    } catch (err) {
      console.warn('Payment status refresh failed:', err?.message);
      return null;
    }
  }, [txnid]);

  return { status, details, refresh };
}
