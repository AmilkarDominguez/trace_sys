# Entidades del Sistema de Trazabilidad — CRUDs por Módulo

---

## 1. Módulo de Catálogos y Configuración

> Entidades maestras que alimentan al resto del sistema.

### 1.1 Cliente / Ganadero

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| razon_social | `string` | Nombre o razón social del ganadero |
| nit_ci | `string` | NIT o CI del ganadero |
| telefono | `string` | Teléfono de contacto |
| direccion | `string` | Dirección del ganadero |
| email | `string` | Correo electrónico |
| activo | `boolean` | Estado activo/inactivo |
| created_at | `datetime` | Fecha de creación |
| updated_at | `datetime` | Fecha de última actualización |

### 1.2 Marca

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| codigo | `string` | Código de la marca |
| descripcion | `string` | Descripción o nombre de la marca |
| imagen_marca | `string (URL/path)` | Imagen o diseño de la marca (hierro) |
| ganadero_id | `UUID (FK → Ganadero)` | Ganadero propietario de la marca |
| vigente | `boolean` | Si la marca está vigente |
| created_at | `datetime` | Fecha de creación |
| updated_at | `datetime` | Fecha de última actualización |

### 1.3 Raza

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| nombre | `string` | Nombre de la raza (Nelore, Brangus, Mestizo, etc.) |
| descripcion | `string` | Descripción adicional |
| activo | `boolean` | Estado activo/inactivo |

### 1.4 Sexo (Catálogo)

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| nombre | `string` | Nombre (Macho, Hembra) |
| abreviatura | `string` | Abreviatura (M, H) |

### 1.5 Transportista

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| nombre | `string` | Nombre completo del transportista |
| ci | `string` | Cédula de identidad |
| placa_vehiculo | `string` | Placa del vehículo |
| telefono | `string` | Teléfono de contacto |
| activo | `boolean` | Estado activo/inactivo |
| created_at | `datetime` | Fecha de creación |
| updated_at | `datetime` | Fecha de última actualización |

### 1.6 Cámara de Frío

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| nombre | `string` | Nombre o código de la cámara |
| capacidad | `integer` | Capacidad máxima de canales |
| temperatura_objetivo | `decimal` | Temperatura objetivo en °C |
| ubicacion | `string` | Ubicación dentro de la planta |
| activo | `boolean` | Estado activo/inactivo |

### 1.7 Corral

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| nombre | `string` | Nombre o código del corral |
| capacidad | `integer` | Capacidad máxima de animales |
| ubicacion | `string` | Ubicación dentro de la planta |
| activo | `boolean` | Estado activo/inactivo |

### 1.8 Usuario del Sistema

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| nombre | `string` | Nombre completo |
| username | `string` | Nombre de usuario |
| email | `string` | Correo electrónico |
| password_hash | `string` | Contraseña cifrada |
| rol_id | `UUID (FK → Rol)` | Rol asignado |
| activo | `boolean` | Estado activo/inactivo |
| created_at | `datetime` | Fecha de creación |
| updated_at | `datetime` | Fecha de última actualización |

### 1.9 Rol

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| nombre | `string` | Nombre del rol (Admin, Operador, Supervisor, etc.) |
| permisos | `JSON / string[]` | Lista de permisos asociados |
| descripcion | `string` | Descripción del rol |

---

## 2. Módulo de Recepción y Portería

### 2.1 Guía de Movimiento (SENASAG)

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| numero_guia | `string` | Número de guía SENASAG |
| ganadero_id | `UUID (FK → Ganadero)` | Ganadero remitente |
| transportista_id | `UUID (FK → Transportista)` | Transportista que realiza el traslado |
| cantidad_animales | `integer` | Cantidad de animales declarados |
| fecha_emision | `date` | Fecha de emisión de la guía |
| fecha_ingreso | `datetime` | Fecha y hora de ingreso en portería |
| procedencia | `string` | Lugar de origen |
| observaciones | `text` | Observaciones generales |
| estado | `enum` | Estado (Pendiente, Recibida, Anulada) |
| created_at | `datetime` | Fecha de creación |
| updated_at | `datetime` | Fecha de última actualización |

