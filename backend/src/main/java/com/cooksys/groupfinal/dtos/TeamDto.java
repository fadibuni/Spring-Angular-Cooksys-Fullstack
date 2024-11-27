package com.cooksys.groupfinal.dtos;

import java.util.Set;

import com.cooksys.groupfinal.entities.Project;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class TeamDto {
	
	private Long id;
    
    private String name;
    
    private String description;

    private Set<BasicUserDto> teammates;

    private Set<ProjectDto> projects;

}
