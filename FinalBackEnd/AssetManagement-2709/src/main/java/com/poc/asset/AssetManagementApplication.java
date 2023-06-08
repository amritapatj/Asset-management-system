package com.poc.asset;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.poc.asset.model.Roles;
import com.poc.asset.repository.RolesRepository;

@SpringBootApplication
public class AssetManagementApplication implements CommandLineRunner {
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private RolesRepository rolesRepository;

	public static void main(String[] args) {
		SpringApplication.run(AssetManagementApplication.class, args);
	}
	
	
        
    

	@Override
	public void run(String... args) throws Exception {
		System.out.println(this.passwordEncoder.encode("admin@123"));
		
		try {
			Roles role1 = new Roles();
			role1.setRoleId(1);
			role1.setRoleName("ROLE_ADMIN");
			
			Roles role2 = new Roles();
			role2.setRoleId(2);
			role2.setRoleName("ROLE_USER");
			
			List<Roles> roles = List.of(role1,role2);
			List<Roles> result = this.rolesRepository.saveAll(roles);
			
			result.forEach(r->{
				System.out.println(r.getRoleName());
			});
		}
		
		catch(Exception e) {
			e.printStackTrace();
			
		}
	}

}
