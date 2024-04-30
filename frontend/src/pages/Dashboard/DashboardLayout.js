import { Link, Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";

export default function DashboardLayout() {
    return (
        <div>
            <Header />
            <div className="flex">
                <nav className="bg-blue-100 pl-5 pr-10 h-dvh">
                    <ul className="w-max">
                        <li>
                            <Link to="1">Test 1 Link</Link>
                        </li>
                        <li>
                            <Link to="2">Test 2 Link</Link>
                        </li>
                    </ul>
                </nav>
                <div className="bg-green-100 w-dvw">
                    <Outlet />
                </div>
            </div>

        </div>
    )
}