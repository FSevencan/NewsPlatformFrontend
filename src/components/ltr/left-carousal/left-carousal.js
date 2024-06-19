
"use client"
import dynamic from "next/dynamic";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import 'animate.css/animate.css'
import Link from 'next/link';
import { formatDateOnly } from "@/Utilities/dateFormatHelpers";
import { formatSubCategoryForURL } from "@/Utilities/urlFormatHelpers";

if (typeof window !== "undefined") {
    window.$ = window.jQuery = require("jquery");
}
// This is for Next.js. On Rect JS remove this line
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false,
});

const LeftCarousal = ({ articles }) => {
    const options = {
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
            "<i class='ti ti ti-angle-left'></i>",
            "<i class='ti ti ti-angle-right'></i>"
        ]
    
    };
    return (
        <OwlCarousel id="owl-slider" className=" owl-theme" {...options}>
            {/* Slider item one */}

          {articles.map((article, index) => (
               
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
                                  {article.title}
                              </Link>
                        </h2>
                        <ul className="authar-info d-flex flex-wrap">
                           
                            <li className="date">{formatDateOnly(article.createdDate)}</li>
                          
                        </ul>
                    </div>
                </div>
            </div>
         
          ))}
          
        </OwlCarousel>
    );
};

export default LeftCarousal;