package com.cooksys.groupfinal.dtos;

import com.cooksys.groupfinal.entities.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@NoArgsConstructor
@Data
public class TeamRequestDto {
    private String name;
    private String description;
    private Set<Long> teammates;
}
