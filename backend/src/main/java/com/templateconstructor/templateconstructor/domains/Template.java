package com.templateconstructor.templateconstructor.domains;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.ObjectInput;

@Document(collection = "templates")
public class Template {

    @Id
    private String id;

    private String name;

    private String local_id;

    public Template() {
    }

    public Template(String name, String local_id) {
        this.name = name;
        this.local_id = local_id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocal_id() {
        return local_id;
    }

    public void setLocal_id(String local_id) {
        this.local_id = local_id;
    }
}
