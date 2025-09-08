
import { forwardRef, type TextareaHTMLAttributes } from 'react';
type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;
const Textarea = forwardRef<HTMLTextAreaElement, Props>(function Textarea({ className, ...rest }, ref) {
  return <textarea ref={ref} className={`textarea ${className ?? ''}`.trim()} {...rest} />;
});
export default Textarea;
