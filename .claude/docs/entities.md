# Entidades del Sistema de Trazabilidad — CRUDs por Módulo

> Cada entidad usa un nombre en inglés (`PascalCase`) listo para usar como **interface** en TypeScript o **modelo** en el backend. Las propiedades usan `camelCase`. Las descripciones se mantienen en español.

---

## 1. Catalogs & Configuration — Catálogos y Configuración

> Entidades maestras que alimentan al resto del sistema.

### 1.1 `Rancher`  — Cliente / Ganadero

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| businessName | `string` | Nombre o razón social del ganadero |
| taxId | `string` | NIT o CI del ganadero |
| phone | `string` | Teléfono de contacto |
| address | `string` | Dirección del ganadero |
| email | `string` | Correo electrónico |
| isActive | `boolean` | Estado activo/inactivo |
| createdAt | `datetime` | Fecha de creación |
| updatedAt | `datetime` | Fecha de última actualización |

### 1.2 `Brand` — Marca

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| code | `string` | Código de la marca |
| description | `string` | Descripción o nombre de la marca |
| imageUrl | `string` | Imagen o diseño de la marca (hierro) |
| rancherId | `UUID (FK → Rancher)` | Ganadero propietario de la marca |
| isCurrent | `boolean` | Si la marca está vigente |
| createdAt | `datetime` | Fecha de creación |
| updatedAt | `datetime` | Fecha de última actualización |

### 1.3 `Breed` — Raza

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| name | `string` | Nombre de la raza (Nelore, Brangus, Mestizo, etc.) |
| description | `string` | Descripción adicional |
| isActive | `boolean` | Estado activo/inactivo |

### 1.4 `Gender` — Sexo (Catálogo)

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| name | `string` | Nombre (Macho, Hembra) |
| abbreviation | `string` | Abreviatura (M, H) |

### 1.5 `Carrier` — Transportista

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| fullName | `string` | Nombre completo del transportista |
| identityCard | `string` | Cédula de identidad |
| licensePlate | `string` | Placa del vehículo |
| phone | `string` | Teléfono de contacto |
| isActive | `boolean` | Estado activo/inactivo |
| createdAt | `datetime` | Fecha de creación |
| updatedAt | `datetime` | Fecha de última actualización |

### 1.6 `ColdRoom` — Cámara de Frío

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| name | `string` | Nombre o código de la cámara |
| capacity | `integer` | Capacidad máxima de canales |
| targetTemperature | `decimal` | Temperatura objetivo en °C |
| location | `string` | Ubicación dentro de la planta |
| isActive | `boolean` | Estado activo/inactivo |

### 1.7 `Pen` — Corral

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| name | `string` | Nombre o código del corral |
| capacity | `integer` | Capacidad máxima de animales |
| location | `string` | Ubicación dentro de la planta |
| isActive | `boolean` | Estado activo/inactivo |

### 1.8 `User` — Usuario del Sistema

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| fullName | `string` | Nombre completo |
| username | `string` | Nombre de usuario |
| email | `string` | Correo electrónico |
| passwordHash | `string` | Contraseña cifrada |
| roleId | `UUID (FK → Role)` | Rol asignado |
| isActive | `boolean` | Estado activo/inactivo |
| createdAt | `datetime` | Fecha de creación |
| updatedAt | `datetime` | Fecha de última actualización |

### 1.9 `Role` — Rol

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| name | `string` | Nombre del rol (Admin, Operator, Supervisor, etc.) |
| permissions | `JSON / string[]` | Lista de permisos asociados |
| description | `string` | Descripción del rol |

---

## 2. Reception & Gate — Recepción y Portería

### 2.1 `MovementGuide` — Guía de Movimiento (SENASAG)

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| guideNumber | `string` | Número de guía SENASAG |
| rancherId | `UUID (FK → Rancher)` | Ganadero remitente |
| carrierId | `UUID (FK → Carrier)` | Transportista que realiza el traslado |
| animalCount | `integer` | Cantidad de animales declarados |
| issueDate | `date` | Fecha de emisión de la guía |
| entryDate | `datetime` | Fecha y hora de ingreso en portería |
| origin | `string` | Lugar de origen / procedencia |
| remarks | `text` | Observaciones generales |
| status | `enum (Pending, Received, Cancelled)` | Estado de la guía |
| createdAt | `datetime` | Fecha de creación |
| updatedAt | `datetime` | Fecha de última actualización |

