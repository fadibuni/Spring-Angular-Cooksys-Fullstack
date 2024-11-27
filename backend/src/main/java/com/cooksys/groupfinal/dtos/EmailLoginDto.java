package com.cooksys.groupfinal.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class EmailLoginDto {

    private String email;
    private String password;

}
