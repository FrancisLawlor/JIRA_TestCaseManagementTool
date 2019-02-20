package com.checklist.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "testcase")
public class TestCase {
    @Id
    @GeneratedValue(generator = "testcase_generator")
    @SequenceGenerator(
            name = "testcase_generator",
            sequenceName = "testcase_sequence",
            initialValue = 1
    )
    private Long id;
    private String name;
    private String description;
    private String comment;
    private int status;
    private String epicId;

    public TestCase() {}

    public TestCase(Long id, String name, String description, String comment, int status, String epicId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.comment = comment;
        this.status = status;
        this.epicId = epicId;
    }
}
