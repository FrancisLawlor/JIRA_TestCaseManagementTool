package com.checklist.model;


import lombok.Data;

@Data
public class Comment {
    private String body;
    public Comment() {}
    public Comment(String body) {
        this.body = body;
    }
}
