import { SiWhatsapp } from "react-icons/si";

export function WhatsAppButton() {
  // Replace with actual Nullryns WhatsApp number or link
  const whatsappUrl = "https://wa.me/254700000000";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
      aria-label="Contact us on WhatsApp"
    >
      <SiWhatsapp className="w-6 h-6" />
    </a>
  );
}
