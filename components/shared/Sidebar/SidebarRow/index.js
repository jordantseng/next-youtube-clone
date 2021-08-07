import * as Styled from './styles';

const SidebarRow = ({ href, title, selected, sidebarOpen, Icon }) => {
  return (
    <Styled.LogoLink href={href}>
      <Styled.SidebarRow selected={selected} sidebarOpen={sidebarOpen}>
        <Icon />
        <span>{title}</span>
      </Styled.SidebarRow>
    </Styled.LogoLink>
  );
};

export default SidebarRow;
