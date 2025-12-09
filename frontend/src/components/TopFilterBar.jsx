import React from 'react';
import { RotateCw, ChevronDown } from 'lucide-react';

// Static Filter Options
const REGIONS = ['North', 'South', 'East', 'West', 'Midwest', 'Northeast', 'Southeast', 'Southwest'];
const GENDERS = ['Male', 'Female', 'Other'];
const CATEGORIES = ['Electronics', 'Clothing', 'Home', 'Beauty', 'Books', 'Sports', 'Toys', 'Automotive'];
const PAYMENT_METHODS = ['Credit Card', 'Debit Card', 'PayPal', 'Cash', 'Bank Transfer', 'UPI'];
const TAGS = ["Accessories", "Beauty", "Casual", "Cotton", "Fashion", "Formal", "Fragrance-free", "Gadgets", "Makeup", "Organic", "Portable", "Skincare", "Smart", "Unisex", "Wireless"];

function TopFilterBar({ filters, setFilters, sort, setSort }) {

    const handleSelectChange = (category, e) => {
        const value = e.target.value;
        const newValues = value ? [value] : [];
        setFilters(prev => ({ ...prev, [category]: newValues }));
    };

    const handleRangeChange = (e, field) => {
        const val = e.target.value ? Number(e.target.value) : undefined;
        setFilters(prev => ({ ...prev, [field]: val }));
    };

    const resetFilters = () => {
        setFilters({});
    };

    return (
        <div className="filter-bar">
            {/* Reset Button */}
            <button onClick={resetFilters} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }} title="Reset Filters">
                <RotateCw size={18} color="#64748b" />
            </button>

            {/* Region */}
            <select
                className="filter-select"
                value={filters.customer_region?.[0] || ''}
                onChange={(e) => handleSelectChange('customer_region', e)}
            >
                <option value="">Customer Region</option>
                {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>

            {/* Gender */}
            <select
                className="filter-select"
                value={filters.gender?.[0] || ''}
                onChange={(e) => handleSelectChange('gender', e)}
            >
                <option value="">Gender</option>
                {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
            </select>

            {/* Age Range */}
            <div className="range-inputs">
                <span style={{ fontSize: '14px', color: '#64748b' }}>Age:</span>
                <input
                    type="number"
                    placeholder="Min"
                    className="range-input"
                    value={filters.age_min || ''}
                    onChange={(e) => handleRangeChange(e, 'age_min')}
                />
                <span>-</span>
                <input
                    type="number"
                    placeholder="Max"
                    className="range-input"
                    value={filters.age_max || ''}
                    onChange={(e) => handleRangeChange(e, 'age_max')}
                />
            </div>

            {/* Category */}
            <select
                className="filter-select"
                value={filters.product_category?.[0] || ''}
                onChange={(e) => handleSelectChange('product_category', e)}
            >
                <option value="">Product Category</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            {/* Tags */}
            <select
                className="filter-select"
                value={filters.tags?.[0] || ''}
                onChange={(e) => handleSelectChange('tags', e)}
            >
                <option value="">Tags</option>
                {TAGS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            {/* Payment Method */}
            <select
                className="filter-select"
                value={filters.payment_method?.[0] || ''}
                onChange={(e) => handleSelectChange('payment_method', e)}
            >
                <option value="">Payment Method</option>
                {PAYMENT_METHODS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>

            {/* Sorting */}
            <select
                className="filter-select"
                style={{ marginLeft: 'auto' }}
                value={`${sort.field}-${sort.order}`}
                onChange={(e) => {
                    const [field, order] = e.target.value.split('-');
                    setSort({ field, order });
                }}
            >
                <option value="CUSTOMER_NAME-ASC">Sort by: Customer Name (A-Z)</option>
                <option value="CUSTOMER_NAME-DESC">Sort by: Customer Name (Z-A)</option>
                <option value="DATE-DESC">Sort by: Date (Newest)</option>
                <option value="DATE-ASC">Sort by: Date (Oldest)</option>
                <option value="QUANTITY-DESC">Sort by: Quantity (High-Low)</option>
                <option value="QUANTITY-ASC">Sort by: Quantity (Low-High)</option>
            </select>

        </div>
    );
}

export default TopFilterBar;