### 2.2 Lote

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| numero_lote | `string` | Número automático (Formato: FR-AA-MM-XXX) |
| guia_id | `UUID (FK → Guía)` | Guía de movimiento asociada |
| ganadero_id | `UUID (FK → Ganadero)` | Ganadero propietario |
| fecha_ingreso | `datetime` | Fecha de ingreso del lote |
| cantidad_animales | `integer` | Cantidad de animales en el lote |
| estado | `enum` | Estado (Activo, En Proceso, Finalizado) |
| created_at | `datetime` | Fecha de creación |
| updated_at | `datetime` | Fecha de última actualización |

### 2.3 Novedad de Recepción (Bienestar Animal)

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| guia_id | `UUID (FK → Guía)` | Guía de movimiento asociada |
| tipo_novedad | `enum` | Tipo (Animal lastimado, Animal muerto, Otro) |
| cantidad_afectados | `integer` | Cantidad de animales afectados |
| descripcion | `text` | Descripción detallada de la novedad |
| evidencia_foto | `string (URL/path)` | Foto de evidencia |
| registrado_por | `UUID (FK → Usuario)` | Usuario que registra la novedad |
| fecha_registro | `datetime` | Fecha y hora del registro |

---

## 3. Módulo de Gestión de Corrales

### 3.1 Animal (Registro Individual)

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| lote_id | `UUID (FK → Lote)` | Lote al que pertenece |
| marca_id | `UUID (FK → Marca)` | Marca del ganadero |
| secuencia | `integer` | Número secuencial dentro del lote |
| codigo_animal | `string` | Identidad única: Lote + Marca + Secuencia (generado) |
| raza_id | `UUID (FK → Raza)` | Raza del animal |
| sexo_id | `UUID (FK → Sexo)` | Sexo del animal |
| corral_id | `UUID (FK → Corral)` | Corral donde se encuentra |
| peso_estimado | `decimal` | Peso estimado a la llegada (kg) |
| edad_estimada | `string` | Edad estimada |
| observaciones | `text` | Observaciones adicionales |
| estado | `enum` | Estado (En Corral, En Faena, Faenado, Despachado) |
| created_at | `datetime` | Fecha de creación |
| updated_at | `datetime` | Fecha de última actualización |

### 3.2 Transferencia de Propiedad

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| animal_id | `UUID (FK → Animal)` | Animal transferido |
| ganadero_origen_id | `UUID (FK → Ganadero)` | Dueño anterior |
| marca_origen_id | `UUID (FK → Marca)` | Marca anterior |
| ganadero_destino_id | `UUID (FK → Ganadero)` | Nuevo dueño |
| marca_destino_id | `UUID (FK → Marca)` | Nueva marca |
| motivo | `text` | Motivo de la transferencia |
| documento_respaldo | `string (URL/path)` | Documento de respaldo |
| registrado_por | `UUID (FK → Usuario)` | Usuario que registra |
| fecha_transferencia | `datetime` | Fecha y hora de la transferencia |

---

## 4. Módulo de Producción (Faena)

### 4.1 Registro de Faena (Noqueo / Sacrificio)

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| animal_id | `UUID (FK → Animal)` | Animal sacrificado |
| fecha_faena | `datetime` | Fecha y hora del sacrificio |
| linea_faena | `string` | Línea de faena utilizada |
| operador_noqueo | `UUID (FK → Usuario)` | Operador que realiza el noqueo |
| metodo_noqueo | `string` | Método de noqueo utilizado |
| observaciones | `text` | Observaciones del proceso |
| estado | `enum` | Estado (En proceso, Completado) |
| created_at | `datetime` | Fecha de creación |

