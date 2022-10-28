package com.ssafy.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class JwtUtil {

    // 엑세스 토큰 생성 키
    @Value("${token.secret}")
    private String ACCESS_KEY;
    // 액세스 토큰 만료 기간
    @Value("${token.access_token.expiration_time}")
    private Long ACCESS_EXPIRATION;

    // 리프레쉬 토큰 생성 키
    @Value("${token.refresh}")
    private String REFRESH_KEY;
    @Value("${token.refresh_token.expiration_time}")
    private Long REFRESH_EXPIRATION;

    // AceessToken 생성
    public String createAccessToken(Long userId) {
        return Jwts.builder()
                .setHeader(createHeader("ACCESS_TOKEN"))
                .setClaims(createClaims(userId))
                .setExpiration(createExpireDate(ACCESS_EXPIRATION)) // 12시간
                .signWith(SignatureAlgorithm.HS256, createSigningKey(ACCESS_KEY))
                .compact();
    }

    // RefreshToekn 생성
    public String createRefreshToken(Long userId) {
        return Jwts.builder()
                .setHeader(createHeader("REFRESH_TOKEN"))
                .setClaims(createClaims(userId))
                .setExpiration(createExpireDate(REFRESH_EXPIRATION))
                .signWith(SignatureAlgorithm.HS256, createSigningKey(REFRESH_KEY))
                .compact();
    }

    // 헤더 부분 생성
    private Map<String, Object> createHeader(String typ) {
        Map<String, Object> header = new HashMap<>();
        header.put("typ", typ);
        header.put("alg", "HS256");
        header.put("regDate", System.currentTimeMillis());
        return header;
    }

    // 유효시간 설정
    private Date createExpireDate(long expireDate) {
        long curTime = System.currentTimeMillis();
        return new Date(curTime + expireDate);
    }

    // payload 부분 생성
    private Map<String, Object> createClaims(Long userId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", userId);
        return claims;
    }

    // 해당 key로 암호화
    private Key createSigningKey(String key) {
        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(key);
        return new SecretKeySpec(apiKeySecretBytes, SignatureAlgorithm.HS256.getJcaName());
    }

    // 유효성 검색, token정보 읽기
    public Claims getClaimsFormToken(String token) {
        return Jwts.parser()
                .setSigningKey(DatatypeConverter.parseBase64Binary(ACCESS_KEY))
                .parseClaimsJws(token)
                .getBody();
    }

    // 유효성 검색, refreshtoken정보 읽기
    public Claims getClaimsToken(String token) {
        return Jwts.parser()
                .setSigningKey(DatatypeConverter.parseBase64Binary(REFRESH_KEY))
                .parseClaimsJws(token)
                .getBody();
    }

    // AccessToken 유효시간 검증
    public boolean validateAccessToken(String accessToken) {
        try {
            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey(ACCESS_KEY)
                    .parseClaimsJws(accessToken);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    // RefreshToken 유효시간 검증
    public boolean validateRefreshToken(String refreshToken) {
        try {
            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey(REFRESH_KEY)
                    .parseClaimsJws(refreshToken);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }
}
