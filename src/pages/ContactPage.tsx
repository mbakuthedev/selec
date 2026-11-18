import { useMemo, useState, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { usePageTitle } from '../components/Layout'
import { PageBanner } from '../components/PageBanner'
import { enquiryTypes, indiaOffices, worldOffices, type Office } from '../data/content'

type Errors = Record<string, string>

export function ContactPage() {
  usePageTitle('Selec Controls - Contact Us')
  const [params] = useSearchParams()
  const product = params.get('product') || ''
  const [region, setRegion] = useState<'India' | 'International'>('India')
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [form, setForm] = useState({
    title: 'Mr',
    name: '',
    company: '',
    location: '',
    email: '',
    phone: '',
    enquiry_type: enquiryTypes[0],
    subject: product ? `Enquiry for ${product}` : '',
    message: product ? `Please share details for ${product}.` : '',
  })

  const offices: Office[] = region === 'India' ? indiaOffices : worldOffices

  const validate = useMemo(() => {
    return () => {
      const next: Errors = {}
      if (!form.name.trim()) next.name = 'Name is required.'
      if (!form.company.trim()) next.company = 'Company is required.'
      if (!form.location.trim()) next.location = 'Location is required.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email.'
      if (!/^[0-9+\-\s()]{8,}$/.test(form.phone)) next.phone = 'Enter a valid phone number.'
      if (!form.subject.trim()) next.subject = 'Subject is required.'
      if (form.message.trim().length < 10) next.message = 'Message should be at least 10 characters.'
      return next
    }
  }, [form])

  return (
    <div>
      <PageBanner title="How Can We Help?" crumbs={[{ label: 'Home', to: '/' }, { label: 'Contact Us' }]} />
      <div className="container-site grid gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr]">
        <form
          className="border border-[#eee] p-5"
          onSubmit={(event) => {
            event.preventDefault()
            const next = validate()
            setErrors(next)
            if (Object.keys(next).length) {
              setSubmitted(false)
              return
            }
            const existing = JSON.parse(localStorage.getItem('selec-enquiries') || '[]') as unknown[]
            localStorage.setItem('selec-enquiries', JSON.stringify([...existing, { ...form, at: new Date().toISOString() }]))
            setSubmitted(true)
          }}
        >
          <h2 className="mb-4 text-[18px] font-semibold text-ink">You can contact us if you have any query</h2>
          <div className="mb-4 flex gap-4 text-[13px]">
            <label className="inline-flex items-center gap-2">
              <input type="radio" name="title" checked={form.title === 'Mr'} onChange={() => setForm({ ...form, title: 'Mr' })} /> Mr
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="radio" name="title" checked={form.title === 'Ms'} onChange={() => setForm({ ...form, title: 'Ms' })} /> Ms
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name *" error={errors.name}>
              <input id="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="field" />
            </Field>
            <Field label="Company *" error={errors.company}>
              <input id="company" value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} className="field" />
            </Field>
            <Field label="Location *" error={errors.location}>
              <input value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} className="field" />
            </Field>
            <Field label="Email *" error={errors.email}>
              <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="field" />
            </Field>
            <Field label="Phone *" error={errors.phone}>
              <input type="tel" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} className="field" />
            </Field>
            <Field label="Enquiry Type *">
              <select value={form.enquiry_type} onChange={(event) => setForm({ ...form, enquiry_type: event.target.value })} className="field">
                {enquiryTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Subject *" error={errors.subject}>
              <input value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} className="field" />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Message *" error={errors.message}>
              <textarea rows={5} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} className="field" />
            </Field>
          </div>
          <button type="submit" className="mt-5 bg-brand px-6 py-2.5 text-[13px] font-bold text-white">
            Submit
          </button>
          {submitted && (
            <p className="mt-4 text-[13px] text-[#1b7a32]">
              Enquiry saved in this browser. This recreation does not send the form to Selec.
            </p>
          )}
        </form>
        <div>
          <div className="mb-4 flex gap-2">
            {(['India', 'International'] as const).map((item) => (
              <button
                key={item}
                type="button"
                className={`px-4 py-2 text-[13px] font-bold ${region === item ? 'bg-brand text-white' : 'bg-[#f3f3f3]'}`}
                onClick={() => setRegion(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="space-y-4">
            {offices.map((office) => (
              <article key={office.title} className="border border-[#eee] p-4">
                <h3 className="mb-2 text-[15px] font-bold text-ink">{office.title}</h3>
                {office.lines.map((line) => (
                  <p key={line} className="text-[13px] leading-6 text-[#444]">
                    {line}
                  </p>
                ))}
              </article>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .field { width: 100%; border: 1px solid #ddd; padding: 8px 10px; font-size: 13px; outline: none; }
        .field:focus { border-color: #ff8e25; }
      `}</style>
    </div>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block text-[13px]">
      <span className="mb-1 block font-semibold">{label}</span>
      {children}
      {error && <span className="mt-1 block text-[12px] text-[#c0392b]">{error}</span>}
    </label>
  )
}
