import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

import Layout from "@/Layout.tsx";
import IssuesPage from "@/pages/issues/IssuesPage";
import LabelPage from "@/pages/labels/LabelPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Navigate to="/issues" replace />
            },
            {
                path: 'issues',
                element: <IssuesPage />,
            },
            {
                path: "labels",
                element: <LabelPage />,
            },
        ],
    },
])

const App = () => {
    return (<RouterProvider router={router} /> );
};

export default App;