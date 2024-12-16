import { clsx } from 'clsx';
import { ButtonProps } from '@/components/Button/types';

export default function Button({
  label,
  type,
  className,
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        'border border-solid border-neutral-500 transition-colors hover:border-white focus:border-white rounded-md px-4 py-2',
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
