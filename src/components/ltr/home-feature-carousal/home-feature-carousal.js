import dynamic from "next/dynamic";
import useArticles from '@/hooks/articleHook/useArticle';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import 'animate.css/animate.css';
import Link from 'next/link';
import { formatSubCategoryForURL } from "@/Utilities/urlFormatHelpers"
import Marquee from "react-fast-marquee";

if (typeof window !== "undefined") {
    window.$ = window.jQuery = require("jquery");
}

const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false,
});



const HomeFeatureCarousel = () => {
    const { articles: latestArticles, isLoading, error } = useArticles({
        pageSize: 8,
        subCategoryName: 'Son Dakika'
    });

    if (isLoading) {
        return (
            <div className="se-pre-con">
                <div className="loader"></div>
            </div>
        );
    }

    if (error) {
        console.error("Son dakika haberleri alınamadı:", error);
        return <div>Error loading latest articles.</div>;
    }

    return (
        <div>
            <div className="son-dakika-container">
                <Marquee>
                    {Array.from({ length: 10 }, (_, index) => (
                        <div key={index}>
                            <h4 className="son-dakika-text">SON DAKİKA -</h4>
                        </div>
                    ))}
                </Marquee>
            </div>
            <br />
            <OwlCarousel className="owl-theme featured-carousel"
                loop={latestArticles.length > 1}
                margin={10}
                nav={false}
                dots={false}
                autoplay={latestArticles.length > 1}
                responsive={{
                    0: { items: 1 },
                    576: { items: 2 },
                    768: { items: 2.5 },
                    992: { items: 3.5 },
                    1200: { items: 4 }
                }}
            >
                {latestArticles.map((article, index) => (
                    <div key={index} className="news-list-item">
                        <Link href={`/${formatSubCategoryForURL(article.subCategoryName)}/${article.slug}`}>
                            <div className="img-wrapper">
                                <img
                                    src={article.featuredImage || "default-image.jpg"}
                                    alt={article.title}
                                    className="img-fluid"
                                />
                            </div>
                        </Link>
                        <div className="post-info-2">
                            <span className="post-category">{article.subCategoryName}</span>
                            <Link href={`/${formatSubCategoryForURL(article.subCategoryName)}/${article.slug}`}>
                                <div className="title">
                                    <h5 className="mb-0">
                                        {article.title}
                                    </h5>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </OwlCarousel>
        </div>
    );
};

export default HomeFeatureCarousel;