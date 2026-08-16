import type { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  trend?: { value: string; positive: boolean };
  accent?: 'crimson' | 'mint' | 'ai' | 'gray';
}

const accentClasses = {
  crimson: 'bg-crimson-50 text-crimson-700',
  mint: 'bg-mint-100 text-mint-700',
  ai: 'bg-ai-50 text-ai-600',
  gray: 'bg-gray-100 text-gray-600',
};

export default function StatCard({ label, value, icon, trend, accent = 'crimson' }: StatCardProps) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${accentClasses[accent]}`}>
          {icon}
        </div>
        {trend && (
          <span className={`badge ${trend.positive ? 'bg-mint-100 text-mint-700' : 'bg-crimson-50 text-crimson-700'}`}>
            {trend.value}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="mt-0.5 text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}
