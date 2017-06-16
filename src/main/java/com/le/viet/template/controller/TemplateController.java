package com.le.viet.template.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
public class TemplateController {
    //@Autowired
    private RestTemplate restTemplate = new RestTemplate();

    @RequestMapping(value = "/ping", method = RequestMethod.GET)
    public String ping(){
        return "pong";
    }

    @RequestMapping(value = "/thdLogin", method = RequestMethod.GET)
    public String thdLogin() throws Exception{
        //login
        String thdLoginURL = "https://webapps-qa.homedepot.com/MYTHDPassport/rs/identity/thdLogin";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        MultiValueMap<String, String> map= new LinkedMultiValueMap<String, String>();
        map.add("j_storenumber", "9751");
        map.add("j_username", "dts001");
        map.add("j_password", "qa02Test!");
        map.add("callingProgram", "ps-giftcard-security");
        //map.add("successUrl", "www.homedepot.com");

        HttpEntity<MultiValueMap<String, String>> req = new HttpEntity<MultiValueMap<String, String>>(map, headers);
        ResponseEntity<String> res = restTemplate.postForEntity( thdLoginURL, req , String.class );
        System.out.println("RESPONSE: " + res.getBody());

        //extract thdsso cookie
        HttpHeaders headers1 = res.getHeaders();
        List<String> list = headers1.get("Set-Cookie");
        System.out.println("list to string: " + list.toString());
        String thdssoCookie = list.get(2);
        String cookie = thdssoCookie.replace("THDSSO=", "");
        int indexAtSemicolon = cookie.indexOf(";");
        cookie = cookie.substring(0, indexAtSemicolon);
        System.out.println("actual cookie: " + cookie);
        for(String cookies : list){
            System.out.println("cookies: " + cookies);
        }

        //get user profile
        String getUserProfileURL = "https://webapps-qa.homedepot.com/MYTHDPassport/rs/identity/getUserProfile?callingProgram=ps-giftcard-security&thdsso=" + cookie;
        ResponseEntity<String> responseEntity = restTemplate.exchange(getUserProfileURL,HttpMethod.GET,null,String.class);
        System.out.println("responseEntity: " + responseEntity.getBody());


        //is session valid, call when user go to different route to ensure user still has a session
        String isSessionValidURL = "https://webapps-qa.homedepot.com/MYTHDPassport/rs/identity/isSessionValid?callingProgram=ps-giftcard-security&thdsso=" + cookie;
        ResponseEntity<String> sessionResponse = restTemplate.getForEntity(isSessionValidURL, String.class);
        System.out.println("sessionResponse: " + sessionResponse);

        return "success!";
    }
}
