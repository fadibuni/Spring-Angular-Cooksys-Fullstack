package com.cooksys.groupfinal.mappers;

import java.util.List;
import java.util.Set;

import com.cooksys.groupfinal.dtos.AnnouncementRequestDto;
import org.mapstruct.Mapper;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.entities.Announcement;

@Mapper(componentModel = "spring", uses = { BasicUserMapper.class })
public interface AnnouncementMapper {
	
	AnnouncementDto entityToDto(Announcement announcement);
    Set<AnnouncementDto> entitiesToDtos(Set<Announcement> announcement);
    Set<AnnouncementDto> entitiesToDtos(List<Announcement> announcement);
    Announcement dtoToEntity(AnnouncementRequestDto announcementRequestDto);
}
