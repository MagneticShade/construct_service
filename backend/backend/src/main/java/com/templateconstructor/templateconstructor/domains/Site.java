package com.templateconstructor.templateconstructor.domains;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "sites")
public class Site {
    @Id
    private String id;

    private String local_id;

    private String url;

    private String admin_id;

    private List<Template> templates;

    public Site() {
    }

    @JsonCreator
    public Site(
            String local_id,
            String url,
            String admin_id,
            List<Template> templates) {
        this.local_id = local_id;
        this.url = url;
        this.admin_id = admin_id;
        this.templates = templates;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLocal_id() {
        return local_id;
    }

    public void setLocal_id(String local_id) {
        this.local_id = local_id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getAdmin_id() {
        return admin_id;
    }

    public void setAdmin_id(String admin_id) {
        this.admin_id = admin_id;
    }

    public List<Template> getTemplates() {
        return templates;
    }

    public void setTemplates(List<Template> templates) {
        this.templates = templates;
    }
}
