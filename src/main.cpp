#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "Fabiano";
const char* password = "1982fab1982";

const char* mqttServer = "192.168.15.9";

#define PIR_PIN 23

WiFiClient espClient;
PubSubClient client(espClient);

bool ultimoEstado = false;

void reconnect() {
  while (!client.connected()) {
    Serial.println("Conectando ao MQTT...");

    if (client.connect("ESP32_Vaga1")) {
      Serial.println("MQTT conectado!");
    } else {
      Serial.print("Erro MQTT: ");
      Serial.println(client.state());
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);

  pinMode(PIR_PIN, INPUT);

  Serial.println("Conectando ao WiFi...");

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.println("WiFi conectado!");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());

  client.setServer(mqttServer, 1883);
}

void loop() {

  if (!client.connected()) {
    reconnect();
  }

  client.loop();

  bool movimento = digitalRead(PIR_PIN);

  if (movimento != ultimoEstado) {

    if (movimento) {

      Serial.println("MOVIMENTO DETECTADO");
      client.publish(
        "estacionamento/vaga1",
        "{\"vaga\":1,\"status\":\"ocupada\"}"
      );

    } else {

      Serial.println("SEM MOVIMENTO");
      client.publish(
        "estacionamento/vaga1",
        "{\"vaga\":1,\"status\":\"livre\"}"
      );
    }

    ultimoEstado = movimento;
  }

  delay(500);
}