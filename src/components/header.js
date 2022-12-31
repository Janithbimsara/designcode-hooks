import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { menuData } from "../data/menuData"
import MenuButton from "./buttons/MenuButton"
import MenuTooltip from "./tooltips/MenuTooltip"
import { useRef } from "react"

function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef()
  const tooltipRef = useRef()

  function handleClick(event) {
    setIsOpen(!isOpen)
    event.preventDefault()
  }

  function handleClickOutside(event) {
    if (
      ref.current &&
      !ref.current.contains(event.target) &&
      !tooltipRef.current.contains(event.target)
    ) {
      console.log("clicked outside")
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <>
      <Wrapper>
        <Link to="/">
          <img src="/images/logos/logo.svg" alt="logo" />
        </Link>
        <MenuWrapper count={menuData.length} ref={ref}>
          {menuData.map((item, index) =>
            item.link === "/account" ? (
              <MenuButton
                key={index}
                item={item}
                onClick={event => handleClick(event)}
              />
            ) : (
              <MenuButton key={index} item={item} />
            )
          )}
          <HamburgerWrapper>
            <MenuButton
              item={{
                title: "",
                icon: "/images/icons/hamburger.svg",
                link: "",
              }}
              onClick={event => handleClick(event)}
            />
          </HamburgerWrapper>
        </MenuWrapper>
        <div ref={tooltipRef}>
          <MenuTooltip isOpen={isOpen} />
        </div>
      </Wrapper>
    </>
  )
}

export default Header

const Wrapper = styled.div`
  position: absolute;
  top: 60px;
  display: grid;
  grid-template-columns: 44px auto;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 30px;

  @media (max-width: 768px) {
    top: 30px;
  }
  @media (max-width: 450px) {
    top: 20px;
    padding: 0 20px;
  }
`

const MenuWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.count}, auto);
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: auto;
    > a {
      display: none;
    }
  }
`
const HamburgerWrapper = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`
