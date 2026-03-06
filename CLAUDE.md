# CLAUDE.md — trace_sys

## Descripcion del proyecto

Sistema de trazabilidad (Trace Sys) desarrollado en Angular 21 con Angular Material.
El objetivo actual es construir los **mockups del frontend** sin conectar al backend.
Toda la data debe ser simulada con datos estaticos o mocks locales (sin servicios HTTP reales por ahora).

---

## Stack tecnico

| Tecnologia      | Version     |
|-----------------|-------------|
| Angular         | 21.2.x      |
| Angular Material| 21.2.x      |
| TypeScript      | 5.9.x       |
| RxJS            | 7.8.x       |
| Prettier        | 3.x         |
| Vitest          | 4.x         |

---

## Arquitectura

El proyecto usa **Standalone Components** (sin NgModules). Todos los componentes deben ser standalone.

```
src/app/
├── core/               # Guards, interceptors, servicios singleton, modelos globales
│   ├── auth/
│   │   ├── guards/     # auth.guard.ts, public.guard.ts
│   │   ├── interceptors/
│   │   └── services/   # auth.service.ts
│   └── models/         # Interfaces TypeScript globales
│
├── shared/             # Componentes, pipes y directivas reutilizables
│   ├── components/
│   ├── directives/
│   └── pipes/
│
├── layouts/            # Esqueletos visuales
│   ├── admin-layout/   # Sidebar + Navbar + Content (rutas protegidas)
│   └── auth-layout/    # Layout centrado (Login / Register)
│
├── features/           # Modulos de negocio (uno por funcionalidad)
│   ├── auth/
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/
│   └── [modulo]/
│       ├── components/     # Componentes internos del modulo
│       └── [modulo].ts     # Componente principal
│
└── app.routes.ts       # Rutas con lazy loading
```

---

## Convenciones de codigo

- **Standalone components** siempre. Nunca usar NgModules.
- **Signals** para estado local (`signal()`, `computed()`).
- **Reactive Forms** para formularios.
- Nombres de archivos en **kebab-case**: `user-list.ts`, `trace-detail.ts`.
- Clases de componentes en **PascalCase** sin sufijo "Component": `export class UserList {}`.
- Importar modulos de Angular Material individualmente por componente (no barrel imports).
- Estilos en archivos `.scss` propios de cada componente.
- Idioma del codigo: **ingles** (variables, funciones, interfaces). Texto UI: **espanol**.

---

## Convenciones de estilos (SCSS)

### Unidades
- Usar **`rem`** para todas las medidas de espaciado, tipografia y tamaños. Nunca `px` (excepcion: bordes de 1px y sombras).
- Referencia base: `1rem = 16px`. Ejemplos: `1rem` = 16px, `1.5rem` = 24px, `0.5rem` = 8px.

### Variables y tokens
- Definir colores, espaciados y tipografia como **variables SCSS** en `src/styles.scss` o en un archivo `src/styles/_variables.scss`.
- Nunca hardcodear valores de color directamente en componentes. Usar la variable correspondiente.
- Aprovechar los **tokens de Angular Material** (`--mat-*`) antes de crear variables propias.

### Declaracion de nombres de clases de estilo
- No utilizar & o anidaciones complejas con los estilo, utilizar una anidacion maxima de 2 o 3 niveles
- Completa el nombre de los estilos siempre en ingles.


```scss
// Ejemplo de variables propias
$color-primary: #1a237e;
$color-accent: #e65100;
$color-danger: #c62828;
$color-success: #2e7d32;
$color-text-muted: #757575;

$spacing-xs: 0.25rem;
$spacing-sm: 0.5rem;
$spacing-md: 1rem;
$spacing-lg: 1.5rem;
$spacing-xl: 2rem;
```

