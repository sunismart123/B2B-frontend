// Sidebar.js
import React, { useState } from 'react';
import styled from 'styled-components';

const categories = [
  'Electronics',
  'Fashion',
  'Home & Kitchen',
  'Books',
  'Sports',
  'Toys',
  'Beauty',
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCategories = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SideNav>
      <SideNavHeader onClick={toggleCategories}>Categories</SideNavHeader>
      {isOpen && (
        <SideNavList>
          {categories.map((category, index) => (
            <SideNavItem key={index}>{category}</SideNavItem>
          ))}
        </SideNavList>
      )}
    </SideNav>
  );
};

export default Sidebar;

// Styled components
const SideNav = styled.div`
  height: 100vh;
  width: 250px;
  position: fixed;
  top: 0;
  left: 0;
  background: #333;
  padding-top: 20px;
  color: #fff;
  overflow-y: auto;
`;

const SideNavHeader = styled.h2`
  padding: 0 20px;
  margin: 0;
  font-size: 24px;
  cursor: pointer;
`;

const SideNavList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
`;

const SideNavItem = styled.li`
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background: #444;
  }
`;
