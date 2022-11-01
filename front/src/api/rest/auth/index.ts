import { createAxiosApi } from 'api/axios';

const REST_PATH = '/auth-service';
const axiosApi = createAxiosApi();

interface payloadType {
  data: number;
}

/**
 * @description
 * http://k7b2071.p.ssafy.io/auth-service/ 이하의 url의 요청을 보내는 프라미스 객체들의 모음
 *
 * @example
 * ```typescript
 * // 임포트
 * import { auth } from 'api/rest'
 *
 * // url 요청 예시 - http://k7b2071.p.ssafy.io/auth-service/test-connection
 * async () => { const testData = await auth.testConnection }
 * ```
 * @author inte
 */
export default {
  /**
   * @description 해당 타입에 요청 후 DB에 있으면 로그인 페이지로 전송
   * @example
   * ```typescript
   * async () => { await auth.login(google) }
   * ```
   * @params {string?} socialLoginType - 로그인 타입
   * @returns
   * @author inte
   */
  login: (socialLoginType: string) => {
    console.log('로그인 시도', socialLoginType);
    const link = 'https://www.google.co.kr/webhp?hl=ko';
    location.href = link;
    // 로그인 주소 받아오는 코드
    // return new Promise((resolve, reject) => {
    //   axiosApi
    //     .post(REST_PATH + `/login/${socialLoginType}`)
    //     .then(response => {
    //       resolve(response);
    //     })
    //     .catch(error => {
    //       reject(error);
    //     });
    // });
  },

  /**
   * @description 해당 타입에 요청 후 DB에 있으면 로그인
   * @example
   * ```typescript
   * async () => { await auth.login(google) }
   * ```
   * @params {string?} socialLoginType - 로그인 타입
   * @returns
   * @author inte
   */
  getAccessToken: () => {
    return new Promise((resolve, reject) => {
      axiosApi
        .get(REST_PATH + '/refresh')
        .then(response => {
          const accessToken = 'gura';
          axiosApi.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  refresh: () => {
    return new Promise((resolve, reject) => {
      axiosApi
        .get(REST_PATH + '/refresh')
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  /**
   * @param nothing
   * @returns
   * @author inte
   */
  tokenCodes: () => {
    return new Promise((resolve, reject) => {
      axiosApi
        .get(REST_PATH + `/token-codes`)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};
