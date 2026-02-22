package com.java.backend.repository;

import com.java.backend.model.UserInfo;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AccountInfoRepository {


    UserInfo addUserInfo(UserInfo userInfo);

}
