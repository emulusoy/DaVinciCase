import { forwardRef, type SelectHTMLAttributes } from 'react';
type Props = SelectHTMLAttributes<HTMLSelectElement>;
const Select = forwardRef<HTMLSelectElement, Props>(function Select({ className, ...rest }, ref) {
  return <select ref={ref} className={`select ${className ?? ''}`.trim()} {...rest} />;
});
export default Select;
