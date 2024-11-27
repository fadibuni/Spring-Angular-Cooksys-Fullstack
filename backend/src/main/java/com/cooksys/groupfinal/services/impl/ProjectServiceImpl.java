package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.dtos.ProjectRequestDto;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Project;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.ProjectMapper;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.ProjectRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.services.ProjectService;

import lombok.RequiredArgsConstructor;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {
    private final CompanyRepository companyRepository;
    private final TeamRepository teamRepository;
    private final ProjectMapper projectMapper;
    private final ProjectRepository projectRepository;

    @Override
    public ProjectDto createProject(ProjectRequestDto projectRequestDto, Long teamId) {
        Optional<Team> team = teamRepository.findById(teamId);
        if (team.isEmpty()) {
            throw new BadRequestException("Team doesn't exist");
        }

        Project project = projectMapper.dtoToEntity(projectRequestDto);
        project.setActive(true);
        project.setTeam(team.get());
        return projectMapper.entityToDto(projectRepository.saveAndFlush(project));
    }

    @Override
    public ProjectDto updateProject(ProjectRequestDto projectRequestDto, Long id) {

        Optional<Project> project = projectRepository.findById(id);
        if (project.isEmpty()) {
            throw new NotFoundException("A project with the provided id does not exist.");
        }

        if(projectRequestDto.getName() != null) {
            project.get().setName(projectRequestDto.getName());
        }
        if(projectRequestDto.getDescription() != null) {
            project.get().setDescription(projectRequestDto.getDescription());
        }
        if(projectRequestDto.getActive() != null) {
            project.get().setActive(projectRequestDto.getActive());
        }
        return projectMapper.entityToDto(projectRepository.saveAndFlush(project.get()));
    }
}
