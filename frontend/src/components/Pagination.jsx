import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination({ currentPage, totalPages, onPageChange }) {
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first, last, and window around current
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="pagination" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '16px', borderTop: '1px solid #e2e8f0' }}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn-icon"
                style={{ padding: '4px 8px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', border: '1px solid #e2e8f0', borderRadius: '4px', background: 'white', opacity: currentPage === 1 ? 0.5 : 1 }}
            >
                <ChevronLeft size={16} />
            </button>

            {getPageNumbers().map((p, idx) => (
                p === '...' ? (
                    <span key={`ellipsis-${idx}`} style={{ padding: '0 8px', color: '#64748b' }}>...</span>
                ) : (
                    <button
                        key={p}
                        onClick={() => onPageChange(p)}
                        style={{
                            padding: '4px 12px',
                            cursor: 'pointer',
                            border: p === currentPage ? '1px solid #2563eb' : '1px solid #e2e8f0',
                            borderRadius: '4px',
                            background: p === currentPage ? '#2563eb' : 'white',
                            color: p === currentPage ? 'white' : '#1e293b',
                            fontWeight: p === currentPage ? '600' : '400'
                        }}
                    >
                        {p}
                    </button>
                )
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="btn-icon"
                style={{ padding: '4px 8px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', border: '1px solid #e2e8f0', borderRadius: '4px', background: 'white', opacity: currentPage === totalPages ? 0.5 : 1 }}
            >
                <ChevronRight size={16} />
            </button>
        </div>
    );
}

export default Pagination;
