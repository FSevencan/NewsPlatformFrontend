"use client"
import React, { useState } from 'react';
import GoogleMapComponents from "@/components/ltr/google-map/google-map";
import LayoutTwo from "@/components/ltr/layout/layout-two";
import useRemoveBodyClass from "@/components/ltr/useEffect-hook/useEffect-hook";
import Link from "next/link";
import useContact from '@/hooks/contactHook/useContact';
import StickyBox from "react-sticky-box";
const page = () => {
    useRemoveBodyClass(['None'], ['home-seven', 'home-nine', 'boxed-layout', 'home-six', 'home-two']);

    const [contactData, setContactData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
    });

    const { sendContact, isLoading, error } = useContact();

    // Teşekkür ve Error mesajlari için yeni state
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setContactData({
            ...contactData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const response = await sendContact(contactData);
            if (response.status === 201) { // Başarılı bir oluşturma durumu için 201 kodunu kontrol ediyoruz.
                setSuccessMessage('Mesajınız başarıyla gönderildi. Teşekkür ederiz!');
                setContactData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            } else {
                setErrorMessage('Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.');
            }
        } catch (error) {
            // Axios hata nesnesinden mesaj alıyoruz, eğer varsa.
            setErrorMessage(error.response?.data?.message || 'Bir hata oluştu. Lütfen tekrar deneyiniz.');
        }
    };

    return (
        <LayoutTwo>
        
            {/* START PAGE TITLE */}
            <div className="page-title">
                <div className="container">
                   

                    <div className="align-items-center row">
                        <div className="col">
                            <h1 className="mb-sm-0">
                                <strong>İletişim</strong>
                            </h1>
                        </div>
                        <div className="col-12 col-sm-auto">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb d-inline-block">
                                    <li className="breadcrumb-item">
                                        <Link href="/">Anasayfa</Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        İletişim
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            {/* END OF /. PAGE TITLE */}

            {/* *** START PAGE MAIN CONTENT *** */}
            <main className="page_main_wrapper">
                <div className="container">
                    <div className="row row-m">
                        <div className="col-sm-7 col-md-8 main-content col-p">
                            <StickyBox>
                                {/* START CONTACT FORM AREA */}
                                <div className="contact_form_inner">
                                    <div className="panel_inner">
                                        <div className="panel_header">
                                            <h4>
                                                <strong>BİZİMLE İLETİŞİME GEÇMEKTEN ÇEKİNMEYİN</strong>
                                            </h4>
                                        </div>
                                        <div className="panel_body">
                                            <p>
                                                Haber platformumuz; güncel, doğru ve tarafsız haberler sunar. Her türlü soru, öneri ve geri bildirimleriniz için aşağıdaki formu kullanarak bize ulaşabilirsiniz.
                                                Mesajlarınızı dikkate alarak daha iyi bir hizmet sunmayı hedefliyoruz.
                                            </p>
           

                                            <form className="comment-form" onSubmit={handleSubmit}>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label htmlFor="name">Ad*</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="firstName"
                                                                placeholder="Adınız*"
                                                                required
                                                                onChange={handleChange}
                                                                value={contactData.firstName}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <label htmlFor="email">Soyad*</label>
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="lastName"
                                                                placeholder="Soyadınız*"
                                                                required
                                                                onChange={handleChange}
                                                                value={contactData.lastName}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="form-group">
                                                            <label htmlFor="name">Email*</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="email"
                                                                type="e"
                                                                placeholder="Email adresiniz*"
                                                                required
                                                                onChange={handleChange}
                                                                value={contactData.email}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <label htmlFor="email">Konu*</label>
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="subject"
                                                                placeholder="Mesajınızın Konusu*"
                                                                required
                                                                onChange={handleChange}
                                                                value={contactData.subject}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="email">Mesaj*</label>
                                                    <textarea
                                                        className="form-control"
                                                        name="message"
                                                        placeholder="Mesajınızı Buraya Yazınız*"
                                                        rows={5}
                                                        defaultValue={""}
                                                        required
                                                        onChange={handleChange}
                                                        value={contactData.message}
                                                    />
                                                </div>
                                                <button className="btn btn-news" type="submit" disabled={isLoading}>Gönder</button>
                                            </form>
                                           
                                            {successMessage && <div className="alert alert-success">{successMessage}</div>}
                                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                                           
                                        </div>
                                    </div>
                                </div>
                                {/* END OF CONTACT FORM AREA */}
                            </StickyBox>
                        </div>
                        <div className="col-sm-5 col-md-4 rightSidebar col-p">
                            <StickyBox>
                                {/* START CONTACT INFO */}
                                <div className="panel_inner">
                                    <div className="panel_header">
                                        <h4>
                                            <strong>İLETİŞİM</strong> BİLGİLERİ{" "}
                                        </h4>
                                    </div>
                                    <div className="panel_body">
                                        <address>
                                            {" "}
                                            <strong>Adres</strong>
                                            <br /> Merkez Mahallesi
                                            <br /> Şişli No:1244
                                            <br /> <abbr title="Phone"></abbr> (0850) 000 1100{" "}
                                        </address>
                                        <address>
                                            {" "}
                                            <strong>Telefon & Fax</strong>
                                            <br /> <abbr title="Phone"></abbr> (0850) 000 1100{" "}
                                            <br /> Fax: 0212 000 11 00

                                        </address>
                                        <address>
                                            {" "}
                                            <strong>Email</strong>
                                            <br /> <a href="mailto:#">info@haberler.com</a>{" "}
                                        </address>
                                    </div>
                                </div>

                            </StickyBox>
                        </div>
                    </div>
                    <div className="panel_inner">
                        <div className="panel_body">
                            {/* The element that will contain Google Map. This is used in both the Javascript and CSS above. */}
                            <GoogleMapComponents />
                        </div>
                    </div>
                </div>
            </main>
            {/* *** END OF /. PAGE MAIN CONTENT *** */}
        </LayoutTwo>

    );
};

export default page;