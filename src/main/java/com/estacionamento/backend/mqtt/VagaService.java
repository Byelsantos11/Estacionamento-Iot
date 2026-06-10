package com.estacionamento.backend.mqtt;
import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;

@Service
public class VagaService {

    private final ConcurrentHashMap<String, String> vagas = new ConcurrentHashMap<>();

    public void atualizarVaga(String vaga, String status) {
        vagas.put(vaga, status);
    }

    public ConcurrentHashMap<String, String> listarVagas() {
        return vagas;
    }
}