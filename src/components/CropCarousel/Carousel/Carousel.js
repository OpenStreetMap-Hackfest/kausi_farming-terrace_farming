import React, {
  useState,
  useEffect,
  useRef,
  Children,
  cloneElement,
  createRef
} from "react";
import PropTypes from "prop-types";
import ArrowNavigator from "./ArrowNav";
import styled from "@emotion/styled";
import { collapseCards, expandCards } from "./collapseHelper";
import scrollTo from "./scrollHelper";

const Carousel = ({
  children,
  stepSize,
  cardDist,
  navOnTop,
  navTitle,
  collapse,
  splitIndex
}) => {
  const viewport = useRef(null);
  const cardRefs = useRef([...Array(children.length)].map(() => createRef()));
  const [atLeftEdge, setAtLeftEdge] = useState(true);
  const [atRightEdge, setAtRightEdge] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    setCardWidth(cardRefs.current[0].current.clientWidth);
  }, [children]);

  // const cardWidth = () => cardRefs.current[0].current.clientWidth;

  const checkIfAtEdge = () => {
    const scrollLength = viewport.current.scrollLeft;
    const viewportLength = viewport.current.clientWidth;
    const totalLength = viewport.current.scrollWidth;
    setAtRightEdge(scrollLength + viewportLength === totalLength);
    setAtLeftEdge(scrollLength === 0);
  };

  const getScrollParams = steps => {
    const durationUnit = 300;
    return {
      scrollWidth: steps * cardWidth,
      scrollTime: Math.min(steps * durationUnit, 600)
    };
  };
  const handleScroll = isForward => {
    const { scrollWidth, scrollTime } = getScrollParams(stepSize);
    const newPosition =
      viewport.current.scrollLeft + (isForward ? scrollWidth : -scrollWidth);
    return scrollTo({
      element: viewport.current,
      to: newPosition,
      duration: scrollTime,
      scrollDirection: "scrollLeft",
      callback: checkIfAtEdge,
      context: this
    });
  };
  const moveToSplitIndex = () => {
    const scrollTime = 600;
    const newPosition = Math.max(splitIndex - 1, 0) * cardWidth;
    return scrollTo({
      element: viewport.current,
      to: newPosition,
      duration: scrollTime,
      scrollDirection: "scrollLeft",
      callback: checkIfAtEdge,
      context: this
    });
  };

  const handleGoForward = e => {
    e.preventDefault();
    handleScroll(true);
  };
  const handleGoBack = e => {
    e.preventDefault();
    handleScroll(false);
  };
  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const handleCollapse = () => {
    moveToSplitIndex();
    collapseCards();
  };
  const handleExpand = () => { };

  useEffect(() => {
    if (collapse) handleCollapse();
    else handleExpand();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collapse]);

  const CardCollapseContainer = styled.div`
    opacity: 1;
    left: ${props => props.cardWidth * props.index}px;
    &.collapse {
      animation: ${({ cardWidth, gap, index }) =>
      collapseCards(cardWidth, gap, index)}
        0.5s 0.7s forwards;
    }
    &.expand {
      animation: ${({ cardWidth, gap, index }) =>
      expandCards(cardWidth, gap, index)}
        0.5s forwards;
    }
  `;

  const wrapCard = (baseCard, index) => {
    return (
      <div
        className={'card'}
        ref={cardRefs.current[index]}
        style={
          index === children.length - 1
            ? null
            : { paddingRight: `${cardDist}px`, zIndex: children.length - index }
        }
      >
        {index < splitIndex ? (
          baseCard
        ) : (
          <CardCollapseContainer
            cardWidth={cardWidth}
            gap={10}
            index={index - splitIndex}
            className={collapse ? "collapse" : "expand"}
          >
            {baseCard}
          </CardCollapseContainer>
        )}
      </div>
    );
  };

  useEffect(() => {
    checkIfAtEdge();
    window.addEventListener("resize", checkIfAtEdge);
  });

  const ArrowNavPair = () => (
    <div className={'arrows'}>
      <ArrowNavigator
        handleClick={handleGoBack}
        backward
        className={`${'arrow'} ${'left'} ${atLeftEdge &&
          'hide'}`}
      />
      <ArrowNavigator
        handleClick={handleGoForward}
        className={`arrow right} ${atRightEdge &&
          'hide'}`}
      />
    </div>
  );

  return (
    <Wrapper className={`${navOnTop && 'extendToEdge'}`}>
      <div className={'titlebar'}>
        {navOnTop && <ArrowNavPair />}
        {navTitle()}
      </div>

      <div className={'slider'}>
        {!navOnTop && <ArrowNavPair />}
        <div className={'cardContainer'}>
          <div
            className={'scrollable'}
            ref={viewport}
            onScroll={checkIfAtEdge}
          >
            {Children.map(children, child =>
              cloneElement(child, {
                expanded,
                setExpanded: toggleExpansion
              })
            ).map(wrapCard)}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

Carousel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  stepSize: PropTypes.number,
  cardDist: PropTypes.number,
  navOnTop: PropTypes.bool,
  navTitle: PropTypes.func
};

Carousel.defaultProps = {
  children: [],
  stepSize: 1,
  cardDist: 13,
  navOnTop: false,
  navTitle: () => { }
};

export default Carousel;
const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-flow: column nowrap;
  overflow: hidden;
  padding: 0 21px;

  &.extendToEdge {
    padding-right: 0;
    .titlebar {
      padding-right: 21px;
    }
  }

.titlebar {
  display: flex;
  flex-flow: row-reverse nowrap;
  justify-content: space-between;

  .arrows {
    display: flex;
    align-self: center;
    .arrow {
      padding-left: 10px;
    }
  }
}

.arrow {
  cursor: pointer;
  padding: 0;
  outline: none;
  transition: opacity .2s ease-in-out;
  z-index: 3;

  &.hide {
    display: none;
  }
  .button {
    padding: 2px; //also change .card padding
  }
}

.slider {
  position: relative;
  width: 100%;
  align-items: center;
  justify-content: flex-start;

  .cardContainer{
    overflow: hidden;
    .scrollable {      
      display: flex;
      overflow-y: hidden;
      overflow-x: auto;
      flex-grow: 1;
      z-index: 1;
      position: relative;
      height: 100%;
      margin-bottom: -20px;
      padding-bottom: 20px;
    }
  }
  
  &.arrow {
    position: absolute;
    top: 50%;
    bottom: 0;
    margin: 21px;
  
    &.left {
      left: 0;
    }
    &.right {
      right: 0;
    }
    &.button {
      background-color: white;
      box-shadow: 0 2px 4px 0 #cdced9;
      border: solid 1px #ececec;
      &:hover, &:active, &:focus {
        background-color: white;
      }
    }  
  }
}

& .card {
  padding: 1px;
}
`