### 4.2 Canal

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| faena_id | `UUID (FK → Faena)` | Registro de faena asociado |
| animal_id | `UUID (FK → Animal)` | Animal de origen |
| tipo_canal | `enum` | Tipo (Media canal, Cuarto delantero, Cuarto trasero) |
| codigo_canal | `string` | Código único de la canal |
| peso_caliente | `decimal` | Peso en caliente (kg) — Balanza de faena |
| peso_frio | `decimal` | Peso en frío (kg) — después de cámara |
| peso_despacho | `decimal` | Peso al despacho (kg) — Balanza de despacho |
| ganadero_id | `UUID (FK → Ganadero)` | Ganadero propietario (para trazabilidad) |
| estado | `enum` | Estado (En Faena, En Cámara, En Despacho, Despachado) |
| created_at | `datetime` | Fecha de creación |
| updated_at | `datetime` | Fecha de última actualización |

### 4.3 Etiqueta

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| canal_id | `UUID (FK → Canal)` | Canal a la que pertenece |
| numero_etiqueta | `integer` | Número de etiqueta (1, 2 o 3) |
| tipo_etiqueta | `enum` | Tipo (Cambio de patas, Balanza de faena, Despacho) |
| codigo_qr | `string` | Contenido del código QR/Barras |
| datos_impresos | `JSON` | Datos impresos: Lote, Marca, Cliente, Peso, Fecha |
| fecha_impresion | `datetime` | Fecha y hora de impresión |
| impreso_por | `UUID (FK → Usuario)` | Usuario que imprime |

### 4.4 Pesaje

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| canal_id | `UUID (FK → Canal)` | Canal pesada |
| tipo_pesaje | `enum` | Tipo (Caliente, Frío, Despacho) |
| peso | `decimal` | Peso registrado (kg) |
| balanza_id | `string` | Identificador de la balanza |
| automatico | `boolean` | Si fue captura automática de la balanza |
| fecha_pesaje | `datetime` | Fecha y hora del pesaje |
| registrado_por | `UUID (FK → Usuario)` | Usuario que registra |

---

## 5. Módulo de Inventario y Cámaras

### 5.1 Ingreso a Cámara

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| canal_id | `UUID (FK → Canal)` | Canal ingresada |
| camara_id | `UUID (FK → Cámara de Frío)` | Cámara de destino |
| posicion | `string` | Posición dentro de la cámara (riel, gancho) |
| fecha_ingreso | `datetime` | Fecha y hora de ingreso a cámara |
| fecha_salida | `datetime` | Fecha y hora de salida de cámara |
| tiempo_maduracion_horas | `decimal` | Tiempo de maduración acumulado (horas) |
| temperatura_registro | `decimal` | Temperatura al momento del ingreso (°C) |
| registrado_por | `UUID (FK → Usuario)` | Usuario que registra |
| estado | `enum` | Estado (En cámara, Retirado) |

### 5.2 Control de Temperatura (Opcional)

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| camara_id | `UUID (FK → Cámara de Frío)` | Cámara monitoreada |
| temperatura | `decimal` | Temperatura registrada (°C) |
| humedad | `decimal` | Humedad relativa (%) |
| fecha_registro | `datetime` | Fecha y hora de la lectura |
| registrado_por | `UUID (FK → Usuario)` | Usuario que registra |
| observaciones | `text` | Observaciones |

---

## 6. Módulo de Despacho y Logística

### 6.1 Orden de Despacho

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| numero_orden | `string` | Número de orden de despacho |
| cliente_destino | `string` | Cliente o destino final |
| ganadero_id | `UUID (FK → Ganadero)` | Ganadero dueño del producto (para validación de coincidencia) |
| fecha_despacho | `datetime` | Fecha y hora del despacho |
| responsable_id | `UUID (FK → Usuario)` | Responsable del despacho |
| observaciones | `text` | Observaciones |
| estado | `enum` | Estado (Preparando, Despachado, Entregado, Anulado) |
| created_at | `datetime` | Fecha de creación |
| updated_at | `datetime` | Fecha de última actualización |

