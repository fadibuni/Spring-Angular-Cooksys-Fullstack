package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.dtos.ProjectRequestDto;

public interface ProjectService {

    ProjectDto createProject(ProjectRequestDto projectRequestDto, Long teamId);

    ProjectDto updateProject(ProjectRequestDto projectRequestDto, Long id);
}
