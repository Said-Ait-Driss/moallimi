package com.moallimi.moallimi.payload.dto;

public class MonthlyIncreaseDTO {
    private String itemName;
    private double currentValue;
    private double previousValue;
    private double percentageIncrease;

    public MonthlyIncreaseDTO(String itemName, double currentValue, double previousValue) {
        this.itemName = itemName;
        this.currentValue = currentValue;
        this.previousValue = previousValue;
        this.percentageIncrease = calculatePercentageIncrease();
    }

    private double calculatePercentageIncrease() {
        if (previousValue == 0) {
            return 0;
        }
        return ((currentValue - previousValue) / previousValue) * 100;
    }

    // Getters and Setters
    public String getItemName() {
        return itemName;
    }

    public double getCurrentValue() {
        return currentValue;
    }

    public double getPreviousValue() {
        return previousValue;
    }

    public double getPercentageIncrease() {
        return percentageIncrease;
    }
}
