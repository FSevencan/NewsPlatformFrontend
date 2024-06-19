
"use client"
import dynamic from "next/dynamic";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import 'animate.css/animate.css'
import useArticles from "@/hooks/articleHook/useArticle";
import { formatDateOnly } from "@/Utilities/dateFormatHelpers"
import { formatSubCategoryForURL } from "@/Utilities/urlFormatHelpers"
import Link from 'next/link';
import { cleanHtmlAndSubstring } from "@/Utilities/htmlAndTextFormatHelpers"


if (typeof window !== "undefined") {
    window.$ = window.jQuery = require("jquery");
}
// This is for Next.js. On Rect JS remove this line
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false,
});



const MagazineArticleSlider = () => {
    const optionThree = {
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

    const { articles: MagazineArticles, isLoading, error } = useArticles({
        pageSize: 5,
        subCategoryName: 'Magazin'
    });

   
    const rightSideArticle = MagazineArticles.length > 0 ? MagazineArticles[0] : null;

    const listArticles = MagazineArticles.length > 1 ? MagazineArticles.slice(1) : [];

   

    if (isLoading) return (
        <div className="se-pre-con">
            <div className="loader"></div>
        </div>
    );

    if (error) return <div>Error: {error.message}</div>;

    return (
        <OwlCarousel className="post-slider owl-theme" {...optionThree}>
            <div className="item">
                <div className="row">
                    {/* İlk haber için büyük resimli alan */}
                    <div className="bord-right col-md-6">
                        {rightSideArticle && (
                            <article key={rightSideArticle.id}>
                                <figure>
                                    <Link href={`/${formatSubCategoryForURL(rightSideArticle.subCategoryName)}/${rightSideArticle.slug}`}>
                                        <img
                                            src={rightSideArticle.featuredImage}
                                            height={242}
                                            width={345}
                                            alt=""
                                            className="img-fluid"
                                        />
                                    </Link>
                                    <span className="post-category">{rightSideArticle.subCategoryName }</span>
                                </figure>
                                <div className="post-info">
                                    <h3>
                                        <Link href={`/${formatSubCategoryForURL(rightSideArticle.subCategoryName)}/${rightSideArticle.slug}`}>
                                            {rightSideArticle.title}
                                        </Link>
                                    </h3>
                                    <ul className="authar-info d-flex flex-wrap">
                                        <li>
                                            <i className="ti ti-timer" /> {formatDateOnly(rightSideArticle.createdDate)}
                                        </li>
                                        <li className="like">
                                           
                                                <i className="ti ti-thumb-up" />
                                                {rightSideArticle.totalLikes}
                                            
                                        </li>
                                    </ul>
                                    <p>
                                        {cleanHtmlAndSubstring(rightSideArticle.content, 250)}
                                    </p>
                                </div>
                            </article>
                        )}
                    </div>

                    {/* Diğer haberler için liste */}
                    <div className="col-md-6">
                        <div className="news-list">
                            {listArticles.map((article) => (
                                <div className="news-list-item" key={article.id}>
                                    <div className="img-wrapper">
                                       <Link className="thumb" href={`/${formatSubCategoryForURL(article.subCategoryName)}/${article.slug}`}>
                                            <img
                                                src={article.featuredImage}
                                                alt={article.title}
                                                className="img-fluid"
                                            />
                                            <div className="link-icon">
                                                <i className="fa fa-camera" />
                                            </div>
                                        </Link>


                                    </div>
                                    <div className="post-info-2" >
                                        <h5>
                                            <Link href={`/${formatSubCategoryForURL(article.subCategoryName)}/${article.slug}`}>
                                                {article.title}
                                            </Link>
                                        </h5>
                                        <ul className="authar-info d-flex flex-wrap" >
                                            <li >
                                                <i className="ti ti-timer" /> {formatDateOnly(article.createdDate)}
                                            </li>
                                            <li className="d-lg-block d-none like ">
                                               
                                                <i className="ti ti-thumb-up" />
                                                    {article.totalLikes}
                                                
                                            </li>
                                        </ul>
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

export default MagazineArticleSlider;