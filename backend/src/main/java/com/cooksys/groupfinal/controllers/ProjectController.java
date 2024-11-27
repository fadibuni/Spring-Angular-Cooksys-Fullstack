package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.dtos.ProjectRequestDto;
import org.springframework.web.bind.annotation.*;

import com.cooksys.groupfinal.services.ProjectService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {
	
	private final ProjectService projectService;


	@PostMapping("/create/team/{teamId}")
	@CrossOrigin(origins="*")

	public ProjectDto createProject(@RequestBody ProjectRequestDto projectRequestDto,
									@PathVariable Long teamId) {
		return projectService.createProject(projectRequestDto, teamId);
	}
	@PatchMapping("/{id}")
	@CrossOrigin(origins="*")
	public ProjectDto updateProject(@RequestBody ProjectRequestDto projectRequestDto, @PathVariable Long id) {
		return projectService.updateProject(projectRequestDto, id);
	}

}
