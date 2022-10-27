package com.ssafy.exception;

public class NotFoundException extends RuntimeException {
//    public static final String FESTIVAL_NOT_FOUND = "존재하지 않는 축제입니다.";
    public static final String PROJECT_NOT_FOUND = "존재하지 않는 프로젝트입니다.";
    public static final String USER_PROJECT_NOT_FOUND = "존재하지 않는 팀원입니다.";
    public static final String ISSUE_TYPE_NOT_FOUND = "존재하지 않는 이슈 타입입니다.";
    public static final String ISSUE_TEMPLATE_NOT_FOUND = "존재하지 않는 이슈 템플릿입니다.";
    public static final String MIDDLE_BUCKET_NOT_FOUND = "존재하지 않는 미들 버킷입니다.";
    public static final String MIDDLE_BUCKET_ISSUE_NOT_FOUND = "존재하지 않는 이슈입니다.";
    public static final String USER_NOT_FOUND = "존재하지 않는 유저입니다.";
    public static final String AUTH_NOT_FOUND = "존재하지 않는 REFRESH TOKEN 입니다.";
    public static final String TOKEN_CODE_NOT_FOUND = "존재하지 않는 TOKEN CODE 입니다.";
    public static final String TOKEN_NOT_FOUND = "존재하지 않는 TOKEN 입니다.";
    public NotFoundException(String message) {
        super(message);
    }
}