### 2.2 `Batch` — Lote

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| batchNumber | `string` | Número automático (Formato: FR-AA-MM-XXX) |
| movementGuideId | `UUID (FK → MovementGuide)` | Guía de movimiento asociada |
| rancherId | `UUID (FK → Rancher)` | Ganadero propietario |
| entryDate | `datetime` | Fecha de ingreso del lote |
| animalCount | `integer` | Cantidad de animales en el lote |
| status | `enum (Active, InProcess, Completed)` | Estado del lote |
| createdAt | `datetime` | Fecha de creación |
| updatedAt | `datetime` | Fecha de última actualización |

### 2.3 `ReceptionIncident` — Novedad de Recepción (Bienestar Animal)

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| movementGuideId | `UUID (FK → MovementGuide)` | Guía de movimiento asociada |
| incidentType | `enum (Injured, Dead, Other)` | Tipo de novedad |
| affectedCount | `integer` | Cantidad de animales afectados |
| description | `text` | Descripción detallada de la novedad |
| evidencePhotoUrl | `string` | Foto de evidencia |
| registeredById | `UUID (FK → User)` | Usuario que registra la novedad |
| registeredAt | `datetime` | Fecha y hora del registro |

---

## 3. Pen Management — Gestión de Corrales

### 3.1 `Animal` — Animal (Registro Individual)

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| batchId | `UUID (FK → Batch)` | Lote al que pertenece |
| brandId | `UUID (FK → Brand)` | Marca del ganadero |
| sequence | `integer` | Número secuencial dentro del lote |
| animalCode | `string` | Identidad única: Lote + Marca + Secuencia (generado) |
| breedId | `UUID (FK → Breed)` | Raza del animal |
| genderId | `UUID (FK → Gender)` | Sexo del animal |
| penId | `UUID (FK → Pen)` | Corral donde se encuentra |
| estimatedWeight | `decimal` | Peso estimado a la llegada (kg) |
| estimatedAge | `string` | Edad estimada |
| remarks | `text` | Observaciones adicionales |
| status | `enum (InPen, InSlaughter, Slaughtered, Dispatched)` | Estado del animal |
| createdAt | `datetime` | Fecha de creación |
| updatedAt | `datetime` | Fecha de última actualización |

### 3.2 `OwnershipTransfer` — Transferencia de Propiedad

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| animalId | `UUID (FK → Animal)` | Animal transferido |
| fromRancherId | `UUID (FK → Rancher)` | Dueño anterior |
| fromBrandId | `UUID (FK → Brand)` | Marca anterior |
| toRancherId | `UUID (FK → Rancher)` | Nuevo dueño |
| toBrandId | `UUID (FK → Brand)` | Nueva marca |
| reason | `text` | Motivo de la transferencia |
| supportDocUrl | `string` | Documento de respaldo |
| registeredById | `UUID (FK → User)` | Usuario que registra |
| transferredAt | `datetime` | Fecha y hora de la transferencia |

---

## 4. Production / Slaughter — Producción (Faena)

### 4.1 `SlaughterRecord` — Registro de Faena (Noqueo / Sacrificio)

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| animalId | `UUID (FK → Animal)` | Animal sacrificado |
| slaughterDate | `datetime` | Fecha y hora del sacrificio |
| slaughterLine | `string` | Línea de faena utilizada |
| stunOperatorId | `UUID (FK → User)` | Operador que realiza el noqueo |
| stunMethod | `string` | Método de noqueo utilizado |
| remarks | `text` | Observaciones del proceso |
| status | `enum (InProgress, Completed)` | Estado del registro |
| createdAt | `datetime` | Fecha de creación |

