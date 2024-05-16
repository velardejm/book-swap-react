import { Link, Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";

export default function DashboardLayout() {
    return (
        <div>
            <Header />
            <div className="flex">
                <nav className="bg-blue-100 pl-5 pr-10 h-dvh hidden">
                    <ul className="w-max">
                        <li>
                            <Link to="mybooks">My Books</Link>
                        </li>
                        <li>
                            <Link to="requests">Swap Requests</Link>
                        </li>
                        <li>
                            <Link to="sent-requests">Sent Requests</Link>
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