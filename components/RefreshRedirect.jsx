"use client";
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function RefreshRedirect() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/') {
      const searchParams = window.location.search;
      router.replace('/' + searchParams);
    }
    // Force scroll to top on every load/refresh
    window.scrollTo(0, 0);
  }, []);

  return null;
}
