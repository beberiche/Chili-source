package com.ssafy.dto.response.jira.todo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel(value = "우선순위")
public class JiraTodoIssuePriorityResponse {
    @ApiModelProperty(value = "우선순위 이름")
    private String name;

    @ApiModelProperty(value = "우선순위 id")
    private String id;

    @Builder
    public JiraTodoIssuePriorityResponse(String name, String id) {
        this.name = name;
        this.id = id;
    }
}
