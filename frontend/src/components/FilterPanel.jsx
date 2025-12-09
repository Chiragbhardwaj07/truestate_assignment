import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_FILTERS } from '../queries';

function FilterPanel({ filters, setFilters }) {
    const { data, loading } = useQuery(GET_FILTERS);

    const handleCheckboxChange = (category, value) => {
        setFilters(prev => {
            const current = prev[category] || [];
            if (current.includes(value)) {
                return { ...prev, [category]: current.filter(v => v !== value) };
            } else {
                return { ...prev, [category]: [...current, value] };
            }
        });
    };

    const handleRangeChange = (e, field) => {
        const val = e.target.value ? Number(e.target.value) : undefined;
        setFilters(prev => ({ ...prev, [field]: val }));
    };

    if (loading) return <div>Loading filters...</div>;

    return (
        <div className="filter-panel">

            {/* Regions */}
            <div className="filter-section">
                <h4>Region</h4>
                {data?.getRegions?.map(region => (
                    <label key={region} className="checkbox-label" style={{ display: 'block', margin: '4px 0' }}>
                        <input
                            type="checkbox"
                            checked={filters.customer_region?.includes(region) || false}
                            onChange={() => handleCheckboxChange('customer_region', region)}
                        />
                        <span style={{ marginLeft: '8px' }}>{region}</span>
                    </label>
                ))}
            </div>

            {/* Gender */}
            <div className="filter-section" style={{ marginTop: '16px' }}>
                <h4>Gender</h4>
                {data?.getGenders?.map(gender => (
                    <label key={gender} style={{ display: 'block', margin: '4px 0' }}>
                        <input
                            type="checkbox"
                            checked={filters.gender?.includes(gender) || false}
                            onChange={() => handleCheckboxChange('gender', gender)}
                        />
                        <span style={{ marginLeft: '8px' }}>{gender}</span>
                    </label>
                ))}
            </div>

            {/* Categories */}
            <div className="filter-section" style={{ marginTop: '16px' }}>
                <h4>Category</h4>
                {data?.getCategories?.map(cat => (
                    <label key={cat} style={{ display: 'block', margin: '4px 0' }}>
                        <input
                            type="checkbox"
                            checked={filters.product_category?.includes(cat) || false}
                            onChange={() => handleCheckboxChange('product_category', cat)}
                        />
                        <span style={{ marginLeft: '8px' }}>{cat}</span>
                    </label>
                ))}
            </div>

            {/* Age Range */}
            <div className="filter-section" style={{ marginTop: '16px' }}>
                <h4>Age</h4>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                        type="number"
                        placeholder="Min"
                        value={filters.age_min || ''}
                        onChange={(e) => handleRangeChange(e, 'age_min')}
                        style={{ width: '60px', padding: '4px' }}
                    />
                    <span>-</span>
                    <input
                        type="number"
                        placeholder="Max"
                        value={filters.age_max || ''}
                        onChange={(e) => handleRangeChange(e, 'age_max')}
                        style={{ width: '60px', padding: '4px' }}
                    />
                </div>
            </div>

        </div>
    );
}

export default FilterPanel;
