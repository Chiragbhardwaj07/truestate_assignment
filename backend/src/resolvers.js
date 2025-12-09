const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { GraphQLScalarType, Kind } = require('graphql');

const dateScalar = new GraphQLScalarType({
    name: 'DateTime',
    description: 'Date custom scalar type',
    serialize(value) {
        return value.toISOString(); // Convert outgoing Date to integer for JSON
    },
    parseValue(value) {
        return new Date(value); // Convert incoming integer to Date
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            return new Date(ast.value); // Convert hard-coded AST string to integer and then to Date
        }
        return null; // Invalid hard-coded value (not an integer)
    },
});

const decimalScalar = new GraphQLScalarType({
    name: 'Decimal',
    description: 'Decimal custom scalar type',
    serialize(value) {
        return value.toString();
    },
    parseValue(value) {
        return value;
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            return ast.value;
        }
        return null;
    },
});

const resolvers = {
    DateTime: dateScalar,
    Decimal: decimalScalar,
    Query: {
        getSales: async (_, { search, filters, sort, page = 1, limit = 10 }) => {
            const where = {};

            // 1. Search (Name OR Phone)
            if (search) {
                where.OR = [
                    { customer_name: { contains: search, mode: 'insensitive' } },
                    { phone_number: { contains: search, mode: 'insensitive' } },
                ];
            }

            // 2. Filters
            if (filters) {
                if (filters.customer_region?.length) {
                    where.customer_region = { in: filters.customer_region };
                }
                if (filters.gender?.length) {
                    where.gender = { in: filters.gender };
                }
                if (filters.product_category?.length) {
                    where.product_category = { in: filters.product_category };
                }
                if (filters.payment_method?.length) {
                    where.payment_method = { in: filters.payment_method };
                }

                // Age Range
                if (filters.age_min !== undefined || filters.age_max !== undefined) {
                    where.age = {};
                    if (filters.age_min !== undefined) where.age.gte = filters.age_min;
                    if (filters.age_max !== undefined) where.age.lte = filters.age_max;
                }

                // Date Range
                if (filters.date_start || filters.date_end) {
                    where.tx_date = {};
                    if (filters.date_start) where.tx_date.gte = filters.date_start;
                    if (filters.date_end) where.tx_date.lte = filters.date_end;
                }

                // Tags (This is tricky if tags are comma separated string. 
                // Assuming partial match for now as 'tags' is TEXT in DB.
                // If we want exact tag matching from a list, we might need multiple contains or specific logic.
                // Since input is [String], we check if ANY of the selected tags exist in the tags string)
                if (filters.tags?.length) {
                    where.OR = filters.tags.map(tag => ({
                        tags: { contains: tag, mode: 'insensitive' }
                    }));
                    // If we have search AND tags, we need to combine them carefully.
                    // But usually filters are ANDed with search.
                    // Prisma AND: [ { OR: search }, { OR: tags } ]
                    if (search) {
                        // If search exists, we already have where.OR. We need to be careful not to overwrite.
                        // Reset where.OR and move search to AND if needed, or structured differently.
                        // A better structure:
                        const searchCondition = where.OR;
                        const tagsCondition = filters.tags.map(tag => ({
                            tags: { contains: tag, mode: 'insensitive' }
                        }));

                        delete where.OR;
                        where.AND = [];
                        if (searchCondition) where.AND.push({ OR: searchCondition });
                        where.AND.push({ OR: tagsCondition });
                    } else {
                        where.OR = filters.tags.map(tag => ({
                            tags: { contains: tag, mode: 'insensitive' }
                        }));
                    }
                }
            }

            // 3. Sorting
            const orderBy = [];
            if (sort) {
                const order = sort.order.toLowerCase();
                switch (sort.field) {
                    case 'DATE':
                        orderBy.push({ tx_date: order });
                        break;
                    case 'QUANTITY':
                        orderBy.push({ quantity: order });
                        break;
                    case 'CUSTOMER_NAME':
                        orderBy.push({ customer_name: order });
                        break;
                }
            } else {
                // Default sort: Date Newest
                orderBy.push({ tx_date: 'desc' });
            }

            // 4. Aggregation & Pagination
            const skip = (page - 1) * limit;

            const [data, aggregations] = await Promise.all([
                prisma.users_sales.findMany({
                    where,
                    orderBy,
                    take: limit,
                    skip,
                }),
                prisma.users_sales.aggregate({
                    where,
                    _count: { _all: true },
                    _sum: {
                        quantity: true,
                        total_amount: true,
                        final_amount: true,
                    }
                })
            ]);

            const total = aggregations._count._all || 0;
            const sumTotal = aggregations._sum.total_amount || 0;
            const sumFinal = aggregations._sum.final_amount || 0;
            // Assuming Total Amount displayed is final_amount? User says "Total Amount" and "Total Discount".
            // If Discount is "15000 (45 SRs)", it implies summation.
            // Let's return Total Amount as final_amount (Actual Revenue) or total_amount (Gross)?
            // Usually "Total Amount" in dashboard means Revenue. Let's use final_amount. 
            // Wait, looking at image "Total Amount ₹89,000". "Total Discount ₹15,000".
            // So Gross was 104k.
            // I will return:
            // totalAmount = final_amount (Revenue)
            // totalDiscount = total_amount - final_amount (assuming total_amount is Gross Price before discount)
            // Let's verify if total_amount > final_amount in typical data. schema says `price_per_unit`, `discount_percentage`, `total_amount`, `final_amount`.
            // Likely: total_amount = price * qty. final_amount = total_amount - discount.

            return {
                data,
                total,
                page,
                totalPages: Math.ceil(total / limit),
                totalUnits: aggregations._sum.quantity || 0,
                totalAmount: sumFinal,
                totalDiscount: sumTotal - sumFinal,
            };
        },
        getRegions: async () => {
            const result = await prisma.users_sales.findMany({
                distinct: ['customer_region'],
                select: { customer_region: true },
                where: { customer_region: { not: null } }
            });
            return result.map(r => r.customer_region).filter(Boolean).sort();
        },
        getGenders: async () => {
            const result = await prisma.users_sales.findMany({
                distinct: ['gender'],
                select: { gender: true },
                where: { gender: { not: null } }
            });
            return result.map(r => r.gender).filter(Boolean).sort();
        },
        getCategories: async () => {
            const result = await prisma.users_sales.findMany({
                distinct: ['product_category'],
                select: { product_category: true },
                where: { product_category: { not: null } }
            });
            return result.map(r => r.product_category).filter(Boolean).sort();
        },
        getPaymentMethods: async () => {
            const result = await prisma.users_sales.findMany({
                distinct: ['payment_method'],
                select: { payment_method: true },
                where: { payment_method: { not: null } }
            });
            return result.map(r => r.payment_method).filter(Boolean).sort();
        },
        getTags: async () => {
            // Tags are likely stored as strings, possibly multiple per row.
            // We'll simplisticly fetch distinct tag strings for now.
            // In real app, we might want to split them if they are comma separated.
            const result = await prisma.users_sales.findMany({
                distinct: ['tags'],
                select: { tags: true },
                where: { tags: { not: null } }
            });
            // Simplistic extraction if comma separated
            const allTags = new Set();
            result.forEach(r => {
                if (r.tags) {
                    r.tags.split(',').forEach(t => allTags.add(t.trim()));
                }
            });

            // Add static tags from design if not present
            const staticTags = ["Accessories", "Beauty", "Casual", "Cotton", "Fashion", "Formal", "Fragrance-free", "Gadgets", "Makeup", "Organic", "Portable", "Skincare", "Smart", "Unisex", "Wireless"];
            staticTags.forEach(t => allTags.add(t));

            return Array.from(allTags).sort();
        }
    },
};

module.exports = resolvers;
