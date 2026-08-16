import { GraduationCap } from 'lucide-react';

interface LogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ variant = 'dark', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: { icon: 'h-8 w-8', text: 'text-sm', sub: 'text-[10px]' },
    md: { icon: 'h-10 w-10', text: 'text-base', sub: 'text-[11px]' },
    lg: { icon: 'h-12 w-12', text: 'text-lg', sub: 'text-xs' },
  };
  const s = sizeClasses[size];
  const textColor = variant === 'light' ? 'text-white' : 'text-gray-900';
  const subColor = variant === 'light' ? 'text-crimson-100' : 'text-crimson-700';

  return (
    <div className="flex items-center gap-3">
      <div
        className={`${s.icon} flex shrink-0 items-center justify-center rounded-lg bg-crimson-700 text-white shadow-sm`}
      >
        <GraduationCap className="h-1/2 w-1/2" />
      </div>
      <div className="leading-tight">
        <div className={`font-bold ${s.text} ${textColor}`}>KIT</div>
        <div className={`font-medium ${s.sub} ${subColor} max-w-[180px] leading-tight`}>
          KalaignarKarunanidhi Institute of Technology
        </div>
      </div>
    </div>
  );
}
