package com.moallimi.moallimi.payload.request;

import lombok.Data;

@Data
public class RefreshTokenRequest {
    private String token;
    private String refreshToken;

    public RefreshTokenRequest(){
        
    }

    public RefreshTokenRequest(String token, String refreshToken){
        this.token = token;
        this.refreshToken = refreshToken;
    }
}
