package com.ssafy.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "권한 응답 정보")
public class RoleResponse {
    @ApiModelProperty(value = "권한 pk")
    private String id;

    @ApiModelProperty(value = "수정 권한")
    private Boolean modify;

    @ApiModelProperty(value = "초대 권한")
    private Boolean invite;

    @ApiModelProperty(value = "강퇴 권한")
    private Boolean fire;

    @ApiModelProperty(value = "삭제 권한")
    private Boolean remove;

    @Builder
    public RoleResponse(String id, Boolean modify, Boolean invite, Boolean fire, Boolean remove) {
        this.id = id;
        this.modify = modify;
        this.invite = invite;
        this.fire = fire;
        this.remove = remove;
    }
}
