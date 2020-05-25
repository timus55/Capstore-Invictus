package com.cg.capstore.filter;

import java.io.IOException;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.cg.capstore.service.CustomerServiceImpl;
import com.cg.capstore.util.JwtUtil;

import io.jsonwebtoken.JwtException;


@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;
    
    private Logger logger = Logger.getRootLogger();
    
    @Autowired
    private CustomerServiceImpl customerService;


    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException{
    	
    	
    	String authorizationHeader = httpServletRequest.getHeader("Authorization");
        try {
        String token = null;
        String userName = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            token = authorizationHeader.substring(7);
            userName = jwtUtil.extractUsername(token);
        }

        if (userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = customerService.loadUserByUsername(userName);

            if (jwtUtil.validateToken(token, userDetails)) {

                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken
                        .setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }
        filterChain.doFilter(httpServletRequest, httpServletResponse);
        }catch( JwtException exception) {
        	logger.error("Session Expired");
        	httpServletResponse.addHeader("Access-Control-Allow-Origin", "*");
        	httpServletResponse.setContentType("text");
        	httpServletResponse.setCharacterEncoding("UTF-8");
        	httpServletResponse.getWriter().print("Session Expired");
        	httpServletResponse.setStatus(HttpServletResponse.SC_FORBIDDEN);			
			return;
		}
    }

}