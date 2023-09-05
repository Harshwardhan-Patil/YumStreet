import React from 'react'
import { useSelector } from 'react-redux'
import { Route, useNavigate } from 'react-router-dom'

function ClientRoute({ path, element, ...rest }) {
    const { isAuth, role } = useSelector(state => state.auth);
    const Navigate = useNavigate();
    if (isAuth && role == 'user') {
        return <Route path={path} {...rest} element={<element />} />
    } else {
        return <Route path='/signin' element={<div>Sign In</div>} />
    }
}

export default ClientRoute