export function registerInscripcionListeners({ eventBus, notifier }) {
  eventBus.on("inscripcion.creada", async (inscripcion) => {
    try {
      await notifier.notificar(
        `Nueva inscripción: el socio ${inscripcion.socioId} se anotó en la clase ${inscripcion.claseId}`
      );
    } catch (error) {
      console.error("Falló la notificación:", error.message);
    }
  });
}