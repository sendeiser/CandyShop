import { MessageCircle, Mail, MapPin, Send } from 'lucide-react'

export default function Contact() {
  return (
    <div className="relative mx-auto max-w-4xl px-4 py-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hidden sm:block">
          <div className="absolute -left-6 top-20 h-8 w-8 rounded-full border-2 border-candy/10" style={{ animation: 'float-slow 5s ease-in-out 0s infinite' }} />
          <div className="absolute right-8 bottom-32 h-5 w-5 rounded-lg bg-mint/15 rotate-12" style={{ animation: 'float-slow 4.5s ease-in-out 1.5s infinite' }} />
          <div className="absolute left-1/3 top-1/2 h-3 w-3 rounded-full bg-cotton/15" style={{ animation: 'float-slow 3.5s ease-in-out 2s infinite' }} />
        </div>
      </div>

      <div className="relative text-center animate-fade-in-up">
        <h1 className="text-4xl font-bold text-chocolate sm:text-5xl">Contacto</h1>
        <p className="mt-3 text-lg text-gray-600">Escribinos y te responderemos a la brevedad</p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-chocolate">Mandanos un mensaje</h2>
            <form className="mt-5 space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Mensaje enviado (simulación)') }}>
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-gray-700">Nombre</label>
                <input id="contact-name" type="text" placeholder="Tu nombre" required autoComplete="name" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-candy focus:outline-none focus:ring-2 focus:ring-candy/20" />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
                <input id="contact-email" type="email" placeholder="tu@email.com" required autoComplete="email" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-candy focus:outline-none focus:ring-2 focus:ring-candy/20" />
              </div>
              <div>
                <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-gray-700">Mensaje</label>
                <textarea id="contact-message" rows={4} placeholder="Escribí tu mensaje..." required className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-candy focus:outline-none focus:ring-2 focus:ring-candy/20 resize-none" />
              </div>
              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-candy py-3.5 text-base font-bold text-white shadow-lg transition-colors hover:bg-candy-dark active:scale-95">
                <Send className="h-4 w-4" />
                Enviar
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-chocolate">Información</h2>
            <ul className="mt-5 space-y-5">
              <li className="flex items-start gap-3">
                <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-candy" />
                <div>
                  <p className="font-medium text-gray-800">WhatsApp</p>
                  <p className="text-sm text-gray-500">+1 (234) 567-890</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-candy" />
                <div>
                  <p className="font-medium text-gray-800">Email</p>
                  <p className="text-sm text-gray-500">hola@candyshop.com</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-candy" />
                <div>
                  <p className="font-medium text-gray-800">Ubicación</p>
                  <p className="text-sm text-gray-500">Av. Dulce 123, Ciudad</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-candy to-cotton p-6 text-center text-white">
            <p className="font-semibold">Seguinos en redes</p>
            <div className="mt-3 flex justify-center gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white">IG</a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white">FB</a>
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white">WA</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