### 6.2 Detalle de Despacho

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| orden_despacho_id | `UUID (FK → Orden de Despacho)` | Orden a la que pertenece |
| canal_id | `UUID (FK → Canal)` | Canal despachada |
| peso_despacho | `decimal` | Peso al despacho (kg) |
| etiqueta_id | `UUID (FK → Etiqueta)` | Etiqueta 3 (Despacho) asociada |
| observaciones | `text` | Observaciones |

### 6.3 Nota de Entrega

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| numero_nota | `string` | Número de nota de entrega |
| orden_despacho_id | `UUID (FK → Orden de Despacho)` | Orden de despacho asociada |
| ganadero_id | `UUID (FK → Ganadero)` | Ganadero vinculado |
| fecha_emision | `datetime` | Fecha de emisión |
| total_canales | `integer` | Total de canales/cuartos entregados |
| peso_total | `decimal` | Peso total despachado (kg) |
| recibido_por | `string` | Nombre de quien recibe |
| firma_recepcion | `string (URL/path)` | Firma digital o imagen de firma |
| estado | `enum` | Estado (Emitida, Entregada, Anulada) |

---

## 7. Módulo de Auditoría y Reportes

### 7.1 Bitácora de Auditoría (Audit Trail)

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| entidad | `string` | Nombre de la entidad afectada (Ej: "Canal", "Animal") |
| entidad_id | `UUID` | ID del registro afectado |
| accion | `enum` | Acción realizada (Crear, Editar, Eliminar) |
| campo_modificado | `string` | Campo que fue modificado |
| valor_anterior | `text` | Valor antes del cambio |
| valor_nuevo | `text` | Valor después del cambio |
| usuario_id | `UUID (FK → Usuario)` | Usuario que realizó la acción |
| ip_address | `string` | Dirección IP desde donde se realizó |
| fecha_accion | `datetime` | Fecha y hora de la acción |

### 7.2 Consulta de Trazabilidad (Trace-back)

> Esta entidad es de solo lectura (vista/reporte), no requiere CRUD completo.

| Propiedad | Tipo | Descripción |
|---|---|---|
| codigo_etiqueta | `string` | Código de etiqueta consultado |
| canal_id | `UUID` | Canal asociada |
| animal_id | `UUID` | Animal de origen |
| lote_id | `UUID` | Lote de origen |
| guia_id | `UUID` | Guía SENASAG de ingreso |
| ganadero | `string` | Nombre del ganadero |
| marca | `string` | Marca registrada |
| fecha_ingreso | `datetime` | Fecha de ingreso a planta |
| fecha_faena | `datetime` | Fecha de faena |
| peso_caliente | `decimal` | Peso en caliente |
| peso_despacho | `decimal` | Peso al despacho |
| destino | `string` | Destino del producto |

---

## Resumen de Entidades por Módulo

| # | Módulo | Entidades | CRUDs |
|---|---|---|---|
| 1 | Catálogos y Configuración | Ganadero, Marca, Raza, Sexo, Transportista, Cámara de Frío, Corral, Usuario, Rol | 9 |
| 2 | Recepción y Portería | Guía de Movimiento, Lote, Novedad de Recepción | 3 |
| 3 | Gestión de Corrales | Animal, Transferencia de Propiedad | 2 |
| 4 | Producción (Faena) | Faena, Canal, Etiqueta, Pesaje | 4 |
| 5 | Inventario y Cámaras | Ingreso a Cámara, Control de Temperatura | 2 |
| 6 | Despacho y Logística | Orden de Despacho, Detalle de Despacho, Nota de Entrega | 3 |
| 7 | Auditoría y Reportes | Bitácora de Auditoría, Consulta de Trazabilidad (solo lectura) | 1 + 1 vista |
| | **TOTAL** | | **24 entidades / ~23 CRUDs** |
