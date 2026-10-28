import { NavLink, Outlet } from 'react-router';

const Layout = () => {
    return (
        <div className="relative h-screen flex items-center justify-center">
            <div className="w-full mx-auto my-2 mb-0 px-2 sm:w-3xl">
                <header className="absolute top-0 left-0 w-full px-10 py-5 flex items-center gap-x-5 mb-10">
                    <NavLink
                        to="/issues"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-blue-600 font-bold border-b-2 border-blue-600'
                                : 'text-gray-600'
                        }
                    >
                        Issues
                    </NavLink>
                    <NavLink
                        to="/labels"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-blue-600 font-bold border-b-2 border-blue-600'
                                : 'text-gray-600'
                        }
                    >
                        Labels
                    </NavLink>
                </header>

                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
