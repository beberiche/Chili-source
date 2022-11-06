package com.ssafy.dto.response.jira.todo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel(value = "담당자")
public class JiraTodoIssueAssigneeResponse {
    @ApiModelProperty(value = "담당자 JIRA id")
    private String accountId;

    @ApiModelProperty(value = "담당자 JIRA email")
    private String emailAddress;

    @ApiModelProperty(value = "담당자 JIRA 이름")
    private String displayName;

    @Builder
    public JiraTodoIssueAssigneeResponse(String accountId, String emailAddress, String displayName) {
        this.accountId = accountId;
        this.emailAddress = emailAddress;
        this.displayName = displayName;
    }
}
