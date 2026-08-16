interface BarChartProps {
  data: { label: string; value: number; max?: number; color?: string }[];
  height?: number;
  showValues?: boolean;
}

export default function BarChart({ data, height = 180, showValues = true }: BarChartProps) {
  const max = Math.max(...data.map((d) => d.max ?? 100));

  return (
    <div className="flex items-end justify-around gap-2" style={{ height }}>
      {data.map((item, idx) => {
        const barHeight = (item.value / max) * (height - 30);
        return (
          <div key={idx} className="flex flex-1 flex-col items-center gap-2">
            {showValues && (
              <span className="text-xs font-semibold text-gray-700">{item.value}%</span>
            )}
            <div className="flex w-full flex-1 items-end justify-center">
              <div
                className="w-full max-w-[40px] rounded-t-md transition-all duration-500"
                style={{
                  height: `${barHeight}px`,
                  backgroundColor: item.color ?? '#8A1B2F',
                }}
              />
            </div>
            <span className="text-center text-[10px] leading-tight text-gray-500">
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
