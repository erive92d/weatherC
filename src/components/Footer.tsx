import React from 'react'

export default function Footer() {
    return (
        <footer className=" bg-zinc-800 text-zinc-300 py-6  shadow-black">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                {/* Logo and Description */}
                <div className="text-center md:text-left">
                    <h2 className="text-xl font-semibold">Weathers App</h2>
                    <p className="text-sm">Your trusted weather companion.</p>
                </div>

                {/* Social Media Links */}
                <div className="flex justify-center space-x-6">
                    <a
                        href="#"
                        className="text-zinc-300 hover:text-white transition-colors"
                        aria-label="Facebook"
                    >
                        <i className="fab fa-facebook-f text-lg"></i>
                    </a>
                    <a
                        href="#"
                        className="text-zinc-300 hover:text-white transition-colors"
                        aria-label="Twitter"
                    >
                        <i className="fab fa-twitter text-lg"></i>
                    </a>
                    <a
                        href="#"
                        className="text-zinc-300 hover:text-white transition-colors"
                        aria-label="Instagram"
                    >
                        <i className="fab fa-instagram text-lg"></i>
                    </a>
                </div>

                {/* Copyright */}
                <div className="text-center md:text-right">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} Weathers App. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>

    )
}
