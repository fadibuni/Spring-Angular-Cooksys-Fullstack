package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.*;
import org.springframework.web.bind.annotation.*;

import com.cooksys.groupfinal.services.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
	
	private final UserService userService;
	
//	@PostMapping("/login")
//	@CrossOrigin(origins="*")
//    public FullUserDto login(@RequestBody CredentialsDto credentialsDto) {
//        return userService.login(credentialsDto);
//    }

    @PostMapping("/login")
    @CrossOrigin(origins="*")
    public FullUserDto login(@RequestBody EmailLoginDto emailLoginDto) {
        return userService.login(emailLoginDto);
    }


    @PostMapping("/{companyId}")
    @CrossOrigin(origins="*")
    public BasicUserDto createUser(@RequestBody UserRequestDto userRequestDto, @PathVariable Long companyId) {
        return userService.createUser(userRequestDto, companyId);
    }
}
