package com.estacionamento.backend.controller;
import com.estacionamento.backend.mqtt.VagaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/vagas")
@CrossOrigin("*")
public class MqttController {

    @Autowired
    private VagaService vagaService;

    @GetMapping
    public Map<String, String> listar() {
        return vagaService.listarVagas();
    }
}