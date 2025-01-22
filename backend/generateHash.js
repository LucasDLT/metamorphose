// generateHash.js

import bcrypt from 'bcryptjs';  // Usar import de la librería como "default"

const password = 'admin123';  // La contraseña que quieres hashear

// Generar el hash con 10 rondas de sal
bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Error generando el hash:', err);
  } else {
    console.log('Contraseña hasheada:', hash);
  }
});
