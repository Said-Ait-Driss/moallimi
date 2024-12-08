package com.moallimi.moallimi.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdatePasswordRequest {
    private String currentPassword;
    private String newPassword;
    private String confirmationPassword;
    private Long userId;
}
