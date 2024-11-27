package com.cooksys.groupfinal.mappers;

import java.util.List;
import java.util.Set;

import com.cooksys.groupfinal.entities.Team;
import org.mapstruct.Mapper;

import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;
import com.cooksys.groupfinal.entities.User;

@Mapper(componentModel = "spring", uses = { ProfileMapper.class, CredentialsMapper.class, CompanyMapper.class, TeamMapper.class })
public interface FullUserMapper {
	
	FullUserDto entityToFullUserDto(User user);

  Set<FullUserDto> entitiesToFullUserDtos(Set<User> users);
    Set<User> listEntitiesToSet(List<User> user);


}
