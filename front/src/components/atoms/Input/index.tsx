import { useEffect, useState, useRef, forwardRef, ForwardedRef } from 'react';
import { StyledInput, styledType } from './style';

interface propsType extends styledType {
  type?: string;
  placeHolder?: string;
  defaultValue?: string;
  text?: any;
  setText?: any;
}

/**
 * @description
 * 인풋 박스를 만드는 컴포넌트
 *
 * @example
 * // 일반적인 사용예시
 * <Input type="text" width={200px} height={200rem} placeHolder="입력해주세요" value="초기값" />
 *
 * @param {string?} height      - 높이문자열
 * @param {string?} width       - 넓이문자열
 * @param {string?} type        - 인풋 타입
 * @param {string?} placeHolder - 플레이스홀더
 * @param {string?} defaultValue       - 초기에 들어가있을 값
 *
 * @author inte
 */
const index = forwardRef<HTMLInputElement, propsType>(
  ({ height, width, type, placeHolder, defaultValue, text, setText }, ref) => {
    // const [text, setText] = useState(defaultValue);
    const useForwardRef = <T,>(ref: ForwardedRef<T>, initialValue: any = null) => {
      const targetRef = useRef<T>(initialValue);

      useEffect(() => {
        if (!ref) return;

        if (typeof ref === 'function') {
          ref(targetRef.current);
        } else {
          ref.current = targetRef.current;
        }
      }, [ref]);

      return targetRef;
    };

    const inputRef = useForwardRef<HTMLInputElement>(ref);
    useEffect(() => {
      setText(defaultValue);
    }, [defaultValue]);
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.value = text ? text : '';
      }
    }, [text]);

    return (
      <>
        <StyledInput
          ref={inputRef}
          height={height}
          width={width}
          type={type}
          placeholder={placeHolder}
          onChange={e => {
            setText(e.target.value);
          }}
          defaultValue={text}
        ></StyledInput>
      </>
    );
  },
);

export default index;
