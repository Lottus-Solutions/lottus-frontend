export function SessaoContato() {
    return (
        <div className="flex w-8/10 h-[600px] mt-40 scroll-mt-20" id="contato">
            <div className="w-3/4 bg-white p-14 rounded-l-3xl">
                <div className="flex h-full">
                    <div className="flex flex-col w-fit">
                        <h2 className="text-4xl mb-8 font-bold">Entre em <span className="text-[#0292B7]">contato</span></h2>
                        <p className="mb-8 text-[14px] text-[#6D6D6D]">Tem interesse em implementar sua escola? Entre em contato conosco e descubra como podemos ajudar a modernizar sua biblioteca!</p>
                        <form className="mt-8">
                            <input type="text" placeholder="Nome *" required className="w-full border border-gray-300 p-3 mb-4 text-sm rounded" />
                            <input type="email" placeholder="Email *" required className="w-full border border-gray-300 p-3 mb-4 text-sm rounded" />
                            <input type="text" placeholder="Telefone *" required className="w-full border border-gray-300 p-3 mb-4 text-sm rounded" />
                            <button
                                type="submit"
                                className="w-full bg-[#0292B7] text-white font-bold mt-10 py-4 text-sm rounded"
                            >
                                ENVIAR
                            </button>
                        </form>
                    </div>
                    <div className="w-[700px] h-full relative left-48">
                        <iframe
                            title="Google Maps"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2432.202063395723!2d-46.66339109070695!3d-23.557713129017927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59d2a5270055%3A0x3c7ea4f4c7d51fb6!2sRua%20Haddock%20Lobo%2C%20595%20-%20Cerqueira%20C%C3%A9sar%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001414-001!5e0!3m2!1spt-BR!2sbr!4v1744321039983!5m2!1spt-BR!2sbr"
                            width="120%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
            <div className="w-1/4 bg-[#0292B7] rounded-r-3xl"></div>
        </div>
    )
}