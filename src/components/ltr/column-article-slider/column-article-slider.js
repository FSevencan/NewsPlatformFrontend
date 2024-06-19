"use client"
import dynamic from "next/dynamic";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import 'animate.css/animate.css'
import useColumnArticles from '@/hooks/columnArticleHook/useColumnArticles ';
import { formatDateOnly } from "@/Utilities/dateFormatHelpers"
import { cleanHtmlAndSubstring } from "@/Utilities/htmlAndTextFormatHelpers"
import Link from "next/link";
import { formatSubCategoryForURL } from "@/Utilities/urlFormatHelpers"
import { useEffect } from "react";


if (typeof window !== "undefined") {
    window.$ = window.jQuery = require("jquery");
}
// This is for Next.js. On Rect JS remove this line
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false,
});


const ColumnArticleSlider = ({ selectedCategory }) => {
    const optionFour = {
        items: 1,
        loop: true,
        dots: false,
        margin: 12,
        animateOut: 'animate__fadeOut',
        animateIn: 'animate__fadeIn',
        nav: true,
        navText: [
            "<i class='ti ti ti-angle-left'></i>",
            "<i class='ti ti ti-angle-right'></i>"
        ]
    }

    const { columnArticles, loading, error } = useColumnArticles(0, 10, selectedCategory);

    const rightSideArticle = columnArticles.length > 0 ? columnArticles[0] : null;

    const listArticles = columnArticles.length > 1 ? columnArticles.slice(1) : [];

    useEffect(() => {
        // Fetch articles for the default category when the component mounts
        // This will trigger whenever selectedCategory changes
        if (selectedCategory) {
            // Fetch articles using the selected category
        }

    }, [selectedCategory]);


    if (loading) return <div>Loading...</div>;
    if (columnArticles.length === 0) return <div>Bu kategoride bir köşe yazısı bulunmamaktadır.</div>;
    if (error) return <div>Error: {error.message}</div>;



    return (
        <OwlCarousel className="post-slider owl-theme" {...optionFour}>
            {/* item one */}
            <div className="item">
                <div className="row">
                    <div className="bord-right col-md-6">
                        {rightSideArticle && (
                            <article>
                                <figure>
                                    <Link href={`/column-article/${formatSubCategoryForURL(rightSideArticle.title)}`}>
                                        <img
                                            src={rightSideArticle.featuredImage}
                                            height={242}
                                            width={345}
                                            alt=""
                                            className="img-fluid"
                                        />
                                    </Link>
                                    <span className="post-category">{rightSideArticle.categoryName}</span>
                                </figure>



                                <div className="post-info">
                                    <h3>
                                        <Link href={`/column-article/${formatSubCategoryForURL(rightSideArticle.title)}`}>
                                            {rightSideArticle.title}
                                        </Link>
                                    </h3>
                                    <ul className="authar-info d-flex flex-wrap">
                                        <li>
                                            <i className="ti ti-timer" /> {formatDateOnly(rightSideArticle.createdDate)}
                                        </li>

                                    </ul>
                                    <p className="p">
                                        {cleanHtmlAndSubstring(rightSideArticle.content, 200)}
                                    </p>
                                </div>
                            </article>

                        )}

                    </div>
                    <div className="col-md-6">
                        <div className="news-grid-2">
                            {listArticles.map((article) => (

                                <div className="row row-margin">
                                    <div className="col-6 col-md-6 col-padding col-sm-6">
                                        <div className="grid-item">
                                            <div className="grid-item-img">
                                                <Link href={`/column-article/${formatSubCategoryForURL(article.title)}`}>
                                                    <img
                                                        src={article.featuredImage}
                                                        className="img-fluid"
                                                        alt=""
                                                    />
                                                    <div className="link-icon">
                                                        <i className="fa fa-camera" />
                                                    </div>
                                                </Link>
                                            </div>
                                            <h5>
                                                <Link href={`/column-article/${formatSubCategoryForURL(article.title)}`}>
                                                    {article.title}
                                                </Link>
                                            </h5>
                                            <ul className="authar-info d-flex flex-wrap">
                                                <i className="ti ti-timer" /> {formatDateOnly(rightSideArticle.createdDate)}
                                            </ul>
                                        </div>
                                    </div>


                                </div>

                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </OwlCarousel>
    );
};

export default ColumnArticleSlider;