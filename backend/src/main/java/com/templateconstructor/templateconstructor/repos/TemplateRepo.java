package com.templateconstructor.templateconstructor.repos;

import com.templateconstructor.templateconstructor.domains.Template;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TemplateRepo extends MongoRepository<Template, String> {
}