### 4.2 `Carcass` — Canal

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| slaughterRecordId | `UUID (FK → SlaughterRecord)` | Registro de faena asociado |
| animalId | `UUID (FK → Animal)` | Animal de origen |
| carcassType | `enum (Half, FrontQuarter, HindQuarter)` | Tipo de canal (Media, Cuarto delantero, Cuarto trasero) |
| carcassCode | `string` | Código único de la canal |
| hotWeight | `decimal` | Peso en caliente (kg) — Balanza de faena |
| coldWeight | `decimal` | Peso en frío (kg) — después de cámara |
| dispatchWeight | `decimal` | Peso al despacho (kg) — Balanza de despacho |
| rancherId | `UUID (FK → Rancher)` | Ganadero propietario (para trazabilidad) |
| status | `enum (InSlaughter, InColdRoom, InDispatch, Dispatched)` | Estado de la canal |
| createdAt | `datetime` | Fecha de creación |
| updatedAt | `datetime` | Fecha de última actualización |

### 4.3 `Label` — Etiqueta

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| carcassId | `UUID (FK → Carcass)` | Canal a la que pertenece |
| labelNumber | `integer` | Número de etiqueta (1, 2 o 3) |
| labelType | `enum (LegChange, SlaughterScale, Dispatch)` | Tipo (Cambio de patas, Balanza de faena, Despacho) |
| qrCode | `string` | Contenido del código QR/Barras |
| printedData | `JSON` | Datos impresos: Lote, Marca, Cliente, Peso, Fecha |
| printedAt | `datetime` | Fecha y hora de impresión |
| printedById | `UUID (FK → User)` | Usuario que imprime |

### 4.4 `WeighRecord` — Pesaje

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| carcassId | `UUID (FK → Carcass)` | Canal pesada |
| weighType | `enum (Hot, Cold, Dispatch)` | Tipo de pesaje (Caliente, Frío, Despacho) |
| weight | `decimal` | Peso registrado (kg) |
| scaleId | `string` | Identificador de la balanza |
| isAutomatic | `boolean` | Si fue captura automática de la balanza |
| weighedAt | `datetime` | Fecha y hora del pesaje |
| registeredById | `UUID (FK → User)` | Usuario que registra |

---

## 5. Inventory & Cold Storage — Inventario y Cámaras

### 5.1 `ColdRoomEntry` — Ingreso a Cámara

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| carcassId | `UUID (FK → Carcass)` | Canal ingresada |
| coldRoomId | `UUID (FK → ColdRoom)` | Cámara de destino |
| position | `string` | Posición dentro de la cámara (riel, gancho) |
| entryDate | `datetime` | Fecha y hora de ingreso a cámara |
| exitDate | `datetime` | Fecha y hora de salida de cámara |
| agingHours | `decimal` | Tiempo de maduración acumulado (horas) |
| entryTemperature | `decimal` | Temperatura al momento del ingreso (°C) |
| registeredById | `UUID (FK → User)` | Usuario que registra |
| status | `enum (Stored, Released)` | Estado (En cámara, Retirado) |

### 5.2 `TemperatureLog` — Control de Temperatura (Opcional)

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| coldRoomId | `UUID (FK → ColdRoom)` | Cámara monitoreada |
| temperature | `decimal` | Temperatura registrada (°C) |
| humidity | `decimal` | Humedad relativa (%) |
| recordedAt | `datetime` | Fecha y hora de la lectura |
| registeredById | `UUID (FK → User)` | Usuario que registra |
| remarks | `text` | Observaciones |

---

## 6. Dispatch & Logistics — Despacho y Logística

### 6.1 `DispatchOrder` — Orden de Despacho

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| orderNumber | `string` | Número de orden de despacho |
| destinationClient | `string` | Cliente o destino final |
| rancherId | `UUID (FK → Rancher)` | Ganadero dueño del producto (para validación) |
| dispatchDate | `datetime` | Fecha y hora del despacho |
| responsibleId | `UUID (FK → User)` | Responsable del despacho |
| remarks | `text` | Observaciones |
| status | `enum (Preparing, Dispatched, Delivered, Cancelled)` | Estado de la orden |
| createdAt | `datetime` | Fecha de creación |
| updatedAt | `datetime` | Fecha de última actualización |

### 6.2 `DispatchOrderItem` — Detalle de Despacho

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| dispatchOrderId | `UUID (FK → DispatchOrder)` | Orden a la que pertenece |
| carcassId | `UUID (FK → Carcass)` | Canal despachada |
| dispatchWeight | `decimal` | Peso al despacho (kg) |
| labelId | `UUID (FK → Label)` | Etiqueta 3 (Despacho) asociada |
| remarks | `text` | Observaciones |

