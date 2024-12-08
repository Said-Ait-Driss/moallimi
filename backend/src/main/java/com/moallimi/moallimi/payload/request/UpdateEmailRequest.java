package com.moallimi.moallimi.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateEmailRequest {
    private String currentEmail;
    private String newEmail;
    private Long userId;
    private String code;
}
