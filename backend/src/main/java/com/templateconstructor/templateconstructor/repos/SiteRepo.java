package com.templateconstructor.templateconstructor.repos;

import com.templateconstructor.templateconstructor.domains.Site;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SiteRepo extends MongoRepository<Site, String> {
}
