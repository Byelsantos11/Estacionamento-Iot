package com.estacionamento.backend.mqtt;

import com.estacionamento.backend.mqtt.VagaService;
import jakarta.annotation.PostConstruct;
import org.eclipse.paho.client.mqttv3.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MqttSubscriber {

    @Autowired
    private VagaService vagaService;

    @PostConstruct
    public void start() {
        try {

            MqttClient client = new MqttClient(
                    "tcp://192.168.15.9:1883",
                    "spring-backend"
            );

            client.connect();

            System.out.println("MQTT conectado!");

            client.subscribe("estacionamento/vaga1",
                    (topic, message) -> {

                        String payload = new String(message.getPayload());

                        System.out.println("Mensagem recebida: " + payload);

                        // 🔥 atualiza estado interno
                        vagaService.atualizarVaga("vaga1", payload);
                    });

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}