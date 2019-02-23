package com.checklist.controller;

import com.checklist.model.Comment;
import com.jayway.jsonpath.JsonPath;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.validation.Valid;


@RestController
public class CommentController {

    private RestTemplate restTemplate = new RestTemplate();


    @CrossOrigin
    @PostMapping (path = "/comments/{id}")
    public void createComment(@PathVariable String id, @Valid @RequestBody String comment) {
        HttpHeaders requestHeaders = new HttpHeaders();
        String commentJustBody = JsonPath.parse(comment).read("$.body");
        requestHeaders.setContentType(MediaType.APPLICATION_JSON);
//        TODO read token from config file
        requestHeaders.add("Authorization", "Basic <Auth Token>");
        Comment commentBody = new Comment(commentJustBody);
        String url = "https://guidewirejira.atlassian.net/rest/api/2/issue/" + id + "/comment";
        HttpEntity<Comment> requestEntity = new HttpEntity<>(commentBody, requestHeaders);
        restTemplate.exchange(url, HttpMethod.POST, requestEntity, Comment.class);
    }
}
