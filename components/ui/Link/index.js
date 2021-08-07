import Link from 'next/link';

// className is for styled-component
export default ({ href, className, children }) => (
  <Link href={href}>
    <a className={className}>{children}</a>
  </Link>
);
