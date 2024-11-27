package com.cooksys.groupfinal.services.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.dtos.TeamRequestDto;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.FullUserMapper;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.TeamService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {

    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;
    private final TeamRepository teamRepository;
    private final TeamMapper teamMapper;
    private final FullUserMapper userMapper;

	private Team findTeam(Long id) {
        Optional<Team> team = teamRepository.findById(id);
        if (team.isEmpty()) {
            throw new NotFoundException("A team with the provided id does not exist.");
        }
        return team.get();
    }
    @Override
    public TeamDto createTeam(Long companyId, TeamRequestDto teamRequestDto) {
        Team team = teamMapper.dtoToEntity(teamRequestDto);
        Company company = companyRepository.findById(companyId).orElseThrow(() -> new NotFoundException("Company not found"));
        team.setCompany(company);
        team.setTeammates(userMapper.listEntitiesToSet(userRepository.findAllById(teamRequestDto.getTeammates())));
        return teamMapper.entityToDto(teamRepository.saveAndFlush(team));
    }

    @Override
    public TeamDto getTeamById(Long teamId) {
        if(teamId == null){
            throw new IllegalArgumentException("the id can not be null");
        }
        Team team = findTeam(teamId);
        
        return teamMapper.entityToDto(team);
    }
}
