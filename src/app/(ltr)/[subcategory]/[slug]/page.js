﻿"use client"

import ArticleService from '@/services/articleService/articleService';
import LayoutTwo from "@/components/ltr/layout/layout-two";
import RelatedArticles from "@/components/ltr/related-articles/related-articles";
import useRemoveBodyClass from "@/components/ltr/useEffect-hook/useEffect-hook";
import Link from "next/link";
import StickyBox from "react-sticky-box";
import { formatDate } from "@/Utilities/dateFormatHelpers"
import WeatherDisplay from '@/components/ltr/WeatherDisplay/weatherDisplay';
import useArticleReaction from "@/hooks/articleReactionHook/useArticleReactions"
import { useState , useEffect } from 'react';
import useMostLikedArticles from "@/hooks/articleHook/useMostLikedArticles";
import { formatDateOnly } from "@/Utilities/dateFormatHelpers"
import { formatSubCategoryForURL } from "@/Utilities/urlFormatHelpers"


const ArticleDetailPage = () => {
    useRemoveBodyClass(['None'], ['home-seven', 'home-nine', 'boxed-layout', 'home-six', 'home-two']);
    const [article, setArticle] = useState(null);
    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);

    useEffect(() => {
        const fetchArticle = async () => {
            const path = window.location.pathname;
            const pathParts = path.split('/');
            const slug = pathParts[pathParts.length - 1];
            try {
                const response = await ArticleService.getBySlug(slug);
                setArticle(response.data);
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        };
        fetchArticle();
    }, []);

  
    const {  handleLike, handleDislike, userReaction, checkUserReaction } = useArticleReaction(article?.id, article?.totalLikes || 0, article?.totalDislikes || 0);

    // Kullanıcının mevcut tepkisini kontrol et
    useEffect(() => {
        if (article) {
            // Makale bilgisi güncellendiğinde, beğeni ve beğenmeme sayılarını set et.
            setLikeCount(article.totalLikes || 0);
            setDislikeCount(article.totalDislikes || 0);
            checkUserReaction();
        }
    }, [article]);

    const handleLikeUpdated = async () => {
        await handleLike();
        // İşlem sonrası beğeni sayısını güncelle
        setLikeCount(prev => userReaction === 'liked' ? prev - 1 : prev + 1);
        // Eğer önceden beğenmeme yapılmışsa, o sayıyı düşür
        if (userReaction === 'disliked') {
            setDislikeCount(prev => Math.max(0, prev - 1));
        }
    };

    const handleDislikeUpdated = async () => {
        await handleDislike();
        // İşlem sonrası beğenmeme sayısını güncelle
        setDislikeCount(prev => userReaction === 'disliked' ? prev - 1 : prev + 1);
        // Eğer önceden beğeni yapılmışsa, o sayıyı düşür
        if (userReaction === 'liked') {
            setLikeCount(prev => Math.max(0, prev - 1));
        }
    };

    // en begenilen 5 haber
    const { mostLikedArticles } = useMostLikedArticles()
  

    if (!article) {
        return <div className="se-pre-con">
            <div className="loader"></div>
        </div>;
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
                                                {article.subcategoryName}
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
                                                <h2>{article.title}</h2>
                                                <div className="article-metadata">
                                                    <div className="metadata-top">
                                                        <div className="td-category">
                                                            <Link className="post-category" href="#">
                                                                {article.subcategoryName}
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="metadata-bottom">
                                                        <div className="article-tags">
                                                            <span>Etiketler:</span>
                                                            <ul>
                                                                {article.tags.map((tag, index) => (
                                                                    <li key={tag.id}>
                                                                        <Link
                                                                            className="ui tag text-uppercase fw-semibold border"
                                                                            href={`/tag/${formatSubCategoryForURL(tag.name)}`}>
                                                                            {tag.name}
                                                                        </Link>
                                                                        {index < article.tags.length - 1 && <span className="tag-separator">, </span>}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        <div className="authar-info">
                                                            {formatDate(article.createdDate)}
                                                        </div>
                                                    </div>
                                                </div>
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

                                            <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
                                           
                                         
                                          
                                        </div>

                                    </div>
                                    <div className="article-reactions mb-120">
                                        <button
                                            className={`reaction-button like-button ${userReaction === 'liked' ? 'selected' : ''}`}
                                            onClick={handleLikeUpdated} 
                                        >
                                            <i className="fa fa-thumbs-up"></i> Beğendim ({likeCount})
                                        </button>
                                        <button
                                            className={`reaction-button dislike-button ${userReaction === 'disliked' ? 'selected' : ''}`}
                                            onClick={handleDislikeUpdated} 
                                        >
                                            <i className="fa fa-thumbs-down"></i> Beğenmedim ({dislikeCount})
                                        </button>
                                    </div>
                                    <br/>
                                    {/* START RELATED ARTICLES */}
                                    <div className="post-inner post-inner-2">
                                        {/*post header*/}
                                        <div className="post-head">
                                            <h2 className="title">
                                                <strong>Benzer </strong> Haberler
                                            </h2>
                                        </div>
                                        {/* post body */}
                                        <div className="post-body">
                                            <RelatedArticles currentArticleId={article?.id} currentCategoryName={article?.subcategoryName} />
                                        </div>
                                        {/* Post footer */}
                                        
                                    </div>
                                    {/* END OF /. RELATED ARTICLES */}


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