package com.cooksys.groupfinal.controllers;

import java.util.Set;

import com.cooksys.groupfinal.dtos.*;
import com.cooksys.groupfinal.services.ProjectService;
import com.cooksys.groupfinal.services.UserService;
import org.springframework.web.bind.annotation.*;

import com.cooksys.groupfinal.services.CompanyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/company")
@RequiredArgsConstructor
public class CompanyController {
	
	private final CompanyService companyService;
    private final UserService userService;
    private final ProjectService projectService;
	
	@GetMapping("/{id}/users")
    @CrossOrigin(origins="*")
    public Set<FullUserDto> getAllUsers(@PathVariable Long id) {
        return companyService.getAllUsers(id);
    }
	
	@GetMapping("/{id}/announcements")
    @CrossOrigin(origins="*")
    public Set<AnnouncementDto> getAllAnnouncements(@PathVariable Long id) {
        return companyService.getAllAnnouncements(id);
    }
	
	@GetMapping("/{id}/teams")
    @CrossOrigin(origins="*")
    public Set<TeamDto> getAllTeams(@PathVariable Long id) {
        return companyService.getAllTeams(id);
    }
	
	@GetMapping("/{companyId}/teams/{teamId}/projects")
    @CrossOrigin(origins="*")
    public Set<ProjectDto> getAllProjects(@PathVariable Long companyId, @PathVariable Long teamId) {
		return companyService.getAllProjects(companyId, teamId);
	}

    @PostMapping("/create")
    @CrossOrigin(origins="*")
    public CompanyDto createCompany(@RequestBody CompanyRequestDto companyRequestDto) {
        return companyService.createCompany(companyRequestDto);
    }

    @GetMapping("/")
    @CrossOrigin(origins="*")
    public Set<CompanyDto> getAllCompanies(){
        return companyService.getAllCompanies();
    }

}
