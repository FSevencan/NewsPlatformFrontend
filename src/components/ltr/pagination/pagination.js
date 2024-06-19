import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, hasNext, hasPrevious }) => {
    const pageNumbers = [];
    const visiblePages = 10; // Ekranda gösterilecek maksimum sayfa sayısı

    // Kullanıcı arayüzünde gösterilecek sayfa numaralarını hesapla
    const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }


    return (
        <div className="col-md-8 thm-padding center-pagination">
            <ul className="pagination">
                {hasPrevious && (
                    <li>
                        <a onClick={(e) => {
                            e.preventDefault(); // Varsayılan hareketi engelle
                            onPageChange(currentPage - 1);
                        }} href="javascript:void(0)">
                            <span className="ti ti-angle-left"></span>
                        </a>
                    </li>
                )}
                {pageNumbers.map(number => (
                    <li key={number} className={number === currentPage + 1 ? 'active' : ''}>
                        <a onClick={(e) => {
                            e.preventDefault();
                            onPageChange(number - 1);
                        }} href="javascript:void(0)">
                            {number}
                        </a>
                    </li>
                ))}
                {hasNext && (
                    <li>
                        <a onClick={(e) => {
                            e.preventDefault(); // Varsayılan hareketi engelle
                            onPageChange(currentPage + 1);
                        }} href="javascript:void(0)">
                            <span className="ti ti-angle-right"></span>
                        </a>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Pagination;

