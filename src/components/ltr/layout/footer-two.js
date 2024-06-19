

import ScrollToTopUI from '../scroll-to-top/scroll-to-top';
import { useBackgroundImageLoader } from '../use-background-image/use-background-image';
import useCategories from '@/hooks/categoryHook/useCategory';
import Link from "next/link";
import { formatSubCategoryForURL } from "@/Utilities/urlFormatHelpers"
import useArticles from "@/hooks/articleHook/useArticle";
import { formatDateOnly } from "@/Utilities/dateFormatHelpers";
import useTags from '@/hooks/tagHook/useTag';

const Footer = () => {

    // Kategorileri Listele
    const { categories } = useCategories();
    const { articles } = useArticles({ page: 0, pageSize: 3 });
    const { tags } = useTags();
    const { articles: latestArticles, isLoading, error } = useArticles({
        pageSize: 8,
        subCategoryName: 'Son Dakika'
    });
    useBackgroundImageLoader()
    return (
        <>
            <ScrollToTopUI />
            {/* *** START FOOTER *** */}
            <footer
                className="main-footer bg-img"
                data-image-src=""
            >
                <div className="container position-relative z-1">
                    <div className="g-3 row">
                        <div className="col-md-3">
                            <img
                                src="/logo-footer.png"
                                alt="footer logo"
                                className="img-fluid"
                            />
                        </div>
                        <div className="col-md-5">
                            <p className="text-white mb-0">
                                Haber platformumuz; güncel, doğru ve tarafsız haberler sunar. Her türlü soru,
                                öneri ve geri bildirimleriniz için aşağıdaki formu kullanarak bize ulaşabilirsiniz.
                                Mesajlarınızı dikkate alarak daha iyi bir hizmet sunmayı hedefliyoruz.
                            </p>
                        </div>
                        <div className="col-md-4">
                            {/* Form */}
                            <form className="row row-cols-lg-auto g-2 align-items-center justify-content-end">
                                <div className="col-12">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email adresinizi girin"
                                    />
                                </div>
                                <div className="col-12">
                                    <button type="submit" className="btn btn-news m-0">
                                        Kaydet
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                    <hr className="mt-5 mb-4" />
                    <div className="row">
                        {/* START FOOTER BOX (Qr Code) */}
                        <div className="col-sm-6 col-lg-3 footer-box py-4">
                            <div className="about-inner text-center">
                                <h5 className="wiget-title">QR Kod</h5>
                                <div className="bg-white mb-3 d-inline-block">
                                    {/* Start Qr Code Image */}
                                    <img
                                        src="https://i.imgur.com/tfoDtRz.png"
                                        className="figure-img img-fluid mb-0"
                                        height={146}
                                        width={146}
                                        alt="..."
                                    />
                                    {/* /. End Qr Code Image */}
                                </div>

                            </div>
                        </div>
                        {/*  END OF /. FOOTER BOX (Qr Code) */}
                        {/* START FOOTER BOX (Twitter feeds) */}
                        <div className="col-sm-6 col-lg-3 footer-box py-4">
                            <div className="twitter-inner">
                                <h5 className="wiget-title">Son Dakika</h5>
                                {latestArticles.slice(0, 3).map((article) => (
                                    <ul className="margin-top-60">

                                        <li>
                                            <Link href={`/${formatSubCategoryForURL(article.subCategoryName)}/${article.slug}`}>
                                                {article.title}
                                            </Link>

                                        </li>
                                        <br />

                                    </ul>
                                ))}
                            </div>
                        </div>
                        {/* END OF /. FOOTER BOX (Twitter feeds) */}
                        {/* START FOOTER BOX (Category) */}
                        <div className="col-sm-6 col-lg-3 footer-box py-4">
                            <h5 className="wiget-title">Kategoriler</h5>
                            <div className="row">
                                <div className="col-6">
                                    <ul className="list-unstyled m-0 menu-services">
                                        {categories.slice(0, 5).map((category) => (
                                            <li>
                                                <Link href={`/category/${formatSubCategoryForURL(category.name)}`}>
                                                    {category.name}
                                                </Link>

                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="col-6">
                                    <ul className="list-unstyled m-0 menu-services">
                                        {categories.slice(5).map((category) => (
                                            <li>
                                                <Link href={`/category/${formatSubCategoryForURL(category.name)}`}>
                                                    {category.name}
                                                </Link>

                                            </li>


                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* END OF /. FOOTER BOX (Category) */}
                        {/* START FOOTER BOX (Recent Post) */}
                        <div className="col-sm-6 col-lg-3 footer-box py-4">
                            <h5 className="wiget-title">Son Haberler</h5>
                            <div className="footer-news-grid">
                                {articles.map((article) => (

                                    <div className="news-list-item">

                                        <div className="img-wrapper">
                                            <Link href={`/${formatSubCategoryForURL(article.subCategoryName)}/${article.slug}`}>
                                                <img
                                                    src={article.featuredImage}
                                                    alt=""
                                                    className="img-fluid"
                                                />
                                                <div className="link-icon">
                                                    <i className="fa fa-camera" />
                                                </div>

                                            </Link>
                                        </div>
                                        <div className="post-info-2">
                                            <h5>

                                                <Link className="title" href={`/${formatSubCategoryForURL(article.subCategoryName)}/${article.slug}`}>
                                                    {article.title}
                                                </Link>
                                            </h5>
                                            <ul className="align-items-center authar-info d-flex flex-wrap gap-1">
                                                <li>{formatDateOnly(article.createdDate)}</li>
                                            </ul>
                                        </div>

                                    </div>

                                ))}
                            </div>
                        </div>
                        {/* END OF /. FOOTER BOX (Recent Post) */}
                    </div>
                    {/* START HOT TOPICS */}
                    <h5 className="wiget-title">Popüler Etiketler</h5>
                    <ul className="lh-lg list-inline mb-0 text-primary-hover hot-topics">
                        {tags.map((tag) => (
                            <li className="list-inline-item">

                                <Link key={tag.id}
                                    href={`/tag/${formatSubCategoryForURL(tag.name)}`}>
                                    {tag.name}
                                </Link>
                            </li>

                        ))}
                    </ul>
                    {/* END OF /. HOT TOPICS */}
                </div>
            </footer>
            {/* *** END OF /. FOOTER *** */}

            {/* *** START SUB FOOTER *** */}
            <div className="sub-footer">
                <div className="container">
                    <div className="align-items-center g-1 g-sm-3 row">
                        <div className="col text-center text-sm-start">
                            <div className="copy">
                                Copyright@2024 Developed by
                                <a href="https://www.fatihsevencan.com" style={{ color: "#eb0254" }} target="_blank" rel="noopener noreferrer">
                                    &nbsp;FatihSevencan
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        </>
    );
};

export default Footer;