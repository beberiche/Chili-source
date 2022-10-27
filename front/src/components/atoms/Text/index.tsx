import { MouseEventHandler } from 'react';
import { StyledText, StyledFill, StyledTypes } from './style';

// StyleTypes는 style.ts에 있음
// PropTypes의 부모 클래스가 된다.
// 타입 선정을 interface로 할지, Types로 정할지는
// 추후 논의해봅시다.
interface PropTypes extends StyledTypes {
  message: string;
  isFill: boolean;
  clickEvent?: MouseEventHandler<HTMLDivElement>;
}

/**
 *
 * @description
 * Text 혹은 Fill을 재사용하기 위한 목적으로 만들어진 컴포넌트
 *
 * @param {string}                     message          - 컴포넌트 안에 쓰이는 내용
 * @param {string?}                    fontFamily?      - 폰트 변경, default시 pretendard
 * @param {boolean}                    isFill           - Fill인지, Text 인지 선정
 * @param {string?}                    fontWeight       - 폰트 두께, default시 Text - 400, Fill- 700
 * @param {string?}                    color            - color 변경, default시 #000000
 * @param {string?}                    fontSize         - 폰트 크기 변경, default 시 Text - 1rem, Fill - 0.85rem
 * @param {string?}                    backgroundColor  - 배경색 변경,  default 시 Text - 반영안됨,  Fill - #d6d6d6
 * @param {number}                     width            - Fill만 적용, Fill의 전체적인 크기를 자동 설정 (border-radius, padding)\
 * @param {MouseEventHandler<T>?}      clickEvent       - 클릭이벤트 반영
 *
 * @author bell
 */
const index = ({
  message,
  fontFamily,
  isFill,
  fontWeight,
  color,
  fontSize,
  backgroundColor,
  width,
  clickEvent,
}: PropTypes) => {
  return !isFill ? (
    <StyledText color={color} fontFamily={fontFamily} fontWeight={fontWeight} fontSize={fontSize}>
      {message}
    </StyledText>
  ) : (
    <StyledFill backgroundColor={backgroundColor} width={width} onClick={clickEvent}>
      {message}
    </StyledFill>
  );
};

export default index;
