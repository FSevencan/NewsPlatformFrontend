
"use client"
import dynamic from "next/dynamic";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import 'animate.css/animate.css'
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import useArticles from '@/hooks/articleHook/useArticle';
import { formatSubCategoryForURL } from "@/Utilities/urlFormatHelpers"
import { formatDateOnly } from "@/Utilities/dateFormatHelpers"

if (typeof window !== "undefined") {
    window.$ = window.jQuery = require("jquery");
}
// This is for Next.js. On Rect JS remove this line
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false,
});

const RelatedArticles = ({ currentArticleId, currentCategoryName }) => {
    // currentCategoryName kullanarak hook'u çağır
    const { articles, isLoading } = useArticles({ subCategoryName: currentCategoryName, pageSize:4 });


    // OwlCarousel options
    const optionThree = {
        items: 1,
        loop: true,
        dots: false,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        nav: true,
        navText: [
            "<i class='ti ti-angle-left'></i>",
            "<i class='ti ti-angle-right'></i>"
        ]
    };

    if (isLoading) {
        return <div>Loading related articles...</div>;
    }

    // Makale listesini filtreleyerek, mevcut makale hariç tutulacak
    const filteredArticles = articles.filter(article => article.id !== currentArticleId);
    return (
        <OwlCarousel className="post-slider owl-theme" {...optionThree}>
            {/* item one */}
            
            <div className="item">
                <div className="news-grid-2">
                    <div className="row row-margin">
                        {filteredArticles.map(article => (
                            <div className="col-xs-6 col-sm-4 col-md-4 col-padding">
                                <div className="grid-item">
                                    <div className="grid-item-img">
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
                                    <span className="post-category">{article.subCategoryName}</span>
                                    <h5>
                                        <Link href={`/${formatSubCategoryForURL(article.subCategoryName)}/${article.slug}`}>
                                            {article.title}
                                        </Link>
                                    </h5>

                                    <ul className="authar-info d-flex flex-wrap">
                                        <li>{formatDateOnly(article.createdDate)}</li>

                                    </ul>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </OwlCarousel>
    );
};


export default RelatedArticles;




