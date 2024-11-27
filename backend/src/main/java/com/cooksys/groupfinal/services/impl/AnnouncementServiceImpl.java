package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.AnnouncementRequestDto;
import com.cooksys.groupfinal.entities.Announcement;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.AnnouncementMapper;
import com.cooksys.groupfinal.repositories.AnnouncementRepository;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.CompanyService;
import com.cooksys.groupfinal.services.UserService;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.services.AnnouncementService;

import lombok.RequiredArgsConstructor;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class AnnouncementServiceImpl implements AnnouncementService {

    private final AnnouncementRepository announcementRepository;
    private final AnnouncementMapper announcementMapper;
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;



    @Override
    public AnnouncementDto createAnnouncement(AnnouncementRequestDto announcementRequestDto, Long companyId, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("User not found"));
        if (!user.isAdmin()) {
            throw new NotFoundException("User is not an admin");
        }
        Company company = companyRepository.findById(companyId).orElseThrow(() -> new NotFoundException("Company not found"));
        Announcement announcement = announcementMapper.dtoToEntity(announcementRequestDto);
        announcement.setCompany(company);
        announcement.setAuthor(user);
        return announcementMapper.entityToDto(announcementRepository.saveAndFlush(announcement));
    }


}