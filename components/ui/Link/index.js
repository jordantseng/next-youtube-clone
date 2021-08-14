import Link from 'next/link';

// className is for styled-component
export default ({ href, className, style, children }) => (
  <Link href={href}>
    <a className={className} style={style}>
      {children}
    </a>
  </Link>
);
