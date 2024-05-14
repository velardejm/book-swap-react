import { useState } from "react"

export default function HeaderDropdown({ ...props }) {
    const [open, setOpen] = useState(false);

    const { setisLogOutPromptOpen } = props;

    return (
        <div className="relative">
            {/* Hamburger Button */}
            <button onClick={() => setOpen(!open)}
                className="text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10" onClick={() => setOpen(false)}>
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => setisLogOutPromptOpen(true)} > Log Out</a>
                </div>
            )}
        </div>
    )
}