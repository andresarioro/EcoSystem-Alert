#include <SPI.h>
#include <LoRa.h>

#define LORA_SCK 5
#define LORA_MISO 19
#define LORA_MOSI 27
#define LORA_SS 18
#define LORA_RST 14
#define LORA_DIO0 26

#include <WiFi.h>
#include <HTTPClient.h>
#include <Wire.h>
#include <MPU6050.h>
MPU6050 mpu;
int hum = 39;
int lluvia = 14;
//int vibracion = 36;
int parlante = 35;

const float mmPorPulso = 0.173;  

float mmTotal = 0;  
int sensor = 0;
int EstadoAnterior = 0;


int16_t axPrev=0, ayPrev=0, azPrev=0, gxPrev=0, gyPrev=0, gzPrev=0;
int16_t ax, ay, az;
int16_t gx, gy, gz;


void setup() {

  Serial.begin(115200);

  // Configuración de pines LoRa
  SPI.begin(LORA_SCK, LORA_MISO, LORA_MOSI, LORA_SS);
  LoRa.setPins(LORA_SS, LORA_RST, LORA_DIO0);

  if (!LoRa.begin(915E6)) {
    Serial.println("LoRa init failed. Check your connections.");
    while (true);
    analogReadResolution(10);
  }
  
  Wire.begin(21, 22);

  pinMode(hum, INPUT);
  pinMode(lluvia, INPUT);
  pinMode(parlante, INPUT);



  mpu.initialize();

  if (mpu.testConnection()) {
    Serial.println("MPU conectada correctamente");
  } else {
    Serial.println("Error al conectar");
    while (1);
  }

    mpu.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);
   
    gxPrev = gx; gyPrev = gy; gzPrev = gz;

    Serial.println("LoRa Sender Ready");
}

void loop() {
  // Llama a la función para enviar el mensaje
  axPrev = ax; ayPrev = ay; azPrev = az;
  String axS, ayS, azS, gxS, gyS, gzS;

  mpu.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);

  // ---- Diferencias ----
  int diffAcel = (abs(ax - axPrev) + abs(ay - ayPrev) + abs(az - azPrev)) / 3.0;
  int diffGiro = (abs(gx - gxPrev) + abs(gy - gyPrev) + abs(gz - gzPrev)) / 3.0;

  // ---- Cambio promedio total ----
  int cambioPromedio = (diffGiro);
 
  //------lectura de parlante//-----
  int valorParlante = analogRead(parlante);

  Serial.print("parlante: ");
  Serial.println(valorParlante);

  // -----lectura de vibracion-------

  int vibracionprom = (diffAcel + valorParlante) / 2.0; 
  
  Serial.print("vibracion: ");
  Serial.println(vibracionprom);

  delay(200);


  // ---- Lectura sensor humedad ----

  int  humVal =   abs(3000 - analogRead(hum));


   // ---- Lectura sensor lluvia ----
   sensor = digitalRead(lluvia);
  
  if (sensor != EstadoAnterior) {
    mmTotal = mmTotal + mmPorPulso;
  }
  
  delay(500);
  
  EstadoAnterior = sensor;


  Serial.print("Lluvia total: ");

  Serial.print(mmTotal);

  Serial.println("mm");

  // ---- Mensaje final ----
  Serial.println("MovimientoTerreno: " + String(cambioPromedio));

  delay(200);

  String lluviaMensaje = "Lluvia: " + String(mmTotal);
  Serial.println(lluviaMensaje);

  String humMensaje = "Humedad: " + String(humVal);
  Serial.println(humMensaje);
  delay(200);
  Serial.println("----------------/////-------");

  String message = String(mmTotal);
  String message1 = String(humVal);
  String message2 = String(cambioPromedio);
  String message3 = String(vibracionprom);
  LoRa.beginPacket();
  LoRa.println("Lluvia: " + message + "mm");
  LoRa.println("Humedad: " + message1);
  LoRa.println("cambioPromedio: " + message2);
  LoRa.println("vibracion: " + message3);
  LoRa.endPacket();

    Serial.println("lluvia: " + message);
  Serial.println("Humedad: " + message1);
  Serial.println("MovimientoTerreno: " + message2);

  delay(1000); // Esperar 3 segundos
}

