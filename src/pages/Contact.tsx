import { MessageCircle, Mail, MapPin, Send } from 'lucide-react'

export default function Contact() {
  return (
    <div className="relative mx-auto max-w-4xl px-4 py-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-6 top-20 h-8 w-8 rounded-full border-2 border-[#26c6da]/10" style={{ animation: 'float-slow 5s ease-in-out 0s infinite' }} />
        <div className="absolute right-8 bottom-32 h-5 w-5 rounded-lg bg-[#8bc34a]/15 rotate-12" style={{ animation: 'float-slow 4.5s ease-in-out 1.5s infinite' }} />
        <div className="absolute left-1/3 top-1/2 h-3 w-3 rounded-full bg-[#4dd3e0]/15" style={{ animation: 'float-slow 3.5s ease-in-out 2s infinite' }} />
      </div>

      <div className="relative text-center animate-fade-in-up">
        <h1 className="text-4xl font-bold text-[#1a3a2e] sm:text-5xl">Contacto</h1>
        <p className="mt-3 text-lg text-gray-600">Escribinos y te responderemos a la brevedad</p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#1a3a2e]">Mandanos un mensaje</h2>
            <form className="mt-5 space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Mensaje enviado (simulación)') }}>
              <input type="text" placeholder="Nombre" required className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-[#26c6da] focus:outline-none focus:ring-2 focus:ring-[#26c6da]/20" />
              <input type="email" placeholder="Email" required className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-[#26c6da] focus:outline-none focus:ring-2 focus:ring-[#26c6da]/20" />
              <textarea rows={4} placeholder="Mensaje" required className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:border-[#26c6da] focus:outline-none focus:ring-2 focus:ring-[#26c6da]/20 resize-none" />
              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#ec4899] py-3.5 text-base font-bold text-white shadow-lg transition-all hover:bg-[#db2777] active:scale-95">
                <Send className="h-4 w-4" />
                Enviar
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#1a3a2e]">Información</h2>
            <ul className="mt-5 space-y-5">
              <li className="flex items-start gap-3">
                <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#26c6da]" />
                <div>
                  <p className="font-medium text-gray-800">WhatsApp</p>
                  <p className="text-sm text-gray-500">+1 (234) 567-890</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#26c6da]" />
                <div>
                  <p className="font-medium text-gray-800">Email</p>
                  <p className="text-sm text-gray-500">hola@candyshop.com</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#26c6da]" />
                <div>
                  <p className="font-medium text-gray-800">Ubicación</p>
                  <p className="text-sm text-gray-500">Av. Dulce 123, Ciudad</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-[#26c6da] to-[#4dd3e0] p-6 text-center text-white">
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
