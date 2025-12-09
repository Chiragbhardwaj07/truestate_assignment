import React from 'react';

function SalesTable({ sales }) {
    if (!sales || sales.length === 0) {
        return <div className="no-results" style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>No sales found.</div>;
    }

    const thStyle = { padding: '12px', fontSize: '12px', color: '#475569', textTransform: 'uppercase', fontWeight: '600', whiteSpace: 'nowrap' };
    const tdStyle = { padding: '12px', fontSize: '14px', color: '#1e293b' };

    return (
        <div className="table-container" style={{ overflowX: 'auto', background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1200px' }}>
                <thead>
                    <tr style={{ background: '#f8fafc', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>
                        <th style={thStyle}>Transaction ID</th>
                        <th style={thStyle}>Date</th>
                        <th style={thStyle}>Customer ID</th>
                        <th style={thStyle}>Customer name</th>
                        <th style={thStyle}>Phone Number</th>
                        <th style={thStyle}>Gender</th>
                        <th style={thStyle}>Age</th>
                        <th style={thStyle}>Product Category</th>
                        <th style={thStyle}>Quantity</th>
                        <th style={thStyle}>Total Amount</th>
                        <th style={thStyle}>Customer region</th>
                        <th style={thStyle}>Product ID</th>
                        <th style={thStyle}>Employee name</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale) => (
                        <tr key={sale.transaction_id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={tdStyle}>{sale.transaction_id}</td>
                            <td style={tdStyle}>{new Date(sale.tx_date).toLocaleDateString()}</td>
                            <td style={tdStyle}>{sale.customer_id || '-'}</td>
                            <td style={tdStyle}>{sale.customer_name}</td>
                            <td style={tdStyle}>{sale.phone_number || '-'}</td>
                            <td style={tdStyle}>{sale.gender || '-'}</td>
                            <td style={tdStyle}>{sale.age || '-'}</td>
                            <td style={tdStyle}>{sale.product_category || '-'}</td>
                            <td style={tdStyle}>{sale.quantity}</td>
                            <td style={tdStyle}>₹{Number(sale.total_amount).toLocaleString()}</td>
                            <td style={tdStyle}>{sale.customer_region || '-'}</td>
                            <td style={tdStyle}>{sale.product_id || '-'}</td>
                            <td style={tdStyle}>{sale.employee_name || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SalesTable;