### Reglas estrictas
- **Prohibido `!important`**. Si se necesita sobreescribir Material, usar especificidad CSS o el `::ng-deep` con moderacion y comentario justificando el uso.
- No usar estilos inline en los templates HTML (`style="..."`). Todo va en el archivo `.scss` del componente.
- Clases utilitarias simples son aceptables; no reinventar Bootstrap ni Tailwind.

---

## Rutas actuales

```
/auth/login      -> AuthLayout > Login
/dashboard       -> AdminLayout > Dashboard
**               -> redirect /auth/login
```

Las rutas protegidas con `authGuard` estan comentadas (pendiente activar cuando haya backend).

---

## Modulos del sistema de trazabilidad

> Estos son los modulos planificados. Los que no existan aun deben crearse como mockups con data estatica.

### Auth
- Login con email y password.
- Registro de usuarios.
- Sin backend: el login navega directamente al dashboard.

### Dashboard
- Vista principal con KPIs y resumen del sistema.
- Componentes: stats cards, tabla de actividad reciente, grafico de trazabilidad.

### Modulos de negocio
- **Recepción/Portería**: Guía SENASAG, transportista, lote automático, bienestar animal
- **Gestión de Corrales**: Secuencia por animal, transferencias de propiedad con historial
- **Producción (Faineo)**: Interfaz tablet para noqueo, integración con balanzas, impresión etiquetas QR/barras
- **Inventario/Cámaras**: Stock de canales, tiempos de maduración
- **Despacho/Logística**: Segunda balanza, notas de entrega vinculadas al ganadero de origen
- **Catálogos**: Clientes (ganaderos), marcas, razas (Nelore, Brangus, Mestizo…), sexo
- **Auditoría/Reportes**: Trazabilidad inversa (trace-back) por código de etiqueta, bitácora de cambios (audit trail)


---

## Reglas para mockups (fase actual)

1. **No hacer llamadas HTTP**. Toda data va en el propio componente o en un archivo `*.mock.ts`.
2. Usar `signal()` para manejar listas y estados del mockup.
3. Los servicios en `core/` pueden existir pero deben retornar datos hardcodeados (sin HttpClient).
4. El `authGuard` debe estar desactivado mientras se construyen los mockups.
5. Preferir componentes visuales ricos de Angular Material: tablas (`MatTable`), sidebars (`MatSidenav`), formularios con validacion visual.

---

## Archivos clave

| Archivo                              | Proposito                        |
|--------------------------------------|----------------------------------|
| `src/app/app.routes.ts`              | Definicion de todas las rutas    |
| `src/app/app.config.ts`              | Configuracion de providers globales |
| `src/styles.scss`                    | Estilos globales y tema Material |
| `src/app/layouts/admin-layout/`      | Shell de rutas protegidas        |
| `src/app/layouts/auth-layout/`       | Shell de rutas publicas          |


## Informacion del Sistema

# Sistema de Trazabilidad - Matadero/Frigorífico

## Resumen del Proyecto

Sistema de trazabilidad cárnica que rastrea el animal desde su ingreso (Guía de Movimiento SENASAG) hasta el despacho como cuarto de canal. Debe cumplir con normativas SENASAG e ISO 22000.

## Flujo Principal

1. **Recepción (Portería)** → Registro de Guía, generación de Lote (`FR-AA-MM-XXX`)
2. **Corrales** → Alta individual: identidad = Lote + Marca Ganadero + Secuencia
3. **Noqueo y Faena** → Captura de datos en sacrificio
4. **Etiquetado progresivo** → 3 etiquetas: cambio de patas → balanza faena (peso caliente) → despacho (peso final + destino)
5. **Cámara** → Inventario y maduración en frío
6. **Despacho** → Salida al cliente final

## Principio Clave

La **Etiqueta 2** (balanza de faena) es crítica: al imprimirse inmediatamente después del pesaje y fijarse físicamente a la canal con datos de dueño y lote, vincula digital y físicamente el producto a su origen, eliminando discrecionalidad manual y resolviendo dudas de propiedad.
