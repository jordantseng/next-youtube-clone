import * as Styled from './styles';

const SidebarRow = ({ Icon, title, selected, sidebarOpen }) => {
  return (
    <Styled.SidebarRow selected={selected} sidebarOpen={sidebarOpen}>
      <Icon />
      <h2>{title}</h2>
    </Styled.SidebarRow>
  );
};

export default SidebarRow;
