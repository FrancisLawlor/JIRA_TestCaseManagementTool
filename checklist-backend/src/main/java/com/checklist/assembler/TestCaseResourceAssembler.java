package com.checklist.assembler;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;

import com.checklist.controller.TestCaseController;
import com.checklist.model.TestCase;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceAssembler;
import org.springframework.stereotype.Component;

@Component
public class TestCaseResourceAssembler implements ResourceAssembler<TestCase, Resource<TestCase>> {

    @Override
    public Resource<TestCase> toResource(TestCase testCase) {

        return new Resource<>(testCase,
                linkTo(methodOn(TestCaseController.class).one(testCase.getId())).withSelfRel(),
                linkTo(methodOn(TestCaseController.class).all()).withRel("testcases"));
    }
}