
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState , useRef } from 'react';
import { formatSubCategoryForURL } from "@/Utilities/urlFormatHelpers"
import useCategories from '../../../hooks/categoryHook/useCategory';

const staticLinks = [

    { href: '/contact', text: 'İLETİŞİM' },
  

];
const Header = () => {
    const [isSidebarActive, setSidebarActive] = useState(false);
    const [isOverlayActive, setOverlayActive] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(false);
    const searchInputRef = useRef(null);
    const path = usePathname()
    const { categories } = useCategories();

    const toggleSidebar = () => {
        setSidebarActive(!isSidebarActive);
        setOverlayActive(!isOverlayActive);
    };

    const closeSidebar = () => {
        setSidebarActive(false);
        setOverlayActive(false);
    };

    useEffect(() => {
        const dismissOverlay = document.querySelector('#dismiss');
        const overlay = document.querySelector('.overlay');
        const navIcon = document.querySelector('#nav-icon');

        if (dismissOverlay && overlay) {
            dismissOverlay.addEventListener('click', closeSidebar);
            overlay.addEventListener('click', closeSidebar);
        }

        if (navIcon) {
            navIcon.addEventListener('click', toggleSidebar);
        }

        // Cleanup function for removing event listeners
        return () => {
            if (dismissOverlay && overlay) {
                dismissOverlay.removeEventListener('click', closeSidebar);
                overlay.removeEventListener('click', closeSidebar);
            }
            if (navIcon) {
                navIcon.removeEventListener('click', toggleSidebar);
            }
        };
    }, [isSidebarActive, isOverlayActive]); // R

    useEffect(() => {

        const fullSkinSearch = () => {
            let wHeight = window.innerHeight;
            const fullscreenSearchform = document.getElementById('fullscreen-searchform');
            fullscreenSearchform.style.top = `${wHeight / 2}px`;

            window.addEventListener('resize', () => {
                wHeight = window.innerHeight;
                fullscreenSearchform.style.top = `${wHeight / 2}px`;
            });
        };

        fullSkinSearch();
    }, []);


    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const searchTerm = searchInputRef.current.value;
        if (searchTerm.trim()) {

            const href = `/search/${encodeURIComponent(searchTerm)}`;
            window.location.href = href; // Client-side redirect
        }
    };

    useEffect(() => {
        // Bu kodu yalnızca tarayıcı tarafında çalıştır
        if (typeof window !== "undefined") {
            const date = new Date();
            const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
            // Tarihi Türkçe formatında al: "Cumartesi, 13 Ocak 2024"
            setCurrentDate(date.toLocaleDateString('tr-TR', options));
        }
    }, []);

    const handleSearchButtonClick = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const handleCloseButtonClick = () => {
        setIsSearchOpen(false);
    };




    return (
        <>
            {/* *** START PAGE HEADER SECTION *** */}
            <header>

                {/* START MIDDLE SECTION */}
                <div className="d-md-block d-none header-mid">
                    <div className="container">
                        <div className="align-items-center row justify-content-center">
                            <div className="col-sm-4">
                                <Link href="/">
                                    <img
                                        src="/logo.png"
                                        className="img-fluid header-logo header-logo_dark"
                                        alt=""
                                    />
                                    <img
                                        src="/logo-dark.png"
                                        className="img-fluid header-logo_white"
                                        alt=""
                                    />
                                    
                                </Link>
                            </div>
                            <div className="col-sm-8">
                                <Link href="https://www.fatihsevencan.com/" target="_blank" rel="noopener noreferrer">
                                    <img
                                        src="/reklam.jpg"
                                        className="img-fluid"
                                        alt=""
                                    />
                                </Link>
                            </div>
                           
                          
                        </div>
                    </div>
                </div>
                {/* END OF /. MIDDLE SECTION */}
                {/* START NAVIGATION */}
                <nav className="custom-navbar navbar navbar-expand-lg sticky-top flex-column no-logo no-logo">
                    {/* Start Fullscreen Search */}
                    <div className={`fullscreen-search-overlay ${isSearchOpen ? 'fullscreen-search-overlay-show' : ''}`}>
                        <a href="#" className="fullscreen-close" onClick={handleCloseButtonClick}>
                            <i className="ti ti-close" />
                        </a>
                        <div id="fullscreen-search-wrapper">
                            <form id="fullscreen-searchform" onSubmit={handleSearchSubmit}>
                                <input
                                    type="text"
                                    defaultValue=""
                                    placeholder="Ara: Haber, Kategori, Etiket"
                                    id="fullscreen-search-input"
                                    ref={searchInputRef}
                                />
                                <i className="ti ti-search fullscreen-search-icon">
                                    <input type="submit" value="" />
                                </i>
                            </form>
                        </div>
                    </div>
                    {/* /. End Fullscreen Search */}
                    <div className="container position-relative">
                        {/* Start Navbar Brand*/}
                        <Link className="navbar-brand d-md-none" href="/">
                            {/* <img class="logo-dark" src="assets/images/logo.png" alt=""> */}
                            <img
                                src="/logo.png"
                                className="header-logo_dark"
                                alt=""
                            />
                            <img
                                src="/logo.png"
                                className="header-logo_white"
                                alt=""
                            />
                        </Link>
                        {/* End Navbar Brand*/}
                        {/* Start Search Button */}
                        <button
                            type="button"
                            className="btn btn-search_two  ms-auto ms-md-0 d-lg-none"
                            onClick={handleSearchButtonClick}
                        >
                            <i className="fa fa-search" />
                        </button>

                        {/* End Search Button */}
                        {/* Start Navbar Toggler Buton */}
                        <button
                            className={`navbar-toggler ms-1`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >

                            <span className="navbar-toggler-icon" />
                        </button>
                        {/* End Navbar Toggler Buton */}
                        <div className={`collapse navbar-collapse`} id="navbarSupportedContent">
                            {/* Start Navbar Collapse Header */}
                            <div className="align-items-center border-bottom d-flex d-lg-none  justify-content-between mb-3 navbar-collapse__header pb-3">
                                {/* Start Brand Logo For Mobile */}
                                <div className="collapse-brand flex-shrink-0">
                                    <Link href="/">
                                        <img
                                            src="/logo.png"
                                            className="header-logo_dark"
                                            alt=""
                                        />
                                    </Link>
                                    <Link href="/">
                                        <img
                                            src="/logo-dark.png"
                                            className="header-logo_white"
                                            alt=""
                                        />
                                    </Link>
                                </div>
                                {/* End Brand Logo For Mobile */}
                                {/* Start Collapse Close Button */}
                                <div className="flex-grow-1 ms-3 text-end">
                                    <button
                                        type="button"
                                        className="bg-transparent border-0 collapse-close p-0 position-relative"
                                        data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
                                    >
                                        <span /> <span />
                                    </button>
                                </div>
                                {/* End Collapse Close Button */}
                            </div>
                            {/* End Navbar Collapse Header */}
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <Link className="nav-link" href="/">
                                        ANASAYFA
                                    </Link>

                                </li>
                                
                                {categories.map((category, index) => (
                                    <li key={index} className="nav-item">
                                        <Link href={`/category/${formatSubCategoryForURL(category.name)}`}>
                                            <div className="nav-link">{category.name}</div>
                                        </Link>
                                    </li>
                                ))}

                                {staticLinks.map((link, index) => (
                                    <li key={index} className="nav-item">
                                        <Link href={link.href}>
                                            <div className={`nav-link ${path === link.href ? 'active' : ''}`}>{link.text}</div>
                                        </Link>
                                    </li>
                                ))}


                            </ul>
                        </div>
                        <div className="w-100 w-lg-auto d-none d-lg-flex">
                            {/* Start Search Button */}
                            <div className='d-flex align-items-center'>
                                <button type="button" className="btn btn-search_two ms-auto" onClick={handleSearchButtonClick} >
                                    <i className="fa fa-search fa-lg" />
                                </button>

                            </div>
                            {/* End Search Button */}
                        </div>
                        {/* End Color Change Button */}
                    </div>
                </nav>
                {/* END OF/. NAVIGATION */}
               
               

            </header>
            {/* *** END OF /. PAGE HEADER SECTION *** */}

        </>
    );
};

export default Header;
