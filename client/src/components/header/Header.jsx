import React, { useState } from "react";
import { Menu, Button, MenuItem } from "@mui/material";
import { logout } from "../../utils/auth/Auth";
import Icon from "../icon/Icon";
// import UserDetails from "../../utils/UserDetails";

import "../../styles/Header.scss";

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    // UserDetails is returning an object with keys, name, employeeNumber, givenName, displayName, email, surname, uid, category, position, ect.
    // const { givenName, surname } = UserDetails();

    // This is for the @mui dropdown "Helpful Links"
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="header-container">
            <div className="header-dcsd-icon">
                <Icon iconName="DCSD" width="60" height="60" fill="#19608f" />
            </div>
            <div className="header-right">
                <div className="header-name-container">
                    <h5>Welcome, Will Smith</h5>
                </div>

                <div className="nav-button-container">
                    {/*
                    /////////////////////////////////////////////////////////////////////
                    this is where the "Helpful Links" dropdown button STARTS (from @mui)
                    */}
                    <div>
                        <div className="btn-primary m-2 nav-button-links nav-button-links color-override">
                            <Button
                                id="basic-button"
                                aria-controls={open ? "basic-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                onClick={handleClick}
                                sx={{
                                    color: "white",
                                    fontFamily: "Montserrat"
                                }}
                            >
                                Helpful Links
                                <span>
                                    <Icon
                                        iconName="LIST_DCSD"
                                        height="20"
                                        fill="white"
                                        className="nav-button-icon"
                                    />
                                </span>
                            </Button>
                        </div>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                "aria-labelledby": "basic-button"
                            }}
                            sx={{
                                background: "black",
                                opacity: "80%"
                            }}
                        >
                            <a
                                href="https://perfectforms.dcsdk12.org/PerfectFormsSSO/player.aspx"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <MenuItem
                                    onClick={handleClose}
                                    sx={{
                                        color: "#19608f",
                                        opacity: "100%"
                                        // fontSize: "1.3em"
                                    }}
                                >
                                    Contact My Student(s) Nurse
                                </MenuItem>
                            </a>
                            <a
                                href="https://www.dcsdk12.org/cms/one.aspx?pageId=5758270"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <MenuItem
                                    onClick={handleClose}
                                    sx={{
                                        color: "#19608f",
                                        opacity: "100%"
                                    }}
                                >
                                    Academic Calendars
                                </MenuItem>
                            </a>
                            <a
                                href="https://www.dcsdk12.org/cms/One.aspx?portalId=220484&pageId=5787115"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <MenuItem
                                    onClick={handleClose}
                                    sx={{
                                        color: "#19608f",
                                        opacity: "100%"
                                        // fontSize: "1.3em"
                                    }}
                                >
                                    Parent Resources
                                </MenuItem>
                            </a>
                            <a
                                href="https://www.dcsdk12.org/cms/one.aspx?pageId=5759841"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <MenuItem
                                    onClick={handleClose}
                                    sx={{
                                        color: "#19608f",
                                        opacity: "100%"
                                    }}
                                >
                                    Bus Routes
                                </MenuItem>
                            </a>
                            <a
                                href="https://www.myschoolbucks.com/ver2/getmain?requestAction=home"
                                rel="noreferrer"
                                target="_blank"
                            >
                                <MenuItem
                                    onClick={handleClose}
                                    sx={{
                                        color: "#19608f",
                                        opacity: "100%"
                                    }}
                                >
                                    Online Payments
                                </MenuItem>
                            </a>
                            <a
                                href="https://dcsd.nutrislice.com/menus-eula"
                                rel="noreferrer"
                                target="_blank"
                            >
                                <MenuItem
                                    onClick={handleClose}
                                    sx={{
                                        color: "#19608f",
                                        opacity: "100%"
                                    }}
                                >
                                    Lunch Menus
                                </MenuItem>
                            </a>
                        </Menu>
                    </div>
                    {/*
                    this is where the "Helpful Links" dropdown button ENDS (from @mui)
                    /////////////////////////////////////////////////////////////////////
                    */}
                    <a
                        aria-label="Home Page Link"
                        className="btn btn-primary m-2 color-override"
                        href="https://engaged.dcsdk12.org"
                        rel="noopener noreferrer"
                    >
                        <span className="nav-button-text">
                            HOME
                            <Icon
                                className="nav-button-icon"
                                fill="white"
                                height="18"
                                iconName="HOME"
                                width="55"
                            />
                        </span>
                    </a>
                    <button
                        aria-label="Logout Button"
                        className="btn btn-primary m-2 color-override"
                        onClick={logout}
                        type="button"
                    >
                        <span className="nav-button-text ">
                            LOGOUT
                            <Icon
                                className="nav-button-icon"
                                height="25"
                                iconName="LOGOUT"
                                fill="white"
                                onClick={logout}
                                onKeyDown={logout}
                            />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
