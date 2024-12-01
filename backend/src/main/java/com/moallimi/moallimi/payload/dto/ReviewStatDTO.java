package com.moallimi.moallimi.payload.dto;

import lombok.Data;

@Data
public class ReviewStatDTO {
    private Long count;
    private Double averageRating;

    public ReviewStatDTO(Long count, Double averageRating) {
        this.count = count;
        this.averageRating = averageRating;
    }

    public Long getCount() {
        return count;
    }

    public Double getAverageRating() {
        return averageRating;
    }
}
