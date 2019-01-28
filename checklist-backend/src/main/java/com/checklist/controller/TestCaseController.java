package com.checklist.controller;

import com.checklist.exception.ResourceNotFoundException;
import com.checklist.model.TestCase;
import com.checklist.repository.TestCaseRepository;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

@RestController
public class TestCaseController {

    private final TestCaseRepository testcaseRepository;
    private final TestCaseResourceAssembler assembler;

    public TestCaseController(TestCaseRepository testCaseRepository, TestCaseResourceAssembler assembler) {
        this.testcaseRepository = testCaseRepository;
        this.assembler = assembler;
    }


    @GetMapping(path = "/testcases", produces = {MediaType.APPLICATION_JSON_UTF8_VALUE})
    public Resources<Resource<TestCase>> all() {
        List<Resource<TestCase>> employees = testcaseRepository.findAll().stream()
                .map(assembler::toResource)
                .collect(Collectors.toList());

        return new Resources<>(employees,
                linkTo(methodOn(TestCaseController.class).all()).withSelfRel());

    }

    @GetMapping(path = "/testcases/{id}", produces = {MediaType.APPLICATION_JSON_UTF8_VALUE})
    Resource<TestCase> one(@PathVariable Long id) {

        TestCase testCase = testcaseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Testcases not found with id " + id));

        return assembler.toResource(testCase);
    }

    @PostMapping("/testcases")
    public TestCase createTestCase(@Valid @RequestBody TestCase testcase) {
            return testcaseRepository.save(testcase);
    }

    @PutMapping("/testcases/{id}")
    public TestCase updateTestCase(@PathVariable Long id, @Valid @RequestBody TestCase testcaseRequest) {

        return testcaseRepository.findById(id)
            .map(testcaseElement -> {
                testcaseElement.setName(testcaseRequest.getName());
                testcaseElement.setDescription(testcaseRequest.getDescription());
                testcaseElement.setComment(testcaseRequest.getComment());
                testcaseElement.setStatus(testcaseRequest.getStatus());
                testcaseElement.setEpicId(testcaseRequest.getEpicId());

                return testcaseRepository.save(testcaseElement);
            }).orElseThrow(() -> new ResourceNotFoundException("Test case not found with id " + id));
    }

    @DeleteMapping("/testcases/{id}")
    public ResponseEntity<?> deleteTestcase(@PathVariable Long id) {
        return testcaseRepository.findById(id)
                .map(testcaseElement -> {
                    testcaseRepository.delete(testcaseElement);

                    return ResponseEntity.ok().build();
                }).orElseThrow(() -> new ResourceNotFoundException("Test case not found with id " + id));
    }
}
