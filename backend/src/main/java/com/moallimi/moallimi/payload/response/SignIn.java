package com.moallimi.moallimi.payload.response;

import lombok.Data;

@Data
public class SignIn {
	private String token;
	private String refreshToken;
	private Long expiresIn;

    public SignIn(){
        this.token = "";
        this.refreshToken = "";
        this.expiresIn = 0L;
    }

    public SignIn(String token,String refreshToken, Long expiresIn){
        this.token = token;
        this.refreshToken = refreshToken;
        this.expiresIn = expiresIn;
    }
    
}
