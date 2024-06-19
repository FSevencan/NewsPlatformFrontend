"use client"

import LayoutTwo from '@/components/ltr/layout/layout-two';
import LeftCarousal from '@/components/ltr/left-carousal/left-carousal';
import useRemoveBodyClass from '@/components/ltr/useEffect-hook/useEffect-hook';
import Link from 'next/link';
import React, { useEffect , useState} from 'react';
import StickyBox from 'react-sticky-box';
import useCategoryArticles from '@/hooks/categoryHook/useCategoryArticles';
import { formatDateOnly } from "@/Utilities/dateFormatHelpers"
import { formatSubCategoryForURL } from "@/Utilities/urlFormatHelpers"
import WeatherDisplay from '@/components/ltr/WeatherDisplay/weatherDisplay';
import Pagination from "@/components/ltr/pagination/pagination";
import useMostLikedArticles from "@/hooks/articleHook/useMostLikedArticles";

const page = () => {
    useRemoveBodyClass(['None'], ['home-seven', 'home-nine', 'boxed-layout', 'home-six', 'home-two']);

    const [categoryName, setCategoryName] = useState(null);
    const pageSize = 15;

    useEffect(() => {
        const path = window.location.pathname;
        const pathSegments = path.split('/');
        const CategoryName = pathSegments[pathSegments.length - 1];
        setCategoryName((CategoryName));
    }, []);

    // Sayfalama için state tanımlaması
    const [currentPage, setCurrentPage] = useState(0);

    const { articles, loading, totalResults, error, pages, hasNext, hasPrevious } = useCategoryArticles(categoryName, currentPage, pageSize);


    const sliderArticles = articles.slice(0, 3);
    const rightSideArticles = articles.slice(3, 7);
    const listArticles = articles.slice(7);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const { mostLikedArticles } = useMostLikedArticles()

    if (loading || !categoryName) return (
        <div className="se-pre-con">
            <div className="loader"></div>
        </div>
    );

    if (error) return <div>Hata: {error.message}</div>;

    return (
        <LayoutTwo>
            {/* START PAGE TITLE */}
            <div className="page-title">
                <div className="container">
                    <div className="align-items-center row">
                        <div className="col">
                            <h1 className="mb-sm-0">
                                <strong className="ui tag text-uppercase fw-semibold border"
                                    style={{ backgroundColor: "#eb0254", color: 'white' }}>
                                    {decodeURIComponent(categoryName)}
                                </strong>
                            </h1>
                        </div>
                        <div className="col-12 col-sm-auto">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb d-inline-block">
                                    <li className="breadcrumb-item">
                                        <Link href="/">AnaSayfa</Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        category
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            {/* END OF /. PAGE TITLE */}


            {/* *** START PAGE MAIN CONTENT *** */}
            <main className="page_main_wrapper">
                {/* START POST BLOCK SECTION */}
                <section className="slider-inner">
                    <div className="container">
                        <div className="row thm-margin">
                            <div className="col-md-6 thm-padding">
                                <div className="slider-wrapper">
                                    <LeftCarousal articles={sliderArticles} />
                                </div>
                            </div>
                                              
                            <div className="col-md-6 thm-padding">
                                <div className="row slider-right-post thm-margin">

                                 {rightSideArticles.map(article => (

                                    <div className="col-6 col-sm-6 thm-padding">
                                        
                                        <div className="slider-post post-height-2">
                                              <Link href={`/${formatSubCategoryForURL(article.subCategoryName)}/${article.slug}`}>
                                                  <div className="news-image">
                                                      <img
                                                          src={article.featuredImage}
                                                          alt=""
                                                          className="img-fluid"
                                                      />
                                                  </div>
                                              </Link>

                                            <div className="post-text">
                                                  <span className="post-category">{article.subCategoryName}</span>
                                                <h4>
                                                      <Link href={`/${formatSubCategoryForURL(article.subCategoryName)}/${article.slug}`}>
                                                          {article.title}
                                                      </Link>
                                                </h4>
                                                <ul className="authar-info d-flex flex-wrap">
                                                    
                                                      <li className="d-md-block d-none">{formatDateOnly(article.createdDate) }</li>
                                                </ul>
                                            </div>
                                            </div>
                                     
                                    </div>
                                    
                                  ))}                            
                                    </div>
                               
                            </div>
                         
                           
                        </div>
                    </div>
                </section>
                {/* END OF /. POST BLOCK SECTION */}
                <div className="container">
                    <div className="row row-m">
                        {/* START MAIN CONTENT */}
                        <div className="col-sm-7 col-md-8 col-p main-content">
                            <StickyBox>
                                <div className="post-inner categoty-style-1">
                                    {/* post body */}
                                    <div className="post-body">
                                        <div className="row row-m">
                                          {listArticles.map(article => (
                                            <div className="col-md-6 col-p">
                                             
                                                <article>
                                                   
                                                    <figure>
                                                          <Link href={`/${formatSubCategoryForURL(article.subCategoryName)}/${article.slug}`}>
                                                            <img
                                                                src={article.featuredImage}
                                                                height={242}
                                                                width={345}
                                                                alt=""
                                                                className="img-fluid"
                                                            />
                                                          </Link>
                                                          <span className="post-category">{article.subCategoryName}</span>
                                                    </figure>
                                                   

                                                    <div className="post-info">
                                                        <h3>
                                                            <Link href={`/${formatSubCategoryForURL(article.subCategoryName)}/${article.slug}`}>
                                                                 {article.title}
                                                            </Link>
                                                        </h3>
                                                        <ul className="authar-info d-flex flex-wrap">
                                                            <li>
                                                               <li>{formatDateOnly(article.createdDate)}</li>
                                                            </li>
                                                            <li>
                                                                <a href="#" className="link">
                                                                    <i className="ti ti-thumb-up" />
                                                                        {article.totalLikes }
                                                                </a>
                                                            </li>
                                                        </ul>
                                                        </div>
                                                   
                                                </article>

                                                
                                            </div>
                                          ))}
                                        </div>
                                    </div>
                                    {/* Post footer */}
                                    <div className="post-footer">
                                        <div className="row thm-margin">
                                            <div className="col-xs-12 col-sm-12 col-md-12 thm-padding">
                                                {/* pagination */}
                                                <Pagination
                                                    currentPage={currentPage}
                                                    totalPages={pages}
                                                    onPageChange={handlePageChange}
                                                    hasNext={hasNext}
                                                    hasPrevious={hasPrevious}
                                                />
                                                {/* /.pagination */}
                                            </div>
                                        </div>
                                    </div>{" "}
                                    {/* /.Post footer*/}
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

export default page;