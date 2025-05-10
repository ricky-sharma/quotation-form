function Header() {
    return (
        <div className="sticky top-0 flex flex-row justify-left sm:justify-left border-b-2 bg-gray-100 shadow-lg py-4 px-4 bg-white min-h-[100px] tracking-wide z-50">
            <a
                href="/"
                className="flex items-center !text-slate-500 text-4xl h-20 px-10 bg-gradient-to-r from-gray-500 via-gray-200 to-gray-100 rounded-tl-full rounded-br-full font-bold uppercase italic text-white hover:opacity-90"
            >
                Quotation Form
            </a>
        </div>
    )
}

export default Header;