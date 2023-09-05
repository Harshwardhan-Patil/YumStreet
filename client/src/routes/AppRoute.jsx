import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { route } from '@/constants/index.js'
import { Home, AboutUs, ContactUs, Profile, OrderHistory } from '@/views'
import ClientRoute from '@/routes/ClientRoute'


function AppRouter() {
    return (
        <Routes>
            <Route exact path={route.HOME} element={<Home />} />
            <Route exact path={route.ABOUT_US} element={<AboutUs />} />
            <Route exact path={route.CONTACT_US} element={<ContactUs />} />

            <ClientRoute path={route.USER_PROFILE} element={<Profile />} />
            <ClientRoute path={route.USER_ORDER_HISTORY} element={<OrderHistory />} />
        </Routes>
    )
}

export default AppRouter