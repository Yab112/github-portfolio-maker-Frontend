import { Link } from "react-router-dom";
import { GithubIcon } from "lucide-react";

export default function Header() {
    return (
        <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-sm     ">
            <div className="mx-auto px-10  h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2">
                    <GithubIcon className="w-8 h-8 text-blue-600" />
                </Link>
                <nav className="flex items-center space-x-8 mr-10">
                    <Link to="#features" className="text-2xl font-medium text-blue-600 hover:text-blue-700 transition-colors">
                        Features
                    </Link>     
                    <Link
                        to="#how-it-works"
                        className="text-2xl font-medium text-blue-600 hover:text-blue-700 transition-colors"
                    >
                        How It Works
                    </Link>
                    <a
                        href="https://github.com"
                        className="text-2xl font-medium text-blue-600 hover:text-blue-700 transition-colors"
                    >
                        GitHub Link
                    </a>
                </nav>
            </div>
        </header>
    );
}
