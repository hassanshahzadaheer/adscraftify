// Calculate totals for each column
export const calculateTotals = (reports) => {
    const totals = {
        ad_requests: 0,
        fill_rate: 0,
        ad_impressions: 0,
        clicks: 0,
        ctr: 0,
        ecpm: 0,
        revenue: 0
    };

    reports.forEach(report => {
        totals.ad_requests += report.ad_requests;
        totals.fill_rate += parseFloat(report.fill_rate);
        totals.ad_impressions += report.ad_impressions;
        totals.clicks += report.clicks;
        totals.ctr += parseFloat(report.ctr);
        totals.ecpm += parseFloat(report.ecpm);
        totals.revenue += parseFloat(report.revenue);
    });

    return totals;
};

// Render table footer with totals
export const renderTableFooter = (reports) => {
    const totals = calculateTotals(reports);

    return (
        <tfoot>
        <tr>
            <th>Total</th>
            <th></th>
            <th>{totals.ad_requests}</th>
            <th>{(totals.fill_rate / reports.length).toFixed(2)}%</th>
            <th>{totals.ad_impressions}</th>
            <th>{totals.clicks}</th>
            <th>{(totals.ctr / reports.length).toFixed(2)}%</th>
            <th>{(totals.ecpm / reports.length).toFixed(2)}</th>
            <th>{totals.revenue.toFixed(2)}</th>
        </tr>
        </tfoot>
    );
};
