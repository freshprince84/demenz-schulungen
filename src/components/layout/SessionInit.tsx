"use client";

import { useEffect } from "react";

/** Legt anonyme Lern-Session per Route Handler an (Cookies in RSC verboten). */
export function SessionInit() {
  useEffect(() => {
    void fetch("/api/session", { method: "POST", credentials: "same-origin" });
  }, []);

  return null;
}
