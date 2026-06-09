# Guia visual frontend

Esta guia define la base visual para mantener consistencia entre auth, administradores, empresas y estudiantes.

## Tipografia

- Tipografia principal: `Space Grotesk`.
- Usar la misma familia en toda la plataforma mediante `--font-app`.
- Titulos: peso `700` u `800`.
- Texto de UI, tablas, formularios y botones: peso `500` o `600`.
- Evitar mezclar fuentes externas nuevas sin acordarlo.

## Iconos oficiales

Todos los iconos deben salir de `lucide-react` y preferentemente desde `APP_ICONS` en:

`src/config/iconConfig.ts`

Mapa recomendado:

- Dashboard: `dashboard`
- Publicaciones/vacantes: `publications`
- Postulantes/candidatos: `applicants`
- Perfil: `profile`
- Empresa: `company`
- Estudiantes/egresados: `students`
- Validacion: `validation`
- Gestion: `management`
- Configuracion: `settings`
- Seguimiento: `tracking`
- Ver: `view`
- Editar: `edit`
- Crear: `create`
- Guardar: `save`
- Eliminar: `delete`
- Cerrar/cancelar: `close` / `cancel`
- Volver: `back`
- Salir: `logout`
- Exito/error/advertencia/info: `success`, `error`, `warning`, `info`

Tamano base:

- UI normal: `APP_ICON_SIZE` con `APP_ICON_STROKE_WIDTH`.
- Estadisticas: `STATS_ICON_SIZE` con `STATS_ICON_STROKE_WIDTH`.

## Alertas

Usar el toast global:

`src/shared/components/AppToastProvider.tsx`

Hook:

`useAppToast()`

Tipos:

- `toast.success(...)`
- `toast.error(...)`
- `toast.warning(...)`
- `toast.info(...)`

Evitar `alert()` nativo.

Para acciones destructivas usar el confirm global:

`src/shared/components/AppConfirmProvider.tsx`

Hook:

`useConfirmDialog()`

Ejemplo:

```tsx
const { confirm } = useConfirmDialog()

const confirmar = await confirm({
  title: 'Cerrar vacante',
  message: 'La vacante dejara de estar disponible.',
  confirmLabel: 'Cerrar vacante',
  tone: 'danger',
})
```

## Estados de pantalla

Usar estados base desde:

`src/shared/components/StateFeedback.tsx`

Componentes:

- `LoadingState`: carga de paginas, tablas o secciones.
- `EmptyState`: cuando no hay datos para mostrar.
- `ErrorState`: errores de consulta o acciones fallidas.

## Formularios

Usar componentes base desde:

- `src/shared/components/AppButton.tsx`
- `src/shared/components/FormControl.tsx`

`FormularioVacante` ya queda como ejemplo de uso para nuevos formularios.

## Recuperacion de contraseña

- `/recuperar-password` contiene la solicitud de correo. Al conectar la API, conservar siempre el mensaje generico aunque el correo no exista.
- `/reset-password?token=...` contiene el cambio de contraseña y lee el token desde la URL.
- No guardar el token de recuperacion en `localStorage` ni `sessionStorage`; enviarlo directamente al endpoint de restablecimiento.
- Las vistas actuales son estaticas y no realizan solicitudes al backend.

## Responsive

- Admin, Empresa, Estudiante y Egresado usan la misma `Sidebar` global dentro de `.app-shell`.
- Cada rol configura sus grupos y rutas desde `src/components/layout/Sidebar.tsx`; no crear sidebars separados.
- En pantallas chicas, la barra global se vuelve un encabezado compacto con menu desplegable.
- Empresa conserva sus acciones propias en `EmpresaLayout`, pero la navegacion y el cierre de sesion son globales.
- Evitar `h-screen overflow-hidden` en vistas completas si el contenido puede crecer.
- En movil, las tablas principales deben cambiar a tarjetas o usar estilos responsivos con `data-label`.
- Revisar en minimo estos viewports antes de subir cambios grandes: `390x844`, `768x1024`, `1366x768`.

## Motion e inspiracion React Bits

- Usar efectos suaves como `spotlight`, entrada de contenido y hover de tarjetas solo cuando ayuden a entender la interfaz.
- Evitar decoracion tipo IA: pastillas con brillos, iconos decorativos sin funcion, fondos con orbes, gradientes excesivos o copy generico.
- Mantener motion en tarjetas, loaders, empty states, stepper y landing; no saturar tablas ni formularios largos.
- Respetar `prefers-reduced-motion` para usuarios que prefieren menos animacion.

## Cambios aplicados

- `ConfirmDialog` global agregado y conectado en publicaciones de empresa.
- `EmptyState`, `LoadingState` y `ErrorState` agregados y conectados en vistas clave.
- Rutas principales divididas con `React.lazy` y `Suspense`.
- Tablas de empresa, seguimiento y admin ajustadas para movil.
- Boton y contenedor de campo compartidos agregados para nuevos formularios.
- Build inicial reducido: el bundle principal bajo de aproximadamente `538 kB` a `276 kB`.

## Sugerencias que quedan

- Migrar gradualmente todos los formularios viejos a `AppButton` y `FormControl`.
- Revisar vistas con datos reales para pulir textos vacios y errores especificos.
- Agregar pruebas visuales automatizadas por viewport cuando el equipo defina herramienta.
- Optimizar imagenes pesadas, especialmente `campus`, para mejorar la carga inicial.

## Auditoria actual

- Login ya usa el mismo lenguaje visual que registro y muestra mensajes diferenciados para credenciales incorrectas, cuenta pendiente y cuenta rechazada.
- Registro de empresa ya esta alineado y pide documentos probatorios multipart.
- Vistas de estudiante ya no deben depender de `h-screen overflow-hidden`, para reducir bloqueos de scroll en pantallas chicas.
- Pendiente pesado: redisenar `RegistroEstudiante` con la misma estructura de `RegistroEmpresa` y corregir textos con encoding roto.
- Pendiente tecnico: conectar publicaciones de estudiante a API real; por ahora `usePublicaciones` conserva datos mock.
- Pendiente visual: normalizar headers de empresa porque aun usan gradientes grandes en varias pantallas.
