package com.cooksys.groupfinal.mappers;

import java.util.List;
import java.util.Set;

import com.cooksys.groupfinal.dtos.TeamRequestDto;
import org.mapstruct.Mapper;

import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.entities.Team;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = { BasicUserMapper.class })
public interface TeamMapper {
	
	TeamDto entityToDto(Team team);

    Set<TeamDto> entitiesToDtos(Set<Team> teams);

    @Mapping(target = "teammates", ignore = true)
    Team dtoToEntity(TeamRequestDto teamRequestDto);


}