import React, { useState } from 'react';
import {
    Navbar as BaseNavbar,
    Container,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    NavLink,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledButtonDropdown,
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = DJ_CONST;

    const toggle = () => setIsOpen(!isOpen);

    return (
        <BaseNavbar color="primary" dark expand="md" className="mb-4">
            <Container>
                <NavbarBrand tag={RRNavLink} to="/dashboard">
                    Projement
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink
                                tag={RRNavLink}
                                to="/dashboard"
                                activeClassName="active"
                                exact
                            >
                                Dashboard
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <Nav navbar>
                        <UncontrolledButtonDropdown>
                            <DropdownToggle
                                className="nav-link"
                                caret
                                color="link"
                            >
                                README
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem tag="a" href="/docs/Assignment/">
                                    Assignment
                                </DropdownItem>
                                <DropdownItem tag="a" href="/docs/Backend/">
                                    Back-end
                                </DropdownItem>
                                <DropdownItem tag="a" href="/docs/Frontend/">
                                    Front-End
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                        {user ? (
                            <UncontrolledButtonDropdown>
                                <DropdownToggle
                                    className="nav-link"
                                    caret
                                    color="link"
                                >
                                    {user.email}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem tag="a" href="/admin/">
                                        Admin
                                    </DropdownItem>
                                    <DropdownItem tag="a" href="/logout/">
                                        Log out
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledButtonDropdown>
                        ) : (
                            <NavItem>
                                <NavLink href="/login/">Log in</NavLink>
                            </NavItem>
                        )}
                    </Nav>
                </Collapse>
            </Container>
        </BaseNavbar>
    );
};

export default Navbar;
