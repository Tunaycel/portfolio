"use client";
import { useRef, useState, type FormEvent } from "react";
export function ContactForm() {
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<{ok:boolean;message:string}|null>(null);
  const sending = useRef(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (sending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    sending.current = true; setPending(true); setStatus(null);
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: {"Content-Type":"application/json"}, body:JSON.stringify(Object.fromEntries(data)), signal:AbortSignal.timeout(12000) });
      const result = await response.json();
      setStatus({ok:response.ok,message:typeof result.message === "string" ? result.message : "Please email me directly."});
      if(response.ok)form.reset();
    } catch {setStatus({ok:false,message:"Delivery could not be confirmed. Please email me directly."});}
    finally {sending.current=false;setPending(false);}
  }
  return <form className="contact-form" onSubmit={submit}><div className="form-row"><label>Your name<input name="name" autoComplete="name" minLength={2} maxLength={100} required placeholder="Alex Morgan" /></label><label>Email address<input name="email" type="email" autoComplete="email" maxLength={254} required placeholder="alex@company.com"/></label></div><label>What do you have in mind?<textarea name="message" rows={4} minLength={20} maxLength={4000} required placeholder="Tell me a little about the role, team or project…" aria-describedby="message-hint"/></label><span id="message-hint" className="form-hint">20–4,000 characters. Your details are used only to respond to your enquiry.</span><div className="honeypot" aria-hidden="true"><label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off"/></label></div><button className="button dark" type="submit" disabled={pending}>{pending?"Sending…":"Send a message"}<span aria-hidden="true">↗</span></button><p role="status" aria-live="polite" className={`form-status ${status?.ok?"success":""}`}>{status?.message}</p><noscript>Please use the email link to get in touch; the form requires JavaScript.</noscript></form>;
}
