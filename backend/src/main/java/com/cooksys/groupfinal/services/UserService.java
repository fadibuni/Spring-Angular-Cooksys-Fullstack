package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.*;

public interface UserService {

	FullUserDto login(CredentialsDto credentialsDto);

	FullUserDto login(EmailLoginDto emailLoginDto);


    BasicUserDto createUser(UserRequestDto userRequestDto, Long companyId);
}
