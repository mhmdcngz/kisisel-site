export function Footer() {
    return (
        <footer id="contact" className="py-8 bg-slate-950 border-t border-slate-800 mt-auto">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
                <p>© 2026 Muhammed Cengiz. Tüm hakları saklıdır.</p>
                <div className="flex gap-4">
                    <span className="hover:text-slate-300 transition-colors cursor-pointer">Gizlilik</span>
                    <span className="hover:text-slate-300 transition-colors cursor-pointer">İletişim</span>
                </div>
            </div>
        </footer>
    );
}
