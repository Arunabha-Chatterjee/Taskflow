import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import AppRoutes from '../src/routes/AppRoutes'

createRoot(document.getElementById('root')).render(
    <RouterProvider router={AppRoutes}/>
)