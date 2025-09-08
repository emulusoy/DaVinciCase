import type { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger';
};
export default function Button({ variant = 'secondary', className, ...rest }: Props) {
  const cls = `btn ${variant} ${className ?? ''}`.trim();
  return <button className={cls} {...rest} />;
}
