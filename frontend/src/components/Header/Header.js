// src/components/Header/Header.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../state/authSlice';
import { StyledHeader, StyledNav, StyledNavLink, LogoutButton, NavContainer } from './Header.styles';

const Header = () => {
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);
    const isLoggedIn = !!authState.token;

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <StyledHeader>
            <NavContainer>
            <StyledNav>
                <StyledNavLink exact to="/" activeClassName="active">Home</StyledNavLink >
                <StyledNavLink to="/market" activeClassName="active">Market</StyledNavLink >
                {isLoggedIn ? (
                    <>
                        <StyledNavLink to="/profile" activeClassName="active">Profil</StyledNavLink >
                    </>
                ) : (
                    <>
                        <StyledNavLink to="/login" activeClassName="active">Login</StyledNavLink >
                        <StyledNavLink style={{justifiyContent:'flex-end'}} to="/signup" activeClassName="active">Singup</StyledNavLink >
                    </>
                )}

            </StyledNav>
            {isLoggedIn && (
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        )}
            </NavContainer>
        </StyledHeader>
    );
};

export default Header;
