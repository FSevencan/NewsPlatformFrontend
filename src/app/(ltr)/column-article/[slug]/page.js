"use client"


import LayoutTwo from "@/components/ltr/layout/layout-two";
import RelatedArticles from "@/components/ltr/related-articles/related-articles";
import useRemoveBodyClass from "@/components/ltr/useEffect-hook/useEffect-hook";
import Link from "next/link";
import StickyBox from "react-sticky-box";
import { formatDate } from "@/Utilities/dateFormatHelpers"
import WeatherDisplay from '@/components/ltr/WeatherDisplay/weatherDisplay';
import useColumnArticleBySlug from "@/hooks/columnArticleHook/useColumnArticleBySlug"
import { useState, useEffect } from 'react';
import useMostLikedArticles from "@/hooks/articleHook/useMostLikedArticles";
import { formatDateOnly } from "@/Utilities/dateFormatHelpers"
import { formatSubCategoryForURL } from "@/Utilities/urlFormatHelpers"


const ArticleDetailPage = () => {
    useRemoveBodyClass(['None'], ['home-seven', 'home-nine', 'boxed-layout', 'home-six', 'home-two']);
    const [slug, setSlug] = useState('');

    useEffect(() => {
        const fetchSlugFromPath = () => {
            const path = window.location.pathname;
            const pathParts = path.split('/');
            const slugFromPath = pathParts[pathParts.length - 1];
            setSlug(slugFromPath);
        };
        fetchSlugFromPath();
    }, []);


    const { article, loading, error } = useColumnArticleBySlug(slug);

  
    // en begenilen 5 haber
    const { mostLikedArticles } = useMostLikedArticles()


    if (!article) {
        return <div className="se-pre-con">
            <div className="loader"></div>
        </div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <LayoutTwo>
            {/* *** START PAGE MAIN CONTENT *** */}
            <main className="page_main_wrapper">
                {/* START PAGE TITLE */}
                <div className="page-title">
                    <div className="container">
                        <div className="align-items-center row">
                            <div className="col">

                            </div>
                            <div className="col-12 col-sm-auto">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb d-inline-block">
                                        <li className="breadcrumb-item">
                                            <Link href="/">AnaSayfa</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            {article.categoryName}
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                {/* END OF /. PAGE TITLE */}
                <div className="container">
                    <div className="row row-m">
                        {/* START MAIN CONTENT */}
                        <div className="col-md-8 col-p  main-content">
                            <StickyBox>
                                <div className="post_details_inner">
                                    <div className="post_details_block details_block2">
                                        <div className="post-header">
                                            <div className="td-category">
                                                <Link className="post-category" href="#">
                                                    {article.categoryName}
                                                </Link>
                                            </div>
                                            <h2>
                                                {article.title}
                                            </h2>
                                            <ul className="authar-info d-flex flex-wrap">
                                              
                                                {formatDate(article.createdDate)}
                                                
                                            </ul>

                                        </div>

                                        <figure className="social-icon">
                                            <img
                                                src={article.featuredImage}
                                                className="img-fluid"
                                                alt=""
                                            />
                                            <div>
                                                <Link href="#">
                                                    <i className="fab fa-facebook-f" />
                                                </Link>
                                                <Link href="#">
                                                    <i className="fab fa-twitter" />
                                                </Link>
                                                <Link href="#">
                                                    <i className="fab fa-instagram" />
                                                </Link>
                                                <Link href="#" className="d-md-block d-none">
                                                    <i className="fab fa-linkedin-in" />
                                                </Link>
                                                <Link href="#" className="d-md-block d-none">
                                                    <i className="fab fa-pinterest-p" />
                                                </Link>
                                            </div>
                                        </figure>
                                        <p>
                                            {article.content}
                                        </p>



                                    </div>

                                </div>
                               
                              


                            </StickyBox>
                        </div>
                        {/* END OF /. MAIN CONTENT */}
                        {/* START SIDE CONTENT */}
                        <div className="col-md-4 col-p rightSidebar">
                            <StickyBox>

                                <WeatherDisplay city="İstanbul" />

                                {/* START ADVERTISEMENT */}
                                <div className="add-inner">
                                    <a href="https://www.fatihsevencan.com" target="_blank" rel="noopener noreferrer">
                                        <img
                                            src="https://i.imgur.com/tOJQSt1.png"
                                            className="img-fluid"
                                            alt="Açıklama"
                                        />
                                    </a>
                                </div>
                                {/* END OF /. ADVERTISEMENT */}

                                {/* START NAV TABS */}
                                <div className="tabs-wrapper">
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button
                                                className="nav-link border-0 active"
                                                id="most-viewed"
                                                data-bs-toggle="tab"
                                                data-bs-target="#most-viewed-pane"
                                                type="button"
                                                role="tab"
                                                aria-controls="most-viewed-pane"
                                                aria-selected="true"

                                            >
                                                Trend Haberler
                                            </button>
                                        </li>

                                    </ul>
                                    <div className="tab-content" id="myTabContent"  >

                                        <div className="most-viewed" >
                                            <ul id="most-today" className="content tabs-content" >
                                                {mostLikedArticles.map((mostLikedArticle, index) => (
                                                    <li key={mostLikedArticle.id} >
                                                        <span className="count">{index + 1}</span>
                                                        <span className="text" >
                                                            <Link href={`/${formatSubCategoryForURL(mostLikedArticle.subCategoryName)}/${mostLikedArticle.slug}`}>
                                                                {mostLikedArticle.title}
                                                            </Link>
                                                            <div style={{ marginTop: "8px" }}>
                                                                <p style={{ fontSize: "13px" }}>
                                                                    <i className="ti ti-timer" /> {formatDateOnly(mostLikedArticle.createdDate)} --
                                                                    <i className="ti ti-thumb-up" style={{ marginRight: '1px' }} />
                                                                    {mostLikedArticle.totalLikes}
                                                                </p>
                                                            </div>

                                                        </span >

                                                    </li >

                                                ))}
                                            </ul>
                                        </div>

                                    </div>
                                </div>
                                {/* END OF /. NAV TABS */}
                            </StickyBox>
                        </div>
                        {/* END OF /. SIDE CONTENT */}
                    </div>
                </div>
            </main>
            {/* *** END OF /. PAGE MAIN CONTENT *** */}
        </LayoutTwo>
    );
};



export default ArticleDetailPage;