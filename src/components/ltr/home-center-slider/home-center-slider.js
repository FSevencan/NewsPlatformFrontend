import dynamic from "next/dynamic";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import 'animate.css/animate.css'
import { formatSubCategoryForURL } from "@/Utilities/urlFormatHelpers"
import Link from 'next/link';
import { formatDateOnly } from "@/Utilities/dateFormatHelpers"
import useArticles from '@/hooks/articleHook/useArticle';

if (typeof window !== "undefined") {
    window.$ = window.jQuery = require("jquery");
}
// This is for Next.js. On Rect JS remove this line
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false,
})
const HomeCenterSlider = () => {

    const optionEight = {
        loop: true,
        items: 1,
        dots: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        autoplay: true,
        autoplayTimeout: 4000, //Set AutoPlay to 4 seconds
        autoplayHoverPause: true,
        nav: true,
        navText: [
            `<i class='ti ti-angle-left'></i>`,
            `<i class='ti ti-angle-right'></i>`
        ]
    }


    const { articles: latestArticles, isLoading, error } = useArticles({
        pageSize: 5,
        subCategoryName: 'Gündem'
    });

    if (isLoading) {
        return (
            <div className="se-pre-con">
                <div className="loader"></div>
            </div>
        );
    }

    if (error) {
        console.error("Gündem haberleri alınamadı:", error);
        return <div>Error loading latest articles.</div>;
    }


    return (

        <OwlCarousel id="owl-slider" className="owl-theme" {...optionEight}>
            {/* Slider item one */}
            {latestArticles.map((article, index) => (
                <div className="item">
                    <div className="slider-post post-height-1">
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
                            <h2>
                                <Link href={`/${formatSubCategoryForURL(article.subCategoryName)}/${article.slug}`}>
                               
                                    <h1 style={{ color: 'white' }}>{article.title}</h1>
                                
                                </Link>
                            </h2>
                            <ul className="align-items-center authar-info d-flex flex-wrap gap-1">
                                <li>{formatDateOnly(article.createdDate)}</li>
                               
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
            {/* /.Slider item one */}



        </OwlCarousel>
    );
};

export default HomeCenterSlider;