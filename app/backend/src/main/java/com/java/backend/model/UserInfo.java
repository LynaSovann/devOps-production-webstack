package com.java.backend.model;

import com.java.backend.model.response.AccountResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserInfo {

    private Integer userInfoId;
    private String firstname;
    private String lastname;
    private String profileImage;
    private String bio;
    private AccountResponse account;

}
