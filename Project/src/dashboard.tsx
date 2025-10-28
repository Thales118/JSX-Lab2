/** @jsx createElement */
import { createElement, mount } from './jsx-runtime';
import { Card } from './components';

interface Report {
  name: string;
  value: number;
  trend: string;
}

const reports: Report[] = [
  { name: 'Revenue', value: 12500, trend: '+12%' },
  { name: 'Orders', value: 321, trend: '+8%' },
  { name: 'Customers', value: 87, trend: '+5%' },
];

const DashboardApp = () => {
  return (
    <div
      style={{
        fontFamily: 'Inter, sans-serif',
        backgroundColor: '#f4f6f9',
        minHeight: '100vh',
        padding: '40px',
      }}
    >
      <h1 style={{ textAlign: 'center', color: '#4e8cff' }}>📊 Dashboard Overview</h1>

      {/* Summary cards */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          marginTop: '24px',
          justifyContent: 'center',
        }}
      >
        {reports.map((r) => (
          <Card key={r.name} title={r.name}>
            <p style={{ fontSize: '20px', fontWeight: 'bold', margin: '4px 0' }}>
              {r.value}
            </p>
            <p style={{ color: '#00b894' }}>{r.trend}</p>
          </Card>
        ))}
      </div>

      {/* Fake chart */}
      <div
        style={{
          margin: '40px auto',
          width: '80%',
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        }}
      >
        <h3 style={{ marginBottom: '16px' }}>📈 Monthly Performance</h3>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '12px',
            height: '150px',
          }}
        >
          {[50, 80, 100, 70, 120, 95].map((val) => (
            <div
              style={{
                width: '40px',
                height: `${val}px`,
                backgroundColor: '#4e8cff',
                borderRadius: '6px',
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div
        style={{
          width: '80%',
          margin: '0 auto',
          backgroundColor: '#fff',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        }}
      >
        <h3>Recent Transactions</h3>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '10px',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0', textAlign: 'left' }}>
              <th style={{ padding: '8px' }}>Date</th>
              <th style={{ padding: '8px' }}>Customer</th>
              <th style={{ padding: '8px' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '8px' }}>2025-10-01</td>
              <td style={{ padding: '8px' }}>Alice</td>
              <td style={{ padding: '8px' }}>$230</td>
            </tr>
            <tr>
              <td style={{ padding: '8px' }}>2025-10-03</td>
              <td style={{ padding: '8px' }}>Bob</td>
              <td style={{ padding: '8px' }}>$510</td>
            </tr>
            <tr>
              <td style={{ padding: '8px' }}>2025-10-05</td>
              <td style={{ padding: '8px' }}>Chris</td>
              <td style={{ padding: '8px' }}>$135</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const root = document.getElementById('app');
if (root) mount(<DashboardApp />, root);

export { DashboardApp };
