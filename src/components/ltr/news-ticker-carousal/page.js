
import dynamic from "next/dynamic";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import 'animate.css/animate.css'
import useArticles from '@/hooks/articleHook/useArticle';
import Link from "next/link";
import { formatSubCategoryForURL } from "@/Utilities/urlFormatHelpers"

if (typeof window !== "undefined") {
    window.$ = window.jQuery = require("jquery");
}
// This is for Next.js. On Rect JS remove this line
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false,
});



const NewsTicker = () => {

    const { articles, isLoading, error } = useArticles({ page: 0, pageSize: 10 });

    if (isLoading) {
        return (
            <div className="se-pre-con">
                <div className="loader"></div>
            </div>
        );
    }

    if (error) {
        console.error("Son haberler alınamadı:", error);
        return <div>Error loading latest articles.</div>;
    }

    return (
        <div className="container">
            <div className="newstricker_inner">
                <div className="trending">
                    <strong>Son </strong>Haberler
                </div>
                <OwlCarousel className="news-ticker owl-theme"
                    loop={true}
                    items={1}
                    dots={false}
                    animateOut='animate__slideOutDown'
                    animateIn='animate__flipInX'
                    autoplay={true}
                    autoplayTimeout={5000}
                    autoplayHoverPause={true}
                    nav={false}
                    responsive={{
                        0: {
                            nav: false,
                        },
                        768: {
                            nav: true,
                            navText: [
                                "<i class='ti ti-angle-left'></i>",
                                "<i class='ti ti-angle-right'></i>"
                            ],
                        }
                    }}>
                    {articles.map((article) => (
                        <div className="item">

                            <Link href={`/${formatSubCategoryForURL(article.subCategoryName)}/${article.slug}`}>
                                {article.title}
                            </Link>

                        </div>

                    ))}

                </OwlCarousel>
            </div>
        </div>
    );
};

export default NewsTicker;