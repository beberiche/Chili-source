import { ReactNode } from 'react';
import { StyledWidget, styledType } from './style';

interface propsType extends styledType {
  children?: ReactNode;
}

/**
 * @description
 * 만드는 중 입니다.
 *
 * @author inte
 */
export const Widget = ({}: propsType) => {
  return (
    <>
      <StyledWidget></StyledWidget>
    </>
  );
};
