import Link from 'next/link';

const StyledLink = ({ href, children, className }) => {
  return (
    <Link href={href}>
      <a className={className}>{children}</a>
    </Link>
  );
};

export default StyledLink;
