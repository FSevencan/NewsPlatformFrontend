"use client"
import StickyBox from "react-sticky-box";
import './globals.css'
import NewsTicker from "@/components/ltr/news-ticker-carousal/page";
import { useBackgroundImageLoader } from "@/components/ltr/use-background-image/use-background-image";
import Layout from "@/components/ltr/layout/layout";
import MagazineArticleSlider from "@/components/ltr/magazine-article-slider/magazine-article-slider";
import YoutubeVideo from "@/components/ltr/youtube-video/youtube-video";
import useRemoveBodyClass from "@/components/ltr/useEffect-hook/useEffect-hook";
import DatePickerComponents from "@/components/ltr/date-picker/date-picker";
import PollWidget from "@/components/ltr/poll-widget/poll";
import HomeFeatureCarousal from "@/components/ltr/home-feature-carousal/home-feature-carousal";
import HomeCenterSlider from "@/components/ltr/home-center-slider/home-center-slider";
import Tags from "@/components/ltr/tags/tags";
import ColumnArticleSlider from "@/components/ltr/column-article-slider/column-article-slider";
import Link from "next/link";
import Pagination from "@/components/ltr/pagination/pagination";
import useArticles from "@/hooks/articleHook/useArticle";
import useCategories from '@/hooks/categoryHook/useCategory';
import useLatestPoll from '@/hooks/pollHook/useLatestPoll';
import { formatDateOnly } from "@/Utilities/dateFormatHelpers"
import { cleanHtmlAndSubstring } from "@/Utilities/htmlAndTextFormatHelpers"
import { formatSubCategoryForURL } from "@/Utilities/urlFormatHelpers"
import { useState , useEffect } from 'react';
import useMostLikedArticles from "../hooks/articleHook/useMostLikedArticles";
import GameResults from "../components/ltr/game-result/GameResults";
export default function Home() {
    
    {/* *** ADD AND REMOVE CLASS ON BODY TAG *** */ }
    useRemoveBodyClass(['home-nine'], ['boxed-layout', 'layout-rtl']);
    {/* *** IMPORT BACKGROUND IMAGE *** */ }
    useBackgroundImageLoader()

    // Girilen kategoriler hariç haberleri getir 
    const { articles, isLoading } = useArticles({ pageSize: 8, excludeCategories: ["Son Dakika", "Gündem"] });
    const leftArticles = articles.slice(0, 3);
    const rightArticles = articles.slice(3, 6);

    // Kategorileri Listele
    const { categories } = useCategories();

    // Köşe Yazıları kategorilerine göre flitreleme
    const [selectedCategory, setSelectedCategory] = useState();

    useEffect(() => {
        // 'Spor' kategorisini varsayılan olarak bul ve seç
        const defaultCategory = categories.find(cat => cat.name === 'Spor');
        if (defaultCategory) {
            setSelectedCategory(defaultCategory.id);
        }
    }, [categories]); 

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
    };


    // En yeni anketin Id sini getir
    const { latestPoll } = useLatestPoll();

    // En begenilen 5 Haber
    const { mostLikedArticles } = useMostLikedArticles()

    //Dünya altkategorisine ait son 4 haber
    const { articles: NationalArticles } = useArticles({
        pageSize: 4,
        subCategoryName: 'Dünya'
    });

    //Teknoloji altkategorisine ait son 4 haber
    const { articles: TechArticles } = useArticles({
        pageSize: 4,
        subCategoryName: 'Teknoloji'
    });


    //Finans altkategorisine ait son 4 haber
    const { articles: Finance } = useArticles({
        pageSize: 4,
        subCategoryName: 'Finans'
    });



    //Sayfalama yapısı 
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Son haberleri getir 
    const { articles: allArticles, isLoading: isLoadingAll, error: errorAll, pages, hasNext, hasPrevious } = useArticles({ page: currentPage, pageSize: 8 });

    

    if (isLoading) {
        return (
            <div className="se-pre-con">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <Layout>


            {/* *** START PAGE MAIN CONTENT *** */}
            <main className="page_main_wrapper">
                {/* START NEWSTRICKER */}
                <NewsTicker />
                {/*  END OF /. NEWSTRICKER */}
                {/* START FEATURE SECTION */}
                <div
                    className="bg-img feature-section py-4 py-lg-3 py-xl-4"
                    data-image-src="assets/images/bg-shape.png"
                >
                    <div className="container">

                        <HomeFeatureCarousal />
                    </div>


                </div>
                {/* END OF /. FEATURE SECTION */}
                {/* START POST BLOCK SECTION */}
                <section className="slider-inner">

                    <div className="container-fluid p-0">
                        <div className="row thm-margin">
                            <div className="col-md-4 col-xxl-4 thm-padding d-md-none d-xxl-block">
                                <div className="row slider-right-post thm-margin">
                                    {leftArticles.map((article, index) => {
                                        // İlk iki haberi kare şeklinde, üçüncü haberi dikdörtgen şeklinde göster
                                        const colClasses = index < 2 ? "col-6 col-sm-6 thm-padding" : "col-md-12 col-sm-12 d-md-block d-none thm-padding";
                                        return (
                                            <div className={colClasses}>
                                                <div className="slider-post post-height-4">
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
                                                        <ul className="align-items-center authar-info d-flex flex-wrap gap-1">
                                                            <li>{formatDateOnly(article.createdDate)}</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="col-md-6 col-xxl-4 thm-padding">
                                <div className="slider-wrapper">
                                    <HomeCenterSlider />
                                </div>
                            </div>

                            <div className="col-md-6 col-xxl-4 thm-padding">
                                <div className="row slider-right-post thm-margin">
                                    {rightArticles.map((article, index) => {
                                        // İlk haberi dikdörtgen, diğerlerini kare şeklinde göster
                                        const colClasses = index === 0 ? "col-md-12 col-sm-12 thm-padding" : "col-6 col-sm-6 thm-padding";
                                        return (
                                            <div className={colClasses}>
                                                <div className="slider-post post-height-4">
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
                                                        <ul className="align-items-center authar-info d-flex flex-wrap gap-1">
                                                            <li>{formatDateOnly(article.createdDate)}</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                        </div>
                    </div>

                </section>
                {/* END OF /. POST BLOCK SECTION */}
                <div className="container">
                    <div className="row gx-lg-5">
                        {/* START MAIN CONTENT */}
                        <div className="col-md-3 leftSidebar d-none d-xl-block">
                            <StickyBox >
                                <div className="panel_header">
                                    <h4>
                                        <strong>Dünyadan </strong> Haberler
                                    </h4>
                                </div>
                                <div className="border-bottom posts">
                                    <ul>
                                        <li className="post-grid">
                                            {NationalArticles.map((nationalArticle) => (
                                                <div className="posts-inner px-0">
                                                    <h6 className="posts-title">
                                                        <Link href={`/${formatSubCategoryForURL(nationalArticle.subCategoryName)}/${nationalArticle.slug}`}>
                                                            {nationalArticle.title}
                                                        </Link>
                                                    </h6>
                                                    <ul className="align-items-center authar-info d-flex flex-wrap gap-1">
                                                        <li>
                                                            <span className="post-category">{nationalArticle.subCategoryName}</span>
                                                        </li>
                                                        <li>{formatDateOnly(nationalArticle.createdDate)}</li>
                                                    </ul>
                                                    <p>
                                                        {cleanHtmlAndSubstring(nationalArticle.content, 70)}
                                                    </p>
                                                </div>
                                            ))}
                                        </li>


                                    </ul>
                                </div>
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
                                    <br/>
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
                        <div className="col-sm-7 col-md-8 col-xl-6 border-start border-end main-content">
                            <StickyBox>
                                {/* START POST CATEGORY STYLE ONE (Popular news) */}
                                <div className="post-inner">
                                    {/* post body */}

                                    <div className="post-head">
                                        <h2 className="title">
                                            <strong>MAGAZİN</strong> HABERLERİ
                                        </h2>
                                        
                                    </div>
                                    {/* post body */}
                                    <div className="post-body">
                                        <MagazineArticleSlider />
                                    </div>
                                    {/* Post footer */}
                                    <div className="post-footer">
                                        <div className="row thm-margin">
                                            <div className="col-md-12 thm-padding">
                                                <Link className="more-btn" href={`/category/magazin`}>
                                                    TÜM MAGAZİN HABERLERİ <i className="fas fa-arrow-right"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                {/* END OF /. POST CATEGORY STYLE ONE (Popular news) */}
                                {/* START ADVERTISEMENT */}
                                <div className="add-inner">
                                    <Link href="https://www.fatihsevencan.com/" target="_blank" rel="noopener noreferrer">
                                        <img
                                            src="/reklam.jpg"
                                            className="img-fluid"
                                            alt=""
                                        />
                                    </Link>
                                </div>
                                {/* END OF /. ADVERTISEMENT */}
                                <div className="post-inner post-inner-2">
                                    {/*post header*/}
                                    <div className="post-head">
                                        <h2 className="title">
                                            <strong>Köşe</strong> Yazıları
                                        </h2>
                                        <div className="filter-nav">
                                            <ul>
                                                {categories.slice(0, 5).map((category) => (
                                                    <li key={category.id} className={selectedCategory === category.id ? 'active' : ''}>
                                                        <a href="#" onClick={(e) => {
                                                            e.preventDefault();
                                                            handleCategorySelect(category.id);
                                                        }}>
                                                            {category.name}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    {/* post body */}
                                    <div className="post-body">
                                        <ColumnArticleSlider selectedCategory={selectedCategory} />
                                    </div>
                                </div>
                               
                            </StickyBox>
                        </div>
                        {/* END OF /. MAIN CONTENT */}
                        {/* START SIDE CONTENT */}
                        <div className="col-sm-5 col-md-4 col-xl-3 rightSidebar">
                            <StickyBox>
                                {/* START POLL WIDGET */}

                                {latestPoll ? <PollWidget pollId={latestPoll.id} /> : <div>Yükleniyor...</div>}

                                {/* END OF /. POLL WIDGET */}

                                {/* START CATEGORIES WIDGET */}
                                <div className="panel_inner categories-widget">
                                    <div className="panel_header">
                                        <h4>
                                            <strong>KATEGORİLER</strong>
                                        </h4>
                                    </div>

                                    <div className="panel_body">
                                        <ul className="category-list">
                                            {categories.map(category => (

                                                <li>
                                                    <Link href={`/category/${formatSubCategoryForURL(category.name)}`}>
                                                        {category.name} <span>{category.totalArticleCount}</span>
                                                    </Link>


                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                {/* END OF /. CATEGORIES WIDGET */}

                                {/* START TAGS*/}
                                <Tags />
                                {/* END OF /. TAGS */}


                            </StickyBox>
                        </div>
                        {/* END OF /. SIDE CONTENT */}
                    </div>
                </div>
                {/* START YOUTUBE VIDEO */}
                <div className="mb-4 py-5 position-relative video-section">
                    <div className="container">
                        <div className="row justify-content-center mb-5">
                            <div className="col-md-6 text-center">
                                <h3 className="text-white">Video Haberler</h3>
                                <p className="text-white mb-0">
                                    Türkiye ve dünyanın gündeminden sıcak gelişmeler, son dakika haberlerleri ve daha fazlası için bizi takipte kalın! 
                                </p>
                            </div>
                        </div>
                        <YoutubeVideo />
                    </div>
                </div>
                {/* END OF /. YOUTUBE VIDEO */}
                <section className="articles-wrapper">
                    <div className="container">
                        <div className="row gx-lg-5">
                            <div className="col-md-3 leftSidebar d-none d-xl-block">
                                <StickyBox>
                                    {/* START TECH & INNOVATION */}
                                    <div className="panel_inner">
                                        <div className="panel_header">
                                            <h4>
                                                <strong>TEKNOLOJİ</strong> HABERLERİ
                                            </h4>
                                        </div>
                                        <div className="panel_body">
                                            {TechArticles.map((article, index) => (
                                                <div key={article.slug} className={`border-bottom ${index === 0 ? 'mb-3' : ''}`}>
                                                    {index === 0 && (
                                                        <Link href={`/${formatSubCategoryForURL(article.subCategoryName)}/${article.slug}`}>
                                                        <div href="#" className="d-block">
                                                            <img
                                                                src={article.featuredImage}
                                                                alt=""
                                                                className="img-fluid w-100"
                                                            />
                                                            </div>
                                                        </Link>
                                                    )}

                                                    <h5>
                                                        <Link href={`/${formatSubCategoryForURL(article.subCategoryName)}/${article.slug}`}>
                                                            {article.title}
                                                        </Link>
                                                    </h5>
                                                    <ul className="align-items-center authar-info d-flex flex-wrap gap-1">
                                                        <li>
                                                            <span className="post-category mb-0">{article.subCategoryName}</span>
                                                        </li>
                                                        <li>{formatDateOnly(article.createdDate)}</li>
                                                    </ul>
                                                    <p>
                                                        {cleanHtmlAndSubstring(article.content, 70)}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                    {/* END OF /. TECH & INNOVATION */}
                                    {/* START EDITOR'S PICKS */}
                                    <div className="panel_inner mb-0">
                                        <div className="panel_header">
                                            <h4>
                                                <strong>Finans</strong> HABERLERİ
                                            </h4>
                                        </div>
                                        <div className="panel_body">
                                            {Finance.map((article, index) => (
                                                <div key={article.slug} className={`border-bottom ${index === 0 ? 'mb-3' : ''}`}>
                                                    {index === 0 && (
                                                        <Link href={`/${formatSubCategoryForURL(article.subCategoryName)}/${article.slug}`}>
                                                            <div  className="d-block">
                                                                <img
                                                                    src={article.featuredImage}
                                                                    alt=""
                                                                    className="img-fluid w-100"
                                                                />
                                                            </div>
                                                        </Link>
                                                    )}

                                                    <h5>
                                                        <Link href={`/${formatSubCategoryForURL(article.subCategoryName)}/${article.slug}`}>
                                                            {article.title}
                                                        </Link>
                                                    </h5>
                                                    <ul className="align-items-center authar-info d-flex flex-wrap gap-1">
                                                        <li>
                                                            <span className="post-category mb-0">{article.subCategoryName}</span>
                                                        </li>
                                                        <li>{formatDateOnly(article.createdDate)}</li>
                                                    </ul>
                                                    <p>
                                                        {cleanHtmlAndSubstring(article.content, 70)}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* END OF /. EDITOR'S PICKS */}
                                </StickyBox>
                            </div>
                            <div className="col-sm-7 col-md-8 col-xl-6 border-start border-end main-content">
                                <StickyBox>
                                    {/* START POST CATEGORY STYLE FOUR (Latest articles ) */}
                                    <div className="post-inner">
                                        {/*post header*/}
                                        <div className="post-head">
                                            <h2 className="title">
                                                <strong>Son</strong> Haberler
                                            </h2>
                                        </div>
                                        {/* post body */}
                                        <div className="post-body">
                                            {allArticles.map((article) => (
                                                <div key={article.id}  className="news-list-item articles-list">

                                                    <div className="img-wrapper">
                                                        <div className="align-items-center bg-primary d-flex justify-content-center position-absolute rounded-circle text-white">

                                                        </div>
                                                        <Link href={`/${formatSubCategoryForURL(article.subCategoryName)}/${article.slug}`}>
                                                            <div className="news-image">
                                                                <img
                                                                    src={article.featuredImage}
                                                                    alt=""
                                                                    className="img-fluid"
                                                                />
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    <div className="post-info-2">
                                                        <h4>
                                                            <Link href={`/${formatSubCategoryForURL(article.subCategoryName)}/${article.slug}`}>
                                                                {article.title}
                                                            </Link>
                                                        </h4>
                                                        <ul className="align-items-center authar-info d-flex flex-wrap gap-1">
                                                            <li>
                                                                <span className="post-category mb-0">{article.subCategoryName}</span>
                                                            </li>

                                                            <li>{formatDateOnly(article.createdDate)}</li>
                                                        </ul>
                                                        <p className="d-lg-block d-none">
                                                            {article.content}
                                                        </p>
                                                    </div>

                                                </div>

                                            ))}

                                        </div>{" "}
                                        {/* /. post body */}
                                        {/*Post footer*/}
                                        <div className="post-footer">
                                            <div className="row thm-margin">
                                                <div className="col-md-8 thm-padding center-pagination">

                                                    <Pagination
                                                        currentPage={currentPage}
                                                        totalPages={pages}
                                                        onPageChange={handlePageChange}
                                                        hasNext={hasNext}
                                                        hasPrevious={hasPrevious}
                                                    />
                                                </div>
                                                

                                            </div>
                                        </div>{" "}
                                        {/* /.Post footer*/}
                                    </div>
                                    {/* END OF /. POST CATEGORY STYLE FOUR (Latest articles ) */}
                                    {/* START ADVERTISEMENT */}


                                    <div className="add-inner mb-0">
                                        <Link href="https://www.fatihsevencan.com/" target="_blank" rel="noopener noreferrer">
                                            <img
                                                src="https://i.imgur.com/v9kNWhA.png"
                                                className="img-fluid"
                                                alt="Fatih Sevencan Portfolyo"
                                            />
                                        </Link>
                                        
                                    </div>
                                    <br/>
                                    {/* END OF /. ADVERTISEMENT */}
                                </StickyBox>
                            </div>
                            
                            <div className="col-sm-5 col-md-4 col-xl-3 rightSidebar">
                                <StickyBox>
                                 
                                    {/* START GAMES RESULT POST */}
                                    < GameResults/>
                                    {/* END OF /. GAMES RESULT POST */}

                                    {/* START ADVERTISEMENT */}
                                    <div className="add-inner">
                                        <img
                                            src="https://i.imgur.com/tOJQSt1.png"
                                            className="img-fluid"
                                            alt=""
                                        />
                                    </div>
                                    {/* END OF /. ADVERTISEMENT */}

                                    {/* START ARCHIVE */}
                                    <div className="archive-wrapper">
                                        <DatePickerComponents />
                                    </div>
                                    {/* END OF /. ARCHIVE */}

                                </StickyBox>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            {/* *** END OF /. PAGE MAIN CONTENT *** */}

        </Layout>

    )
}