### 6.3 `DeliveryNote` — Nota de Entrega

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| noteNumber | `string` | Número de nota de entrega |
| dispatchOrderId | `UUID (FK → DispatchOrder)` | Orden de despacho asociada |
| rancherId | `UUID (FK → Rancher)` | Ganadero vinculado |
| issuedAt | `datetime` | Fecha de emisión |
| totalCarcasses | `integer` | Total de canales/cuartos entregados |
| totalWeight | `decimal` | Peso total despachado (kg) |
| receivedBy | `string` | Nombre de quien recibe |
| signatureUrl | `string` | Firma digital o imagen de firma |
| status | `enum (Issued, Delivered, Cancelled)` | Estado de la nota |

---

## 7. Audit & Reports — Auditoría y Reportes

### 7.1 `AuditLog` — Bitácora de Auditoría (Audit Trail)

| Propiedad | Tipo | Descripción |
|---|---|---|
| id | `UUID` | Identificador único |
| entityName | `string` | Nombre de la entidad afectada (Ej: "Carcass", "Animal") |
| entityId | `UUID` | ID del registro afectado |
| action | `enum (Create, Update, Delete)` | Acción realizada |
| fieldChanged | `string` | Campo que fue modificado |
| previousValue | `text` | Valor antes del cambio |
| newValue | `text` | Valor después del cambio |
| userId | `UUID (FK → User)` | Usuario que realizó la acción |
| ipAddress | `string` | Dirección IP desde donde se realizó |
| performedAt | `datetime` | Fecha y hora de la acción |

### 7.2 `TraceabilityView` — Consulta de Trazabilidad (Trace-back)

> Solo lectura (vista/reporte). No requiere CRUD completo.

| Propiedad | Tipo | Descripción |
|---|---|---|
| labelCode | `string` | Código de etiqueta consultado |
| carcassId | `UUID` | Canal asociada |
| animalId | `UUID` | Animal de origen |
| batchId | `UUID` | Lote de origen |
| movementGuideId | `UUID` | Guía SENASAG de ingreso |
| rancherName | `string` | Nombre del ganadero |
| brandName | `string` | Marca registrada |
| entryDate | `datetime` | Fecha de ingreso a planta |
| slaughterDate | `datetime` | Fecha de faena |
| hotWeight | `decimal` | Peso en caliente |
| dispatchWeight | `decimal` | Peso al despacho |
| destination | `string` | Destino del producto |

---

## Resumen de Entidades por Módulo

| # | Module / Módulo | Entities / Entidades | CRUDs |
|---|---|---|---|
| 1 | Catalogs & Configuration | `Rancher`, `Brand`, `Breed`, `Gender`, `Carrier`, `ColdRoom`, `Pen`, `User`, `Role` | 9 |
| 2 | Reception & Gate | `MovementGuide`, `Batch`, `ReceptionIncident` | 3 |
| 3 | Pen Management | `Animal`, `OwnershipTransfer` | 2 |
| 4 | Production / Slaughter | `SlaughterRecord`, `Carcass`, `Label`, `WeighRecord` | 4 |
| 5 | Inventory & Cold Storage | `ColdRoomEntry`, `TemperatureLog` | 2 |
| 6 | Dispatch & Logistics | `DispatchOrder`, `DispatchOrderItem`, `DeliveryNote` | 3 |
| 7 | Audit & Reports | `AuditLog`, `TraceabilityView` (read-only) | 1 + 1 view |
| | **TOTAL** | **24 entidades** | **~23 CRUDs** |

---

## Ejemplo de uso como Interface (TypeScript)

```typescript
interface Rancher {
  id: string;
  businessName: string;
  taxId: string;
  phone: string;
  address: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Carcass {
  id: string;
  slaughterRecordId: string;
  animalId: string;
  carcassType: 'Half' | 'FrontQuarter' | 'HindQuarter';
  carcassCode: string;
  hotWeight: number;
  coldWeight: number;
  dispatchWeight: number;
  rancherId: string;
  status: 'InSlaughter' | 'InColdRoom' | 'InDispatch' | 'Dispatched';
  createdAt: Date;
  updatedAt: Date;
}
```
