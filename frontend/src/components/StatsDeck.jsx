import React from 'react';
import { Info } from 'lucide-react';

function StatsDeck({ totalUnits, totalAmount, totalDiscount, totalTransactions }) {
    // Determine currency/formatting
    const formatCurrency = (val) => `₹${Number(val).toLocaleString()}`;

    return (
        <div className="stats-deck">
            <div className="stat-card">
                <div className="stat-header">
                    <span>Total units sold</span>
                    <Info size={14} color="#94a3b8" />
                </div>
                <div className="stat-value">{totalUnits.toLocaleString()}</div>
            </div>

            <div className="stat-card">
                <div className="stat-header">
                    <span>Total Amount</span>
                    <Info size={14} color="#94a3b8" />
                </div>
                <div className="stat-value">
                    {formatCurrency(totalAmount)}
                    {totalTransactions && <span className="stat-subtext"> ({totalTransactions} SRs)</span>}
                </div>
            </div>

            <div className="stat-card">
                <div className="stat-header">
                    <span>Total Discount</span>
                    <Info size={14} color="#94a3b8" />
                </div>
                <div className="stat-value">
                    {formatCurrency(totalDiscount)}
                    {totalTransactions && <span className="stat-subtext"> ({totalTransactions} SRs)</span>}
                </div>
            </div>
        </div>
    );
}

export default StatsDeck;
