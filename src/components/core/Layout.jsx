import Footer from "./Footer";
import Header from "./Header";

function Layout(props) {
    return (
        <div className="container min-h-screen flex flex-col mx-auto w-full h-full">
            <header className="bg-zinc-900 text-center text-white py-2 text-xl">
                <Header />
            </header>
            <main className="bg-zinc-500 border-2 border-white border-solid rounded-md lg:px-10 px-5 text-left flex-1 flex-wrap justify-left">
                {props.children}
            </main>
            <footer className="bg-zinc-900 text-center text-white py-2 text-xl shrink-0">
                <Footer />
            </footer>
        </div>

    )
}

export default Layout;