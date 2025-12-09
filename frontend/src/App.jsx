import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import './App.css';
import { Search } from 'lucide-react';
import SalesTable from './components/SalesTable';
import TopFilterBar from './components/TopFilterBar';
import StatsDeck from './components/StatsDeck';
import Pagination from './components/Pagination';
import Layout from './Layout';

const GET_SALES = gql`
  query GetSales($search: String, $filters: FilterInput, $sort: SortInput, $page: Int, $limit: Int) {
    getSales(search: $search, filters: $filters, sort: $sort, page: $page, limit: $limit) {
      data {
        transaction_id
        tx_date
        customer_id
        customer_name
        phone_number
        gender
        age
        product_category
        quantity
        total_amount
        customer_region
        product_id
        employee_name
        product_name
        payment_method
      }
      total
      page
      totalPages
      totalAmount
      totalUnits
      totalDiscount
    }
  }
`;

function App() {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState({ field: 'CUSTOMER_NAME', order: 'ASC' });

    const { loading, error, data } = useQuery(GET_SALES, {
        variables: {
            search,
            filters,
            sort,
            page,
            limit: 10
        }
    });

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };

    return (
        <Layout>
            <div className="header-row">
                <h1 className="page-title">Sales Management System</h1>
                <div className="search-input-wrapper" style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid #e2e8f0', padding: '8px 12px', borderRadius: '6px', width: '300px' }}>
                    <Search size={18} color="#94a3b8" style={{ marginRight: '8px' }} />
                    <input
                        type="text"
                        placeholder="Name, Phone no."
                        value={search}
                        onChange={handleSearch}
                        style={{ border: 'none', outline: 'none', fontSize: '14px', width: '100%', color: '#1e293b' }}
                    />
                </div>
            </div>

            <TopFilterBar
                filters={filters}
                setFilters={setFilters}
                sort={sort}
                setSort={setSort}
            />

            <StatsDeck
                totalUnits={data?.getSales?.totalUnits || 0}
                totalAmount={data?.getSales?.totalAmount || 0}
                totalDiscount={data?.getSales?.totalDiscount || 0}
                totalTransactions={data?.getSales?.total || 0}
            />

            <div className="card">
                {loading && <p style={{ padding: '20px' }}>Loading...</p>}
                {error && <p className="error" style={{ padding: '20px' }}>Error: {error.message}</p>}
                {data && (
                    <>
                        <SalesTable sales={data.getSales.data} />

                        <Pagination
                            currentPage={data.getSales.page}
                            totalPages={data.getSales.totalPages}
                            onPageChange={setPage}
                        />
                    </>
                )}
            </div>
        </Layout>
    );
}

export default App;
