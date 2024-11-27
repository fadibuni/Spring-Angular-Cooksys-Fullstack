package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.AnnouncementRequestDto;
import org.springframework.web.bind.annotation.*;

import com.cooksys.groupfinal.services.AnnouncementService;

import lombok.RequiredArgsConstructor;

import java.util.Set;

@RestController
@RequestMapping("/announcements")
@RequiredArgsConstructor
public class AnnouncementController {
	
	private final AnnouncementService announcementService;

	@PostMapping("/create/company/{companyId}/user/{userId}")
	@CrossOrigin(origins="*")
	public AnnouncementDto createAnnouncement(@RequestBody AnnouncementRequestDto announcementRequestDto, @PathVariable Long companyId, @PathVariable Long userId) {
		return announcementService.createAnnouncement(announcementRequestDto, companyId, userId);
	}

}
