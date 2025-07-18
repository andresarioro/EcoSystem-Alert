const { SerialPort } = require('serialport');

SerialPort.list().then(ports => {
  console.log('🔍 Puertos detectados por Node.js:');
  ports.forEach(port => {
    console.log(`🔌 ${port.path}`);
  });
}).catch(err => {
  console.error('❌ Error al listar puertos:', err);
});