export function SessaoContato() {
    return (
        <div className="flex w-8/10 h-[600px] mt-24" id="contato">
            <div className="w-3/4 bg-white p-14 rounded-l-3xl">
                <div className="flex h-full">
                    <div className="flex flex-col w-fit">
                        <h2 className="text-4xl mb-8 font-bold">Entre em <span className="text-[#0292B7]">contato</span></h2>
                        <p className="mb-8 text-[14px] text-[#6D6D6D]">Tem interesse em implementar sua escola? Entre em contato conosco e descubra como podemos ajudar a modernizar sua biblioteca!</p>
                        <form className="mt-8">
                            <input type="text" placeholder="Nome *" required className="w-full border border-gray-300 p-3 mb-4 text-sm" />
                            <input type="email" placeholder="Email *" required className="w-full border border-gray-300 p-3 mb-4 text-sm" />
                            <input type="text" placeholder="Telefone *" required className="w-full border border-gray-300 p-3 mb-4 text-sm" />
                            <button
                                type="submit"
                                className="w-full bg-[#0292B7] text-white font-bold mt-10 py-4 text-sm"
                            >
                                ENVIAR
                            </button>
                        </form>
                    </div>
                    <div className="w-[700px] h-full relative left-48">
                        <iframe
                            title="Google Maps"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.339735836506!2d-46.66170908445982!3d-23.588123368131437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c0f94e4b5b%3A0xfbd03fc22806a1c5!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1616172845821!5m2!1spt-BR!2sbr"
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